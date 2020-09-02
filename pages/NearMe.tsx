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
import psuedoLocationTracker, { radius, taskName } from '../data_layer/PsuedoLocationTracker';
import { Platform } from 'react-native';




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
        } catch ( err )
        {
            console.log( 'err', err );
        }
    };



    const startGeo = ( data: any[] ) =>
    {

        if ( TaskManager.isTaskDefined( taskName ) )
        {

            Location.startLocationUpdatesAsync( taskName, {
                timeInterval: 1000 * 60 * 20, // every 20 mins
                accuracy: Location.Accuracy.High,
            } ).then( res =>
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
                    return <Marker
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
                else return <View key={value.reference}/>
            } )}
        </>
    )
};
export default NearMe;
