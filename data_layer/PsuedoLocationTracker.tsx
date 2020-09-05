import { LocationRegion } from "expo-location"
import { action, autorun, observable } from "mobx"
import { LatLng } from "react-native-maps"
import { eventEmitter, eventStrings } from "../universal/EventEmitter"
import { getDistanceFromLatLonInKm, getLatitudeLongitudeFromString } from "../universal/GetLocation"
import { FeedItemModel } from "../universal/Models"
import FireStore from "./FireStore"
import uuid from 'uuid'
import { GetNotificationPermission } from "../universal/GetNotification"
import * as Notifications from 'expo-notifications'
import { AppState, AppStateStatus } from "react-native"

export const radius = 100;
export const taskName = 'geoLocation';
export const threshold = 10 / radius
export class PsuedoLocationTracker
{
    @observable trackedData: Map<string, number> = new Map()
    @observable userLocation: LatLng | undefined = undefined
    @observable data: Map<string, LocationRegion> = new Map()

    @observable entered: Map<string, number> = new Map()
    @observable exited: Map<string, number> = new Map()

    @observable id = uuid.v4()

    init = () => null

    @action getObservationalData = () =>
    {

    }

    @action updateUserLocation = ( latLng: LatLng ) =>
    {

        console.log( `the size is ${ this.data.size}\n`);
        
        if(this.data.size == 0) return
        this.userLocation = latLng;
        
        [...this.data.entries()].map( async ( value, index ) =>
        {
            const ll = getDistanceFromLatLonInKm( value[1].latitude, value[1].longitude, this.userLocation?.latitude, this.userLocation?.longitude )
            this.trackedData.set( value[0], ll )


            if ( ll <= threshold )
            {
                this.entered.set( value[0], ll )
                eventEmitter.emit( eventStrings.locationEntered, value[0] )
                console.log( "fence breached" );
                const perm = await GetNotificationPermission()
                if ( perm )
                {


                    if ( AppState.currentState == 'active' )
                    {
                        eventEmitter.emit(eventStrings.ArrivedAtParty, value[0])
                        
                    } else
                    {
                        console.log( "should sent noti" );

                        Notifications.setNotificationHandler( {
                            handleNotification: async () => ( {
                                shouldShowAlert: true,
                                shouldPlaySound: false,
                                shouldSetBadge: false,
                            } ),
                        } );

                        Notifications.scheduleNotificationAsync( {
                            content: {
                                title: "test notification",
                                body: `seem your at ${ value[1].identifier }, enjoying it?`,
                                autoDismiss: true,

                            },
                            trigger: {
                                seconds: 1
                            }
                        } )
                    }
                    

                    
                }

            }

            if ( this.entered.has( value[0] ) && ll > threshold )
            {
                this.entered.delete( value[0] )
                eventEmitter.emit( eventStrings.locationExited, value[0] )
                console.log( "fence lefted" );

            }

        } )
    }

    @action watchTheseLocations = ( data: LocationRegion[] ) =>
    {
        this.data.clear()
        const d = new Map()
        data.map( ( value, index ) =>
        {
            d.set( value.identifier || "", value )
        } )

        this.data = d
    }


    getTopFive = () =>
    {

    }

}






const psuedoLocationTracker = new PsuedoLocationTracker()
export default psuedoLocationTracker