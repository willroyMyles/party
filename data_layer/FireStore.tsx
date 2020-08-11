import { observable, action } from 'mobx';
import FBS from './FireBaseClient';
import uuidv4 from 'uuid';
import { FeedItemModel, PartyType } from '../universal/Models';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
class Store
{
  @observable data: Map<string, FeedItemModel> = new Map();
  @observable categorizedData: Map<string, FeedItemModel[]> = new Map()
  @observable previewedData: any[] = []
  @observable userName: string | null = null;
  	@observable eventImagesMap: Map<string, string[]> = new Map()

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

      console.log( key );

      if ( this.categorizedData.has( key ) )
      {
        this.categorizedData.get( key )?.push( docs[index].data() )
      } else
      {
        this.categorizedData.set( key, [docs[index].data()] )
      }
    }

    this.sortFeedItemDocs()
  }

  @action sortFeedItemDocs = () =>
  {
    console.log( "loading", this.categorizedData.size );

    const limitInSection = 2 // equates to 3 items
    const obj: any = { title: "", data: [] }
    const arr: any = []
    this.categorizedData.forEach( ( value, key ) =>
    {
      obj.title = key
      obj.data = value.slice( 0, 2 )
      this.previewedData.push( obj )
    } )


  }


  @action private getEvents = () => new Promise( ( resolve, reject ) =>
  {
    FBS.getEventsInMultiplies( 20 ).then( ( res: any ) =>
    {
      const result: FirebaseFirestoreTypes.QuerySnapshot = res

      result.docs.forEach( ( doc, index ) =>
      {
        this.data.set( doc.id, doc.data() )

      } )

      resolve( true )
      this.updateDataImages()
      this.sortCategorizedData( result.docs )
    } ).catch( err =>
    {
      reject( "unable to get events" )
    } )
  } )

  private updateDataImages = () => {
		this.data.forEach(async (value, key) => {
        if (value.imageUrl == undefined || value.imageUrl == null || value.imageUrl == "") {
          value.imageUrl = await FBS.events.getUrlForFlyers(value.flyer || "")
          this.data.set(key, value)
        }
		})
  }
  
  @action private picturesForEvent = (reference: string, initialUpdate: boolean = false) => {
		return new Promise<boolean>((resolve) => {
			FBS.events.getPastPictures(reference)
        .then( ( res ) =>
        {
          console.dir(res)
					if (res) {
						this.eventImagesMap.set(reference, res)

						resolve(true)
					}
				})
				.catch((err) => resolve(false))
		})
  } 
  
  @action private uploadPictureToEvent = (ref: string, imageUrl: string) => {
		return new Promise((resolve) => {
			FBS.events.uploadPhotoToEvent(ref, imageUrl).then((res) => {
				if (res) {
					resolve(true)
				} else {
					resolve(false)
				}
			})
		})
  }
  
  @action private GoogleLogin = () => new Promise( resolve =>
  {
    FBS.social.GooglsSignIn().then(res=> resolve(true)).catch(err=>resolve(false))
  } )
  @action private FacebookLogin = () => new Promise( resolve =>
  {
        FBS.social.Facebook().then(res=> resolve(true)).catch(err=>resolve(false))

  } )
  @action private TwitterLogin = () => new Promise( resolve =>
  {
    
  } )
  
  @action LogOut = () => FBS.logout()

  @action getSpecificParties = ( type: number ) => new Promise( ( resolve, reject ) =>
  {
    
  })

  retrieve = {
    isLoggedIn: this.isLoggedIn,
    events: this.getEvents,
    picturesForEvent : this.picturesForEvent
  };

  send = {
    sendEvent: this.sendEvent,
    sendPicturesToEvent : this.uploadPictureToEvent
  };

  auth = {
    login: this.login,
    register: this.register,
    google: this.GoogleLogin,
    facebook: this.FacebookLogin,
    twitter: this.TwitterLogin,
    logout: this.LogOut
  };
}

const FireStore = new Store();
export default FireStore;
