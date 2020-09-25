import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FeedItemModel } from '../universal/Models';
import { errorStrings } from '../universal/EventEmitter';
import { GoogleSignin } from '@react-native-community/google-signin';
import { event } from 'react-native-reanimated';
import FireStore from './FireStore';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';


GoogleSignin.isSignedIn().then( res =>
{
  return res

} )


const eventCollection = 'events';
const pastEventCollection = 'past events';
const userCollection = 'users';
let last: FirebaseFirestoreTypes.QueryDocumentSnapshot | null = null;
let lastType: FirebaseFirestoreTypes.QueryDocumentSnapshot | null = null;

class Store
{

  private userData = null

  resetLast = () => last = null
  restLastType = () => lastType = null
  isLoggedIn = () => auth().currentUser != undefined || null;

  login = ( email: string, password: string ) =>
    new Promise( ( resolve, reject ) =>
    {
      auth()
        .signInWithEmailAndPassword( email, password )
        .then( ( res ) =>
        {
          resolve( res.user.uid );
        } )
        .catch( ( err ) => reject( err ) );
    } );

  register = ( username: string, email: string, password: string ) =>
    new Promise( ( resolve, reject ) =>
    {
      auth()
        .createUserWithEmailAndPassword( email, password )
        .then( ( res ) =>
        {
          auth()
            .currentUser?.updateProfile( {
              displayName: username,
            } )
            .then( ( eh ) =>
            {
              resolve( res.user.uid );
            } )
            .catch( ( err ) => reject( err ) );
        } )
        .catch( ( err ) => reject( err ) );
    } );

   private resetPassword = ( email: string ) => new Promise( ( resolve, reject ) =>
  {

    auth().sendPasswordResetEmail( email ).then( res =>
    {
      resolve( true )
    } ).catch( err =>
    {
      reject( err )
      console.log( err );

    } )
  } )



  logout = () => auth().signOut();


  private moveEventsAround = ( id: string, item: FeedItemModel ) => new Promise( async resolve =>
  {

    console.log("entering move events around");
    
    //check if it exsists in 
    const result = await firestore().doc( `${ eventCollection }/${ id }` ).get()
    if ( result.exists )
    {
      console.log("exsists");
      firestore().doc( `${ eventCollection }/${ id }` ).delete()
    } 
    
    
    //check if it is in pastEventCollection
    const pastResult = await firestore().doc( `${ pastEventCollection }/${ id }` ).get()
    if ( !pastResult.exists ) // perfect
    {
      //if it doesnt add it
      const add = await firestore().collection( `${ pastEventCollection }` ).add( item )
      if (  add.id ) resolve( true )
      else resolve( false )
      
    }

    resolve(true)
  })


  private uploadPhoto = ( data: FeedItemModel ): string | any =>
    new Promise( async ( resolve ) =>
    {
      const filename = data.flyer?.substring( data.flyer?.lastIndexOf( '/' ) + 1 );
      const response = await fetch( data.flyer || '' );
      const blob = await response.blob();
      const operation = storage().ref( `images/flyers/${ filename }` );
      operation
        .put( blob )
        .then( ( res ) =>
        {
          // resolve( true )
          resolve( operation.fullPath );
        } )
        .catch( ( err ) =>
        {
          resolve( false );
        } );
    } );

  private uploadEvent = ( data: FeedItemModel ) =>
    new Promise( ( resolve, reject ) =>
    {
      if ( !this.isLoggedIn() )
      {
        //not logged in
        return reject( errorStrings.notLoggedIn );
      }
      this.uploadPhoto( data ).then( ( res: string ) =>
      {
        if ( res )
        {
          data.flyer = res
          firestore()
            .collection( eventCollection )
            .doc( data.reference )
            .set( data )
            .then( ( res ) =>
            {
              resolve( true );
              this.updateUserEvents( true, data.reference || '' );
            } )
            .catch( ( err ) =>
            {
              reject( false );
            } );
        } else
        {
          reject( false );
        }
      } );
    } );

  private updateUserEvents = ( add: boolean, eventId: string ) =>
  {
    if ( add )
    {
      firestore()
        .doc( `${ userCollection }/${ auth().currentUser?.uid }` )
        .set( { events: firestore.FieldValue.arrayUnion( eventId ) }, { merge: true } );
    } else
    {
      firestore()
        .doc( `${ userCollection }/${ auth().currentUser?.uid }` )
        .set( { events: firestore.FieldValue.arrayRemove( eventId ) } );
    }
  };

  getUsername = () => auth().currentUser?.displayName;
  getUserId = () => auth().currentUser?.uid;

