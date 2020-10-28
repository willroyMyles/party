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

const fifteenMinutes = 15;
export const thirtyMins = fifteenMinutes * 2;
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
            // this.processed.delete(reference)
        }
    }

    addToProcessed( reference: string )
    {
        if ( this.processed.has( reference ) )
        {            
            const interval = new Date().getMinutes() - this.processed.get( reference )?.getMinutes();
            
            if (  interval > 3 )
            {
                this.secondProcess( reference )
            }
            return
        }
        
        console.log("added to process", reference);
        
        this.processed.set( reference, new Date() );

    }

    @action updateUserLocation = ( latLng: LatLng ) =>
    {
        console.log( "updating stat", latLng);
        
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