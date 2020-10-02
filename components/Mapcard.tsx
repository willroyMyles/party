import React, {useRef, useState} from 'react';
import {View, Text, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {Region} from 'react-native-maps';
import moment from 'moment';
import {
  getLatitudeLongitudeFromString,
  getDistanceFromLatLonInKm,
} from '../universal/GetLocation';
import {useTheme} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import FireStore from '../data_layer/FireStore';
import {
  Transition,
  Transitioning,
  TransitioningView,
  TransitionProps,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import LoaderImage from './LoaderImage';
import { showLocation } from 'react-native-map-link'


const trans = (
  <Transition.Sequence>
    <Transition.Out durationMs={200} type="scale" />
    <Transition.In durationMs={200} type="scale" />
    <Transition.Change interpolation="easeInOut" durationMs={200} />
  </Transition.Sequence>
);

const Mapcard = ({
  reference,
  currentPosition,
}: {
  reference: string;
  currentPosition: Region;
}) => {
  const item = FireStore.data.get(reference) || undefined;

  const theme = useTheme();
  const navigation = useNavigation();
  const handleListing = () =>
    navigation.navigate('view event', {reference: item?.reference});
  const view = useRef<TransitioningView>();
  const [visivle, setVisivle] = useState(false);
  const [image, setImage] = useState();

  useEffect(() => {
    if (view.current) view.current.animateNextTransition();
    setVisivle(true);

    async function getImage() {
      const d = await FireStore.retrieve.imageFromReference(item.reference, item.flyer);
      setImage(d);
    }

    getImage();
    return () => {
      if (view.current) view.current.animateNextTransition();
      setVisivle(false);
    };
  }, [reference]);

  if (item) {
    const l1 = getLatitudeLongitudeFromString(item.location);
    const {latitude, longitude} = currentPosition;
    const l2 = {latitude, longitude};

    const distance = getDistanceFromLatLonInKm(
      l1?.latitude,
      l1?.longitude,
      l2.latitude,
      l2.longitude,
    ).toFixed(2);

    return (
      <Transitioning.View ref={view} transition={trans} style={{width: '80%'}}>
        {visivle && (
          <View
            bg-background
            br40
            style={{
              width: '100%',
                padding: 10,
            //   backgroundColor:"rgba(240,240,240,.9)",

              elevation: 10,
            }}>
            <View row style={{height: '80%'}}>
                            <LoaderImage height="100%" width="40%" uri={image} />
                        <View paddingH-10 centerV center style={{ width: "63%" }}>
                            <Text lvl1>{item.title}</Text>
                            <View center>
                                <Text muted>Date</Text>
                                <Text regular>{moment( new Date( item.date ) ).format( "ddd MMM DD, YYYY" )}</Text>
                            </View>
                            <View center>
                                <Text muted>Time</Text>
                                <Text regular>{moment( new Date( item.start ) ).format( "hh:mm a" )}</Text>
                            </View>

                        </View>
                    </View>
            <View row center marginV-8 paddingV-4>
              <TouchableOpacity onPress={handleListing} padding-5 marginH-15>
                <Text lvl3 primary>
                  listing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>
              {
                showLocation( {
                  latitude: l1.latitude,
                  longitude:l1.longitude
                })
              }} padding-5 marginL-10>
                <Text lvl3 primary>
                  directions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Transitioning.View>
    );
  } else return <View />;
};

export default Mapcard;
