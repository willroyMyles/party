import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {View, Text, Colors, LoaderScreen} from 'react-native-ui-lib';
import {useTheme} from 'styled-components';
import {getLocation, getRegion} from '../universal/GetLocation';

const NearMe = () => {
  const map = useRef<MapView | undefined>();
  const theme = useTheme();
  const [region, setRegion] = useState<Region | null>();
  useEffect(() => {
    getUserRegion();
    return () => {};
  }, []);

  const getUserRegion = async () => {
    try {
      const coor = await getLocation();
      const reg = await getRegion(coor);
      if (map.current) map.current.animateToRegion(reg);
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
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}></MapView>
      </View>
    );

  return <LoaderScreen />;
};

export default NearMe;
