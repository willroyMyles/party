import { LocationRegion } from "expo-location"
import { action, autorun, observable } from "mobx"
import { LatLng } from "react-native-maps"
import { eventEmitter, eventStrings } from "../universal/EventEmitter"
import { getDistanceFromLatLonInKm, getLatitudeLongitudeFromString } from "../universal/GetLocation"
import { FeedItemModel } from "../universal/Models"
import FireStore from "./FireStore"

export const radius = 100;
export const taskName = 'geoLocation';
export const threshold = 10 / radius
class PsuedoLocationTracker
{
    @observable trackedData: Map<string, number> = new Map()
    @observable userLocation: LatLng | undefined = undefined
    @observable data: Map<string, LocationRegion> = new Map()

    @observable entered: Map<string, number> = new Map()
    @observable exited: Map<string, number> = new Map()

    init = () => null

    @action getObservationalData = () =>
    {

    }

    @action updateUserLocation = ( latLng: LatLng ) =>
    {
        this.userLocation = latLng;
        console.log( this.data.size );

        [...this.data.entries()].map( ( value, index ) =>
        {
            const ll = getDistanceFromLatLonInKm( value[1].latitude, value[1].longitude, this.userLocation?.latitude, this.userLocation?.longitude )
            this.trackedData.set( value[0], ll )


            if ( ll <= threshold )
            {
                this.entered.set( value[0], ll )
                eventEmitter.emit( eventStrings.locationEntered, value[0] )
                console.log( "fence breached" );

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
        data.map( ( value, index ) =>
        {
            this.data.set( value.identifier || "", value )
        } )
    }
    @action sortData = () =>
    {

        if ( this.userLocation )
        {
            const arr = [...FireStore.data.values()]
            for ( let index = 0; index < arr.length; index++ )
            {
                const element = arr[index];
                if ( this.data.has( element.reference ) ) continue;
                const latlng = getLatitudeLongitudeFromString( element.location )
                const distance = getDistanceFromLatLonInKm( latlng?.latitude, latlng?.longitude, this.userLocation.latitude, this.userLocation.longitude )
                element.distance = distance
                this.data.set( element.reference, element )
            }

            const arr1 = [...this.data.values()].sort( ( a, b ) => a.distance - b.distance )

            for ( let index = 0; index < 4; index++ )
            {
                this.trackedData.push( arr1[index] )
            }
        }

    }

    getTopFive = () =>
    {

    }

    v = autorun( () =>
    {
        if ( FireStore.data )
        {
            console.log( "data changesd" );
        }
    } )

}






const psuedoLocationTracker = new PsuedoLocationTracker()
export default psuedoLocationTracker