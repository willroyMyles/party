import React from 'react';
import {View, Text, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {useSpring} from 'react-spring/native';
import {useTheme} from 'styled-components';
import {FeedItemModel} from '../universal/Models';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {useEffect} from 'react';
import FireStore from '../data_layer/FireStore';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {showItemToBeDownloaded} from '../universal/GS';

const {width} = Dimensions.get('screen');
const size = width * 0.16;

const LeaderBoardTilesV2 = ({
  item,
  index,
}: {
  item: FeedItemModel;
  index: number;
}) => {
  const theme = useTheme();
  const nav = useNavigation();
  const [image, setImage] = useState<string>();

  // const onPress= () => nav.navigate("view past event", {reference : item.reference})
  const onPress = () => showItemToBeDownloaded(item.reference, nav);

  useEffect(() => {
    async function getImage() {
      const d = await FireStore.retrieve.imageFromReference(
        item.reference,
        item.flyer,
      );
      setImage(d);
    }

    if (item) getImage();
  }, []);

  return (
    <View
      marginT-20
      bg-foreground
      centerV
      style={{
        width: '100%',
        overflow: 'hidden',
        elevation: 0.2,
        paddingVertical: 5,
        borderRadius: 7,
      }}>
      <TouchableOpacity
        onPress={onPress}
        centerV
        row
        style={{width: '100%', paddingHorizontal: 10}}>
        <View center padding-10 style={{marginStart: -10, width: '10%'}}>
          <Text lvl2>{index + 1}.</Text>
        </View>
        <View
          style={{
            height: size,
            width: size,
            borderRadius: 60,
            elevation: 7,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: Colors.foreground,
          }}>
          <FastImage
            source={{uri: image}}
            resizeMode={FastImage.resizeMode.cover}
            style={{height: '100%', width: '100%', position: 'absolute'}}
          />
        </View>

        <View row marginL-5 paddingH-10 centerV spread style={{width: '74%'}}>
          <View padding-3 br10 paddingH-15 style={{width: '80%'}}>
            <Text lvl2 style={{lineHeight: 22}}>
              {item.title}
            </Text>
          </View>

          {item.attendance > 0 && (
            <View
              marginR-5
              center
              padding-10
              style={{transform: [{scale: 0.9}]}}>
              <Text
                lvl2
                center
                style={{
                  width: '100%',
                  fontWeight: '600',
                  marginStart: 3,
                  marginTop: 3,
                  fontSize: 20,
                }}>
                {item.attendance}
              </Text>
              <Text
                lvl2
                center
                muted
                style={{
                  width: '100%',
                  fontWeight: '400',
                  marginStart: 3,
                  marginTop: 3,
                  fontSize: 10,
                }}>
                attended{' '}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default LeaderBoardTilesV2;
