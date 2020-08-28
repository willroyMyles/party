import { LocationRegion } from "expo-location"
import { action, autorun, observable } from "mobx"
import { LatLng } from "react-native-maps"
import { eventEmitter, eventStrings } from "../universal/EventEmitter"
import { getDistanceFromLatLonInKm, getLatitudeLongitudeFromString } from "../universal/GetLocation"
import { FeedItemModel } from "../universal/Models"
import FireStore from "./FireStore"
import uuid from 'uuid'
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
        this.userLocation = latLng;
        console.log("updateedd", this.data.size);
        

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
        const d = new Map()
        data.map( ( value, index ) =>
        {
            console.log(`watching ${value}`);
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