  getEventsInMultiplies = ( amount: number ) =>
  {
    const order = 'date';
    return new Promise( async ( resolve, reject ) =>
    {
      if ( last == null )
      {
        console.log( 'getting data' );

        const firstQuery = firestore()
          .collection( eventCollection )
          .orderBy( order )
          .limit( amount );
        const snapshotQuery = await firstQuery.get();

        if ( snapshotQuery.empty ) return reject( 'empty' );

        //get the last document
        const lastDocInSnapshotQuery =
          snapshotQuery.docs[snapshotQuery.docs.length - 1];
        last = lastDocInSnapshotQuery;
        resolve( snapshotQuery );
      } else
      {
        console.log( 'old', last.id );

        const firstQuery = firestore()
          .collection( eventCollection )
          .orderBy( order )
          .limit( amount )
          .startAfter( last );
        const snapshot = await firstQuery.get();
        if ( snapshot.empty ) return reject( 'empty' );

        const lastDocInSnapshotQuery = snapshot.docs[snapshot.docs.length - 1];
        last = lastDocInSnapshotQuery;
        resolve( snapshot );
      }
    } );
  };

  private getPastEvents = ( amount: number, reference: string ) => new Promise<FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>>( async ( resolve, reject ) =>
  {
    try
    {
      const orderBy = "date"
      let fq = firestore()
        .collection( `${ pastEventCollection }` )
        .orderBy( orderBy )
        .limit( amount )

      if ( reference != "" )
      {
        const snapshot = await firestore().doc( `${ pastEventCollection }/${ reference }` ).get()
        fq = fq.startAfter( snapshot )
      }

      const result = await fq.get()
      if ( result.empty ) return reject( 'empty' );
      resolve( result );

    } catch ( err )
    {
      console.log( "err" );
      reject( err )
    }
  } )

  private getEventsByRatings = ( amount: number ) => new Promise<FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>>( async ( resolve, reject ) =>
  {
    try
    {
      const orderBy = "rating"
      let fq = firestore()
        .collection( `${ pastEventCollection }` )
        .orderBy( orderBy )
        .limit( amount )
      
      const result = await fq.get()
      if ( result.empty ) return reject( 'empty' );
      resolve( result );

    } catch ( err )
    {
      console.log( "err" );
      reject( err )
    }
  } )
  


  private getEventsByType = async ( type: number, referenceNumber: string ) =>
  {
    if ( !referenceNumber )
    {
      return new Promise( ( rs, rj ) => rj( "reference number is null" ) )
    }
    try
    {
      const order = "partyType"
      const amount = 20
      const lastReference = firestore().collection( eventCollection ).doc( referenceNumber )
      const snapshot1 = await lastReference.get()

      return new Promise( async ( resolve, reject ) =>
      {
        const firstQuery = firestore()
          .collection( eventCollection )
          .orderBy( order, "asc" )
          .startAfter( snapshot1 )
          .limit( amount )
          // .where( "partyType", "==", type )
        const snapshot = await firstQuery.get();
        
        if ( snapshot.empty ) return reject( 'empty' );
        resolve( snapshot );

      } )
    } catch ( err )
    {
      console.log( err, "error my guy" );
      return new Promise( ( rs, rj ) => rj( err ) )

    }
  }

  private increaseAttendance = ( key: string ) =>
  {
    return new Promise( ( resolve, reject ) =>
    {
      firestore().collection( eventCollection ).doc( key ).update( { attendance: firestore.FieldValue.increment(1)} ).then( res =>
      {
        resolve( true );
      } ).catch( err =>
      {
          reject(err)
        })
    })
  }

  private getURLForEventFlyers = ( imagePath: string ) =>
  {
    return new Promise<string>( ( resolve, reject ): any =>
    {
      // return reject(false)
      storage()
        .ref( imagePath )
        .getDownloadURL()
        .then( ( url ) =>
        {
          resolve( url )
        } )
        .catch( ( err ) =>
        {
          reject( err )
        } )
    } )
  }

  private getEventsInCategories = ( amount: number ) =>
  {
    //will have to get a large collection and filter them down the line
    return new Promise( async ( resolve, reject ) =>
    {
      const ref = firestore()
        .collection( eventCollection )
        // .where("partyType", "in", [0, 1, 13, 3, 4, 5, 6, 7, 8, 9])
        .limit( amount )
      ref
        .get()
        .then( ( values ) =>
        {
          resolve( values )
        } )
        .catch( ( err ) =>
        {
          reject( err )
        } )
    } )
  }

