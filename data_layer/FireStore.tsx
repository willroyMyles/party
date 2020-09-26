import { observable, action } from 'mobx';
import FBS from './FireBaseClient';
import uuidv4 from 'uuid';
import { FeedItemModel, PartyType } from '../universal/Models';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { eventEmitter, eventStrings } from '../universal/EventEmitter';
import { Alert } from 'react-native';
class Store
{
  @observable data: Map<string, FeedItemModel> = new Map();
  @observable memoryData: Map<string, FeedItemModel> = new Map();
  @observable ratingsData: FeedItemModel[] = []
  @observable intermediateryData: Map<string, FeedItemModel> = new Map();
  @observable rsvpData: Map<string, FeedItemModel> = new Map();
  @observable categorizedData: Map<string, FeedItemModel[]> = new Map()
  @observable previewedData: any[] = []
  @observable userName: string | null = null;
  @observable eventImagesMap: Map<string, string> = new Map()
  @observable eventImagesForPastEventsMap: Map<string, string[]> = new Map()

  organizeStream = ( docs: FirebaseFirestoreTypes.QuerySnapshot ) =>
  {
    this.counter++

    docs.forEach( ( doc, index ) =>
    {
      const item: FeedItemModel = doc.data();
      const id = doc.id

      //organized into old and new
      if ( this.checkDate( item.date ) ) this.memoryData.set( id, item )
      else
      {
        this.data.set( id, item )
        this.organizeIntoCategories(item)
      }
    } )
  }
  
  organizeIntoCategories = ( data: FeedItemModel ) =>
  {
    const key = PartyType[data.partyType]
    
    if ( this.categorizedData.has( key ) )
    {
      this.categorizedData.get( key )?.push( data )
    } else
    {
      this.categorizedData.set( key, [data] )
    }
  }

  constructor()
  {
    FBS.events.linktorealTimeEvents( this.organizeStream)
  }




  @action isLoggedIn = () => FBS.isLoggedIn();
  @action login = ( email: string, password: string ) =>
    FBS.login( email, password );
  @action register = ( username: string, email: string, password: string ) =>
    new Promise( ( resolve, reject ) =>
    {
      FBS.register( username, email, password )
        .then( ( res ) =>
        {
          this.userName = username;
          resolve( true );
        } )
        .catch( ( err ) => reject( err ) );
    } );

  @action private sendEvent = ( data: FeedItemModel ) =>
  {
    data.person = FBS.getUsername() || '';
    data.personId = FBS.getUserId();
    data.priority = data.priority || 0;
    data.reference = uuidv4.v4();
    data.timeStamp = new Date();

    return new Promise( ( resolve, reject ) =>
    {
      FBS.events
        .uploadEvent( data )
        .then( ( res ) =>
        {
          this.data.set( data.reference || "", data )
          eventEmitter.emit(eventStrings.dataFromProviderFinishedLoad)
          resolve( true );
        } )
        .catch( ( err ) => reject( err ) );
    } );
  };


  private sortAll = ( docs: FirebaseFirestoreTypes.QueryDocumentSnapshot[] ) =>
  {
    this.sortCategorizedData( docs )
  }

  private sortMemoryData = ( docs: FirebaseFirestoreTypes.QueryDocumentSnapshot[] ) => new Promise( resolve =>
  {
    for ( let index = 0; index < docs.length; index++ )
    {
      const element = docs[index];
      const item: FeedItemModel = element.data()
      const val = this.checkDate( item.date || "" )
      if ( val )
      { // add to memory set
        this.memoryData.set( item.reference , item )
        // FBS.events.moveEventsAround( element.id, item )
      }
    }
    resolve( true )
  } )  

  /**
   * 
   * @param d which is a string date
   * 
   * if d is less than current date, will return true
   */
  private checkDate = ( d: string ) =>
  {
    const old = Date.parse( d )
    const comp = new Date().valueOf()
    return old <= comp
  }
  private sortCategorizedData = ( docs: FirebaseFirestoreTypes.QueryDocumentSnapshot[] ) => new Promise( resolve =>
  {
    for ( let index = 0; index < docs.length; index++ )
    {
      const key = PartyType[docs[index].data().partyType]
      const element = docs[index]

      
      if ( this.categorizedData.has( key ) )
      {
        this.categorizedData.get( key )?.push( docs[index].data() )
      } else
      {
        this.categorizedData.set( key, [docs[index].data()] )
      }
    }

    eventEmitter.emit( eventStrings.categorizedDataLoaded )
    resolve(true)
  })


