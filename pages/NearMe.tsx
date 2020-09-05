import { LocationRegion } from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import MapView, {
    Circle,
    EventUserLocation,
    LatLng,
    Marker,
    PROVIDER_GOOGLE,
    Region,
} from 'react-native-maps';
import { View, Text, Colors, LoaderScreen } from 'react-native-ui-lib';
import { useTheme } from 'styled-components';
import Mapcard from '../components/Mapcard';
import { MarkerPinItem } from '../components/MarkerPin';
import FireStore from '../data_layer/FireStore';
import { getLatitudeLongitudeFromString, getLocation, getRegion } from '../universal/GetLocation';
import { FeedItemModel } from '../universal/Models';
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { eventEmitter, eventStrings } from '../universal/EventEmitter';
import psuedoLocationTracker, { PsuedoLocationTracker, radius } from '../data_layer/PsuedoLocationTracker';
import { AppState, AppStateStatus, Platform } from 'react-native';

let count = 0
const foregroundTask = "online geo tasks"
const backgroundTask = "offline geo tasks"


export const GeoLocationUpdates = ( { data, error }: { data: any, error: any } ) =>
{

    if ( error )
    {
        console.log( error )
        return
    }

    if ( data )
    {
        const { longitude, latitude } = data.locations[0].coords
        psuedoLocationTracker.updateUserLocation( { latitude, longitude } )
    }
}

export const GeoLocationUpdatesActive = ( { data, error }: { data: any, error: any } ) =>
{


    if ( error )
    {
        console.log( error )
        return
    }

    if ( data )
    {

        if(AppState.currentState !== "active") return
        const { longitude, latitude } = data.locations[0].coords
        psuedoLocationTracker.updateUserLocation( { latitude, longitude } )
    }
}

TaskManager.defineTask( backgroundTask, GeoLocationUpdates )
TaskManager.defineTask( foregroundTask, GeoLocationUpdatesActive )