  private getPicturesForEvent = ( reference: string ) =>
  {
    const arr: string[] = []
    return new Promise<Array<string>>( ( resolve, reject ) =>
    {
      storage()
        .ref( `images/party/${ reference }` )
        .listAll()
        .then( async ( res ) =>
        {
          //all items in file
          for ( var i = 0; i < res.items.length; i++ )
          {
            const url = await res.items[i].getDownloadURL()
            arr.push( url )
          }
          resolve( arr )
        } )
        .catch( ( err ) => reject( err ) )
    } )
  }

  private uploadPhotoToEvent = ( ref: string, url: string ) =>
  {
    return new Promise( async ( resolve ) =>
    {
      const filename = url.substring( url?.lastIndexOf( "/" ) + 1 )

      const response = await fetch( url || "" )
      const blob = await response.blob()

      const operation = storage().ref( `images/party/${ ref }/${ filename }` )

      operation
        .put( blob )
        .then( ( res ) =>
        {
          // resolve( true )
          resolve( operation.fullPath )
        } )
        .catch( ( err ) =>
        {
          resolve( false )
        } )
    } )
  }

  private googleSignIN = () => new Promise( ( resolve, reject ) =>
  {
    GoogleSignin.configure( {
      webClientId: "562995348940-misphpo9doc010508icpohr2sirco00d.apps.googleusercontent.com",
    } )


    GoogleSignin.signIn().then( ( user ) =>
    {

      const googleCredential = auth.GoogleAuthProvider.credential( user.idToken );

      auth().signInWithCredential( googleCredential ).then( res =>
      {
        resolve( res.user.uid )
      } ).catch( err => reject( err ) )
    } ).catch( err =>
    {
      reject( err )

      console.log( err, "err" );

    } )
  } )

  private facebookSignIn = () => new Promise( async ( resolve, reject ) =>
  {
  
  } )

  private rsvpEvent = ( reference: string, add = true ) => new Promise( ( resolve, reject ) =>
  {
    if ( add )
    {
      firestore()
        .doc( `${ userCollection }/${ auth().currentUser?.uid }` )
        .set( { rsvp: firestore.FieldValue.arrayUnion( reference ) }, { merge: true } )
        .then( ( res ) =>
        {
          resolve( true )
        } )
        .catch( ( e ) => reject( false ) )
    } else
    {
      firestore()
        .doc( `${ userCollection }/${ auth().currentUser?.uid }` )
        .set( { rsvp: firestore.FieldValue.arrayRemove( reference ) } )
        .then( ( res ) =>
        {
          resolve( true )
        } )
        .catch( ( e ) => reject( false ) )
    }
  } )

  private getRsvpEvents = () =>
  {
    return new Promise<FirebaseFirestoreTypes.QuerySnapshot>( async ( resolve, reject ) =>
    {
      try
      {
        const d = await firestore().collection( userCollection ).doc( auth().currentUser?.uid ).get()
        if ( d.exists )
        {
          const obj = d.data()
          const arr = obj ? obj["rsvp"] : []
          const rsvpEvents = await firestore().collection( eventCollection ).where( "reference", "in", [...arr] ).get()
          resolve( rsvpEvents )

        } else
        {
          reject( "no data" )
        }
      } catch ( err )
      {
        console.log( "err", err );
        reject( err )

      }
    } )
  }

  private sendRatings = ( rating: number, id: string ) => new Promise<boolean>( ( resolve, reject ) =>
  {
    firestore().doc( `${ eventCollection }/${ id }` ).update( { rating: rating } ).then( res =>
    {
      resolve(true)
    } ).catch( err =>
    {
      reject(false)
    })
  })
  social = {
    GooglsSignIn: this.googleSignIN,
    Facebook: this.facebookSignIn
  }

  auth = {
    login: this.login,
    register: this.register,
    logout: this.logout,
    resetPassword: this.resetPassword,
  }


  events = {
    uploadEvent: this.uploadEvent,
    uploadPhotoToEvent: this.uploadPhotoToEvent,
    uploadRsvpEvents: this.rsvpEvent,
    uploadRating:this.sendRatings,
    getEventsByMultiple: this.getEventsInMultiplies,
    getUrlForFlyers: this.getURLForEventFlyers,
    getEventsInCategories: this.getEventsInCategories,
    getPastPictures: this.getPicturesForEvent,
    getEventByType: this.getEventsByType,
    getRsvpEvents: this.getRsvpEvents,
    getPastEvents: this.getPastEvents,
    getEventsByRatings:this.getEventsByRatings,
    moveEventsAround: this.moveEventsAround,
    increaseAttendance:this.increaseAttendance
  };
}

const FBS = new Store();
export default FBS;