  sortDataFromFireBase = ( data: FirebaseFirestoreTypes.QuerySnapshot ) =>
  {
    this.intermediateryData.clear()
    return new Promise( ( resolve, reject ) =>
    {
      data.docs.forEach( ( doc, index ) =>
      {         
        if ( !this.data.has( doc.id ) && !this.checkDate( doc.data().date ) ) this.data.set( doc.id, doc.data() )
        else this.memoryData.set( doc.id, doc.data() ) // add to memory page
        
        this.intermediateryData.set(doc.id, doc.data())
      } )
      resolve( true )
      this.sortAll(data.docs)
      eventEmitter.emit( eventStrings.dataFromProviderFinishedLoad )
    } )
  }

  @action private getEvents = () => new Promise( ( resolve, reject ) =>
  {
    return
    FBS.getEventsInMultiplies( 10 ).then( ( res: any ) =>
    {
      // this.sortMemoryData( res.docs )

      this.sortDataFromFireBase( res ).then( res =>
      {
        resolve( true )
      } )
    } ).catch( err =>
    {
      reject( "unable to get events" )
    } )
  } )

  @action private getPastEvents = ( reference: string ) => new Promise( ( resolve, reject ) =>
  {
    const amount = 15
    FBS.events.getPastEvents( amount, reference ).then( res =>
    {
      this.sortMemoryData(res.docs)
      resolve( true )
    } ).catch( err =>
    {
      reject(err)
    })
  } )

  @action private getEventsByRatings = () => new Promise < FeedItemModel[]>( ( resolve, reject ) =>
  {
    const amount = 50

    FBS.events.getEventsByRatings( amount ).then( res =>
    {
      const d: FeedItemModel[] = []

      for (let index = 0; index < res.docs.length; index++) {
        const element = res.docs[index];
        d.push( element.data() )

      }

      // this.ratingsData = this.ratingsData.concat( ...d )
      resolve(d)
    } ).catch( err =>
    {
      reject("no more data")
    })
  } )



  private updateDataImages = () =>
  {
    this.data.forEach( async ( value, key ) =>
    {
      if ( value.imageUrl == undefined || value.imageUrl == null || value.imageUrl == "" )
      {
        value.imageUrl = await this.getEventImageForReference( key )
        this.data.set( key, value )
      }
    } )
  }

  private getEventImageForReference = ( reference: string, flyer:string ) => new Promise<string>( async ( resolve, reject ) =>
  {

    
    if ( this.eventImagesMap.has( reference ) )
    {
      return resolve( this.eventImagesMap.get( reference ) )
    }

    try
    {
      const imageUrl = await FBS.events.getUrlForFlyers( flyer)
      resolve( imageUrl )
    } catch ( err )
    {
      console.log( `didnt get image for reference : ${ reference }`, err );

    }
  } )

  @action private picturesForEvent = ( reference: string, initialUpdate: boolean = false ) =>
  {
    return new Promise<boolean>( ( resolve ) =>
    {

      //TODO: have a function  that caches images 

      FBS.events.getPastPictures( reference )
        .then( ( res ) =>
        {
          if ( res )
          {
            this.eventImagesForPastEventsMap.set( reference, res )

            resolve( true )
          }
        } )
        .catch( ( err ) => resolve( false ) )
    } )
  }

  @action private uploadPictureToEvent = ( ref: string, imageUrl: string ) =>
  {
    return new Promise( ( resolve ) =>
    {
      FBS.events.uploadPhotoToEvent( ref, imageUrl ).then( ( res ) =>
      {
        if ( res )
        {
          resolve( true )
        } else
        {
          resolve( false )
        }
      } )
    } )
  }

