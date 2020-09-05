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
  @observable intermediateryData: Map<string, FeedItemModel> = new Map();
  @observable rsvpData: Map<string, FeedItemModel> = new Map();
  @observable categorizedData: Map<string, FeedItemModel[]> = new Map()
  @observable previewedData: any[] = []
  @observable userName: string | null = null;
  @observable eventImagesMap: Map<string, string> = new Map()
  @observable eventImagesForPastEventsMap: Map<string, string[]> = new Map()

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
          resolve( true );
        } )
        .catch( ( err ) => reject( err ) );
    } );
  };

  private sortCategorizedData = ( docs: FirebaseFirestoreTypes.QueryDocumentSnapshot[] ) =>
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

    eventEmitter.emit(eventStrings.categorizedDataLoaded)

    // this.sortFeedItemDocs()
  }

  // @action sortFeedItemDocs = () =>
  // {
  //   const limitInSection = 2 // equates to 3 items
  //   const obj: any = { title: "", data: [] }
  //   const arr: any = []
  //   this.categorizedData.forEach( ( value, key ) =>
  //   {
  //     obj.title = key
  //     obj.data = value.slice( 0, 2 )
  //     this.previewedData.push( obj )
  //   } )
  // }



  sortDataFromFireBase = ( data: any ) =>
  {
    this.intermediateryData.clear()
    return new Promise( ( resolve, reject ) =>
    {
      const result: FirebaseFirestoreTypes.QuerySnapshot = data

      result.docs.forEach( ( doc, index ) =>
      {
        if ( !this.data.has( doc.id ) ) this.data.set( doc.id, doc.data() )
        this.intermediateryData.set(doc.id, doc.data())
      } )
      resolve( true )
      this.sortCategorizedData( result.docs )
      eventEmitter.emit( eventStrings.dataFromProviderFinishedLoad )
    } )
  }

  @action private getEvents = () => new Promise( ( resolve, reject ) =>
  {
    FBS.getEventsInMultiplies( 2 ).then( ( res: any ) =>
    {
      this.sortDataFromFireBase( res ).then( res =>
      {
        resolve( true )
      } )
    } ).catch( err =>
    {
      reject( "unable to get events" )
    } )
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

  private getEventImageForReference = ( reference: string ) => new Promise<string>( async ( resolve, reject ) =>
  {

    if ( this.eventImagesMap.has( reference ) )
    {
      return resolve( this.eventImagesMap.get( reference ) )
    }

    try
    {
      const flyer = this.data.get( reference )?.flyer
      const imageUrl = await FBS.events.getUrlForFlyers( flyer || "" )

      this.eventImagesMap.set( reference, imageUrl )
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

  retrieve = {
    isLoggedIn: this.isLoggedIn,
    events: this.getEvents,
    picturesForEvent: this.picturesForEvent,
    specificParties: this.getSpecificParties,
    rsvpEvents: this.getRsvpEvents,
    imageFromReference: this.getEventImageForReference
  };

  send = {
    sendEvent: this.sendEvent,
    sendPicturesToEvent: this.uploadPictureToEvent,
    rsvp: this.addRsvpEvent
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
