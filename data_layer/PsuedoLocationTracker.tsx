import { action, autorun, observable } from "mobx"
import { LatLng } from "react-native-maps"
import { getDistanceFromLatLonInKm, getLatitudeLongitudeFromString } from "../universal/GetLocation"
import { FeedItemModel } from "../universal/Models"
import FireStore from "./FireStore"

class PsuedoLocationTracker
{
    @observable trackedData: FeedItemModel[] = [] //should hold 5
    @observable userLocation: LatLng | undefined = undefined
    @observable data: Map<string, FeedItemModel> = new Map()

    init = () => null

    @action getObservationalData = () =>
    {

    }

    @action updateUserLocation = ( latLng: LatLng ) =>
    {
        this.userLocation = latLng
        this.trackedData.map( ( value, index ) =>
        {
            const latlng = getLatitudeLongitudeFromString( latlng )
            const distance = getDistanceFromLatLonInKm( latlng?.latitude, latlng?.longitude, latLng.latitude, latLng.longitude )

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