  @action private GoogleLogin = () => new Promise( resolve =>
  {
    FBS.social.GooglsSignIn().then( res => resolve( true ) ).catch( err => resolve( false ) )
  } )
  @action private FacebookLogin = () => new Promise( resolve =>
  {
    FBS.social.Facebook().then( res => resolve( true ) ).catch( err => resolve( false ) )

  } )
  @action private TwitterLogin = () => new Promise( resolve =>
  {

  } )

  @action LogOut = () => FBS.logout()

  @action private resetPassword = ( email: string ) => FBS.auth.resetPassword( email )

  @action private getSpecificParties = ( type: number, lastReference: string ) => new Promise( ( resolve, reject ) =>
  {

    FBS.events.getEventByType( type, lastReference ).then( res =>
    {
      this.sortDataFromFireBase( res ).then( res =>
      {
        resolve( true )
      } )
    } ).catch( err =>
    {
      reject( false )
    } )
  } )

  @action private addRsvpEvent = ( reference: string, add = true ) => new Promise( ( resolve, reject ) =>
  {
    FBS.events.uploadRsvpEvents( reference, add ).then( res => resolve( true ) ).catch( err => reject( false ) )
  } )

  @action private getRsvpEvents = () => new Promise( ( resolve, reject ) =>
  {
    FBS.events.getRsvpEvents().then( res =>
    {


      for ( let index = 0; index < res.docs.length; index++ )
      {
        const element = res.docs[index];
        const data: FeedItemModel = element.data()
        this.rsvpData.set( data.reference || "", data )
        this.data.set( data.reference, data )
      }

      resolve( true )
      eventEmitter.emit(eventStrings.dataFromProviderFinishedLoad)

    } ).catch( err => reject( err ) )
  } )

  @action private sendRating = ( rating: number, reference: string) => new Promise( ( resolve, reject ) =>
  {
    const item = this.data.get( reference )
    
    if ( item )
    {
      const rat = item?.rating || 0;
      FBS.events.uploadRating( rat + rating, reference ).then( res =>
        {
        item.rating = rat + rating
        this.data.set( item.reference || "", item )
        resolve(true)
        })
    } 
    else
    {
      reject(false)
    }
  })
  @action private needsToBeLoggedInToProceed = () => new Promise<boolean>( resolve =>
  {
    if ( this.isLoggedIn() )
    {
      resolve( true )
    } else
    {
      resolve( false )
      Alert.alert( "who are you?", "you need to be logged in to complete this action" )

    }
  } )

  @action private moveData = () =>
  {
    const arr = [...this.data.values()]
    

      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];

        const goAhead = this.checkDate( element.date )

        if(goAhead) FBS.events.moveEventsAround( element.reference, element ).then( res =>
        {
          if ( res )
          {
            this.data.delete( element.reference )
            this.memoryData.set( element.reference, element)
          } else
          {
            
          }
        })
        
      }
  }

  @action private increaseAttendance = (key:string) => new Promise<boolean>( ( resolve, reject ) =>
  {
    FBS.events.increaseAttendance( key ).then( res =>
    {
        resolve(res)
    } ).catch( err =>
    {
        reject("err")
      })
  })

  retrieve = {
    isLoggedIn: this.isLoggedIn,
    events: this.getEvents,
    picturesForEvent: this.picturesForEvent,
    specificParties: this.getSpecificParties,
    rsvpEvents: this.getRsvpEvents,
    imageFromReference: this.getEventImageForReference,
    getPastEvents: this.getPastEvents,
    getEventsByRatings: this.getEventsByRatings
  };

  send = {
    sendEvent: this.sendEvent,
    sendPicturesToEvent: this.uploadPictureToEvent,
    rsvp: this.addRsvpEvent,
    rating: this.sendRating,
    moveDataAround: this.moveData,
    increaseAttendance: this.increaseAttendance
  };

  auth = {
    login: this.login,
    register: this.register,
    google: this.GoogleLogin,
    facebook: this.FacebookLogin,
    twitter: this.TwitterLogin,
    logout: this.LogOut,
    resetPassword: this.resetPassword,
    needAuth: this.needsToBeLoggedInToProceed
  };
}

const FireStore = new Store();
export default FireStore;
