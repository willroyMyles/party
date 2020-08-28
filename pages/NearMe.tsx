import { LocationRegion } from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import MapView, {
    Circle,
    EventUserLocation,
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
import psuedoLocationTracker, { radius, taskName } from '../data_layer/PsuedoLocationTracker';




const NearMe = () =>
{
    const map = useRef<MapView | undefined>();
    const theme = useTheme();
    const [region, setRegion] = useState<Region | null>();
    const [markers, setMarkers] = useState<FeedItemModel[]>( [] );
    const [focusedEvent, setFocusedEvent] = useState<string>( '' );
    const [geoRegions, setGeoRegions] = useState<LocationRegion[]>( [] )

    useEffect( () =>
    {
        getUserRegion();
        sortMarkers()

        eventEmitter.addListener( eventStrings.dataFromProviderFinishedLoad, () => sortMarkers() )

        return () =>
        {
            eventEmitter.removeListener( eventStrings.dataFromProviderFinishedLoad, () => sortMarkers() )

        };
    }, [] );

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
            console.log( 'should be animating' );
        } catch ( err )
        {
            console.log( 'err', err );
        }
    };

    const startGeo = ( data: any[] ) =>
    {

        if ( TaskManager.isTaskDefined( taskName ) )
        {
            console.log( `${ taskName } is defined` );

            psuedoLocationTracker.watchTheseLocations( geoRegions )
            Location.startLocationUpdatesAsync( taskName ).then( res =>
            {
                eventEmitter.emit(eventStrings.locationWatchStart, data)
            })
        }
    }

    const sortMarkers = () =>
    {
        const arr = [...FireStore.data.values()];
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

        setGeoRegions( d )
        startGeo( d )
    };

    // if ( region )
    return (
        <View style={{ backgroundColor: Colors.background }}>
            <MapView
                ref={map}
                showsUserLocation
                onUserLocationChange={userLocationChanged}
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
                />


            </MapView>
            <View
                padding-10
                center
                style={{
                    position: 'absolute',
                    minHeight: 10,
                    minWidth: '100%',
                    bottom: 3,
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
}: {
    markers: FeedItemModel[],
    onPress: ( ref: string ) => void
} ) =>
{
    if ( markers.length <= 0 ) return <View />

    return (
        <>
            {markers.map( ( value, index ) =>
            {
                return (
                    <MarkerPinItem
                        key={index}
                        value={value}
                        onPressed={() =>
                        {
                            onPress( value.reference || '' )
                        }}
                    />
                )
            } )}
        </>
    )
};
export default NearMe;
