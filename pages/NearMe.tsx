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
import { getLocation, getRegion } from '../universal/GetLocation';
import { FeedItemModel } from '../universal/Models';

const radius = 600;
const taskName = 'geoLocation';

const NearMe = () =>
{
    const map = useRef<MapView | undefined>();
    const theme = useTheme();
    const [region, setRegion] = useState<Region | null>();
    const [markers, setMarkers] = useState<FeedItemModel[]>( [] );
    const [focusedEvent, setFocusedEvent] = useState<string>( '' );

    useEffect( () =>
    {
        getUserRegion();
        return () => { };
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
    useEffect( () =>
    {
        if ( FireStore.data.size > 0 )
        {
            sortMarkers();
        }
    }, [FireStore.data] );
    const sortMarkers = () =>
    {
        const arr = [...FireStore.data.values()];
        setMarkers( arr );
    };

    if ( region )
        return (
            <View style={{ backgroundColor: Colors.background }}>
                <MapView
                    ref={map}
                    showsUserLocation
                    onUserLocationChange={userLocationChanged}
                    style={{ width: '100%', height: '100%' }}
                    provider={PROVIDER_GOOGLE}>
                    <Circle
                        radius={radius}
                        center={region}
                        fillColor={Colors.primary + '22'}
                        strokeWidth={1}
                        strokeColor={Colors.grey50}
                    />
                    {
                        <ShowEventOnMarkerPressed
                            markers={markers}
                            onPress={setFocusedEvent}
                        />
                    }
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
                </MapView>
            </View>
        );

    return <LoaderScreen />;
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
                        onPressed={() => onPress( value.reference || '' )}
                    />
                )
            } )}
        </>
    )
};
export default NearMe;