const NearMe = () =>
{
    const map = useRef<MapView | any>();
    const theme = useTheme();
    const [region, setRegion] = useState<Region | null>();
    const [markers, setMarkers] = useState<FeedItemModel[]>( [] );
    const [focusedEvent, setFocusedEvent] = useState<string>( '' );
    const [geoRegions, setGeoRegions] = useState<LocationRegion[]>( [] )

    useEffect( () =>
    {
        getUserRegion();
        sortMarkers()
        
        if ( !eventEmitter.eventNames().includes( eventStrings.dataFromProviderFinishedLoad ) )
        eventEmitter.addListener( eventStrings.dataFromProviderFinishedLoad, () => sortMarkers() )

        AppState.addEventListener("change", changeLocationUpdates)
        return () =>
        {
            AppState.removeEventListener( "change", changeLocationUpdates )

            // eventEmitter.removeListener( eventStrings.dataFromProviderFinishedLoad, () => sortMarkers() )
        };
    }, [] );

    const changeLocationUpdates = ( state: AppStateStatus ) =>
    {
        if ( state == "active" )
        {
            stopBackgroundTask()
            startForegroundTasks(geoRegions)
        } else
        {
            stopForegroundTask()
            startBackgroundTasks(geoRegions)
        }
    }

    useEffect( () =>
    {
        console.log(`data changed within firesotr //// \n`);
        
        sortMarkers()
        return () => {
        }
    }, [FireStore.data])

    const userLocationChanged = async ( e: EventUserLocation ) =>
    {
        try
        {            
            const loc = e.nativeEvent.coordinate;
            const reg = await getRegion( loc );
            setRegion( reg );
        } catch ( err )
        {
            console.log( 'err', err );
        }
    };

    const getUserRegion = async () =>
    {
        try
        {
            const coor = await getLocation();
            const reg = await getRegion( coor );
            if ( map.current )
            {
                map.current.animateToRegion( reg );
                map.current.forceUpdate();
            }
            setRegion( reg );
        } catch ( err )
        {
            console.log( 'err', err );
        }
    };

    const startForegroundTasks = ( data: any[] ) =>
    {
        console.log("foregroun tasks started");
        
        Location.startLocationUpdatesAsync( foregroundTask, { //runs unlimited
            accuracy: Location.Accuracy.Low,
            distanceInterval: 3000
        } ).then( res =>
        {
            psuedoLocationTracker.watchTheseLocations( data )

        } )
    }

    const startBackgroundTasks = ( data: any[] ) =>
    {
        console.log( "backgroun tasks started" );

        Location.startLocationUpdatesAsync( backgroundTask, { //runs unlimited
            timeInterval: 1000 * 60 * 6, //runs every 6 mins,
            accuracy: Location.Accuracy.Balanced,
        } ).then( res =>
        {
            psuedoLocationTracker.watchTheseLocations( data )

        } )
    }

    const stopForegroundTask = () => Location.stopLocationUpdatesAsync( foregroundTask )
    const stopBackgroundTask = () =>    Location.stopLocationUpdatesAsync(backgroundTask)
    

    const sortMarkers = () =>
    {
        const arr = [...FireStore.data.values()];
        if(arr.length == 0) return
        setMarkers( arr );

        const d: any = []
        for ( let index = 0; index < arr.length; index++ )
        {
            const element = arr[index];
            const coord = getLatitudeLongitudeFromString( element.location );
            if ( coord )
            {
                const c: LocationRegion = {
                    latitude: coord.latitude,
                    longitude: coord.longitude,
                    radius: radius,
                    identifier: element.reference,
                };

                d.push( c )
            }
        }

        console.log(`length of d is ${d.length}`);
        
        setGeoRegions( d )
        startForegroundTasks( d )
    };

    // if ( region )
    return (
        <View style={{ backgroundColor: Colors.background }}>
            <MapView
                ref={map}
                showsUserLocation
                onUserLocationChange={userLocationChanged}
                onPress={() => setFocusedEvent( "" )}
                onTouchStart={()=> setFocusedEvent("")}
                style={{ width: '100%', height: '100%' }}
                provider={PROVIDER_GOOGLE}>
                {region && <Circle
                    radius={radius}
                    center={region}
                    fillColor={Colors.primary + '22'}
                    strokeWidth={1}
                    strokeColor={Colors.grey50}
                />}

                <ShowEventOnMarkerPressed
                    markers={markers}
                    onPress={setFocusedEvent}
                    region={region}
                />


            </MapView>
            <View
                padding-10
                center
                style={{
                    position: 'absolute',
                    minHeight: 10,
                    minWidth: '100%',
                    // bottom: 3,
                    top:"17%"
                }}>
                {focusedEvent != "" && region && (

                        <Mapcard reference={focusedEvent} currentPosition={region} />
                )}
            </View>
        </View>
    );

};

const ShowEventOnMarkerPressed = ( {
    markers,
    onPress,
    region
}: {
    markers: FeedItemModel[],
        onPress: ( ref: string ) => void,
    region:Region
} ) =>
{
    if ( markers.length <= 0 ) return <View />


    const mark = useRef<Marker>()

    useEffect(() => {
        if ( mark.current )
        {
            // mark.current.props.onLayout(()=>)
            
        }
      
    }, [])

    return (
        <>
            {markers.map( ( value, index ) =>
            {
                const coord: LatLng | undefined = getLatitudeLongitudeFromString( value.location )
                if ( coord )
                    return <View>
                        <Marker
                        ref={mark}
                        onLayout={e =>
                        {
                            const { height, width, x, y } = e.nativeEvent.layout
                            console.log(`${height}, ${width}, ${x}, ${y} \n`);
                        }}
                        key={value.reference}
                        image={require( "../assets/images/marker.png" )}
                        pinColor="green"
                        coordinate={coord}
                        onPress={() => onPress( value.reference || "" ) }
                    >

                </Marker>
                        <Circle center={coord} radius={100} fillColor={Colors.blue50} strokeColor={Colors.grey60} strokeWidth={3} />
                </View>
                else return <View key={value.reference}/>
            } )}
        </>
    )
};
export default NearMe;
