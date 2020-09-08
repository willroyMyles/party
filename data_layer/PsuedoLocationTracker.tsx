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
import RateParty from "../components/RateParty"

export const radius = 100;
export const taskName = 'geoLocation';
export const threshold = 10 / radius
export class PsuedoLocationTracker
{
    @observable userLocation: LatLng | undefined = undefined
    @observable data: Map<string, LocationRegion> = new Map()

    @observable entered: Map<string, number> = new Map()
    @observable processed: Map<string, string> = new Map()


    @action updateUserLocation = ( latLng: LatLng ) =>
    {

        
        if(this.data.size == 0) return
        this.userLocation = latLng;        

        console.log(`this is processed size ${this.processed.size} \n this is data size ${this.data.size} \n`);
        
        
        [...this.data.entries()].map( async ( value, index ) =>
        {            
            if ( this.processed.has( value[0] ) ) return

            const ll = getDistanceFromLatLonInKm( value[1].latitude, value[1].longitude, this.userLocation?.latitude, this.userLocation?.longitude )

            console.log(`\nthis is distance and threshold ${ll} : ${threshold} : ${value[0]} \n`);
            
            if ( ll <= threshold)
            {
                if ( AppState.currentState == "active" )
                {

                    this.entered.set( value[0], ll )
                    eventEmitter.emit( eventStrings.locationEntered, value[0] )
                    console.log( "fence breached" );


                    // check if already asked
                    if ( this.processed.has( value[0] ) ) return
                    
                    // ask to rate
                    RateParty.show(value[0])

                    //remove from watch and add to processed 
                    this.data.delete( value[0] )
                    this.processed.set(value[0], value[0])
                } else
                {
                    const perm = await GetNotificationPermission()
                    if ( perm )
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

            // if ( this.entered.has( value[0] ) && ll > threshold )
            // {
            //     this.entered.delete( value[0] )
            //     eventEmitter.emit( eventStrings.locationExited, value[0] )
            //     console.log( "fence lefted" );

            // }

        } )
    }

    @action watchTheseLocations = ( data: LocationRegion[] ) =>
    {
        console.log("watched updated");
        
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