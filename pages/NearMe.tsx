import React, {useEffect, useRef, useState} from 'react';
import MapView, {
  Circle,
  EventUserLocation,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {View, Text, Colors, LoaderScreen} from 'react-native-ui-lib';
import {useTheme} from 'styled-components';
import {getLocation, getRegion} from '../universal/GetLocation';

const radius = 600;
const taskName = 'geoLocation';

const NearMe = () => {
  const map = useRef<MapView | undefined>();
  const theme = useTheme();
  const [region, setRegion] = useState<Region | null>();
  const [userCircle, setUserCircle] = useState<Region | undefined>(undefined);
  useEffect(() => {
    getUserRegion();
    return () => {};
  }, []);

  useEffect(() => {
    if (region) setUserCircle(region);
  }, [region]);

  const userLocationChanged = async (e: EventUserLocation) => {
    try {
      const loc = e.nativeEvent.coordinate;
      const reg = await getRegion(loc);
      setUserCircle(reg);
      console.log('should be animating');
    } catch (err) {
      console.log('err', err);
    }
  };

  const getUserRegion = async () => {
    try {
      const coor = await getLocation();
      const reg = await getRegion(coor);
      if (map.current) {
        map.current.animateToRegion(reg);
        map.current.forceUpdate();
      }
      setRegion(reg);
      console.log('should be animating');
    } catch (err) {
      console.log('err', err);
    }
  };

  if (region)
    return (
      <View style={{backgroundColor: Colors.background}}>
        <MapView
          ref={map}
          showsUserLocation
          onUserLocationChange={userLocationChanged}
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}>
          <Circle
            radius={radius}
            center={userCircle}
            fillColor={Colors.primary + '22'}
            strokeWidth={1}
            strokeColor={Colors.grey50}
          />
        </MapView>
      </View>
    );

  return <LoaderScreen />;
};

export default NearMe;
