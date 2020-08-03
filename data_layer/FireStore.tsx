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
    // docs.map( ( docr, index ) =>
    // {
    //   const doc: FeedItemModel = docr as unknown as FeedItemModel
    //   const key = PartyType[doc.partyType || PartyType.AFTER_WORK_JAM]
    //   if ( this.categorizedData.has( key ) )
    //   {
    //     this.categorizedData.get( key )?.push( doc )
    //   } else
    //   {
    //     this.categorizedData.set( key, [doc] )
    //   }
    // } )

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
      this.sortCategorizedData( result.docs )
    } ).catch( err =>
    {
      reject( "unable to get events" )
    } )
  } )

  retrieve = {
    isLoggedIn: this.isLoggedIn,
    events: this.getEvents
  };

  send = {
    sendEvent: this.sendEvent,
  };

  auth = {
    login: this.login,
    register: this.register,
  };
}

const FireStore = new Store();
export default FireStore;
