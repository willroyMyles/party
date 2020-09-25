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

export const thirtyMins = 30;
export const oneHour = thirtyMins * 2;
export class PsuedoLocationTracker
{
    @observable userLocation: LatLng | undefined = undefined
    @observable data: Map<string, LocationRegion> = new Map()

    @observable entered: Map<string, number> = new Map()
    @observable processed: Map<string, Date> = new Map()
    @observable done: Set<string > = new Set()

    finished = ( reference: string ) =>
    {
        this.done.add( reference );
        
        [...this.done.values()].map( ( value ) =>
        {
            if(this.data.has(value)) this.data.delete(value)
        })
    }

    secondProcess = (reference : string) =>
    {

        if ( this.processed.has( reference ) )
        {
            // at the party]
            FireStore.send.increaseAttendance( reference ).then( res =>
            {
                this.finished(reference)
            }).catch( err =>
            {
                console.log("could not update party");
                
            })
        } else
        {
            this.processed.delete(reference)
        }
    }

    addToProcessed( reference: string )
    {
        if ( this.processed.has( reference ) )
        {            
            const interval = new Date().getMinutes() - this.processed.get( reference )?.getMinutes();
            console.log(`interval, ${interval}`);
            
            if (  interval > thirtyMins )
            {
                this.secondProcess( reference )
            }
            return
        }
        
        this.processed.set( reference, new Date() );

    }

    @action updateUserLocation = ( latLng: LatLng ) =>
    {

        // console.log( `this is processed size ${ this.processed.size } \n this is data size ${ this.data.size } \n` );
        
        if(this.data.size == 0) return
        this.userLocation = latLng;        

        

        [...this.data.entries()].map( ( [key, value], index ) =>
        {
            const distance = getDistanceFromLatLonInKm( value.latitude, value.longitude, latLng.latitude, latLng.longitude )
            
            if ( distance <= threshold )
            {
                this.addToProcessed( key )
                this.entered.set(key, 0)
                eventEmitter.emit( eventStrings.locationEntered, key )
            } 

            if ( distance > threshold )
            {
                if ( this.entered.has( key ) ) this.entered.delete( key );
                // if(this.processed.has(key)) this.processed.delete(key)
                eventEmitter.emit( eventStrings.locationExited, key )
                
            }
            
        })
        
        
        // [...this.data.entries()].map( async ( value, index ) =>
        // {            
        //     if ( this.processed.has( value[0] ) ) return

        //     const ll = getDistanceFromLatLonInKm( value[1].latitude, value[1].longitude, this.userLocation?.latitude, this.userLocation?.longitude )
            


        //     if ( ll <= threshold)
        //     {
        //         if ( AppState.currentState == "active" )
        //         {

        //             this.entered.set( value[0], ll )
        //             eventEmitter.emit( eventStrings.locationEntered, value[0] )
        //             console.log( "fence breached" );


        //             // check if already asked
        //             if ( this.processed.has( value[0] ) ) return
                    
        //             // ask to rate
        //             RateParty.show(value[0])

        //             //remove from watch and add to processed 
        //             this.data.delete( value[0] )
        //             this.addToProcessed(value[0])
        //         } else
        //         {
        //             const perm = await GetNotificationPermission()
        //             if ( perm )
        //             {
        //                 console.log( "should sent noti" );
        //                 this.addToProcessed( value[0] )
        //                 Notifications.setNotificationHandler( {
        //                     handleNotification: async () => ( {
        //                         shouldShowAlert: true,
        //                         shouldPlaySound: false,
        //                         shouldSetBadge: false,
        //                     } ),
        //                 } );

        //                 Notifications.scheduleNotificationAsync( {
        //                     content: {
        //                         title: "test notification",
        //                         body: `seem your at ${ value[1].identifier }, enjoying it?`,
        //                         autoDismiss: true,
        //                     },
        //                     trigger: {
        //                         seconds: 1
        //                     }
        //                 } )
        //             }

        //         }
        //     }

        //     if(ll > threshold && p)
        // } )
   
   
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