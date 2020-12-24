import React, {useState, useEffect, memo} from 'react';
import {View, Text, TouchableOpacity, Image, Colors} from 'react-native-ui-lib';

import {useNavigation} from '@react-navigation/native';
import {FeedItemModel} from '../universal/Models';
import {useTheme} from 'styled-components';
import moment from 'moment';
import BackDrop from './BackDrop';
import FireStore from '../data_layer/FireStore';
import {Dimensions} from 'react-native';
import PartyTypeBadge from './PartyTypeBadge';
// import * as faker from "faker"
const {width, height} = Dimensions.get('screen');

const Feed_Item = memo(({item}: {item: FeedItemModel}) => {
  if (!item) return <View />;

  const theme = useTheme();
  const navigation = useNavigation();
  const [image, setimage] = useState<string>();

  useEffect(() => {
    async function getImage() {
      const d = await FireStore.retrieve.imageFromReference(
        item.reference,
        item?.flyer,
      );
      setimage(d);
    }

    getImage();
  }, []);

  const handleClick = () => {
    navigation.navigate(
      FireStore.data.has(item.reference) ? 'view event' : 'view past event',
      {reference: item?.reference},
    );
  };

  return (
    <View
      style={{
        borderTopWidth: 0,
        borderBottomWidth: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        width,
      }}>
      <TouchableOpacity
        onPress={() => handleClick()}
        activeOpacity={0.85}
        marginV-8
        bg-foreground
        style={{
          borderWidth: 0,
          borderRadius: 3,
          elevation: 0,
          borderColor: Colors.grey50,
          overflow: 'hidden',
        }}>
        {/* <BackDrop /> */}
        <View>
          <View style={{elevation: 5}} center>
            <Image
              source={{uri: image}}
              style={{
                flex: 1,
                flexDirection: 'row',
                borderRadius: 3,
                height: 170,
                width: '100%',
              }}
              resizeMode="cover"
              // aspectRatio={height/width * 1.2}
            />
          </View>
          <View
            row
            paddingH-10
            paddingT-3
            marginV-15
            style={{
              flex: 2,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text lvl1>{item.title}</Text>
            <View row spread>
              <View>
                <View marginV-3>
                  <Text muted>Date</Text>
                  <Text regular>
                    {moment(new Date(item.date || '')).format(
                      'ddd MMM DD, YYYY',
                    )}
                  </Text>
                </View>
                <View marginV-3>
                  <Text muted>Starts at</Text>
                  <View row>
                    <Text regular>
                      {moment(new Date(item.start || '')).format('h:mm a')}
                    </Text>
                    <Text regular color={Colors.muted}>
                      {' '}
                      for{' '}
                    </Text>
                    <Text regular>{item.duration}</Text>
                    <Text regular color={Colors.muted}>
                      {' '}
                      hrs
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                {/* <View>
                  <Text muted>Rating</Text>
                  <Text regular>random stars?</Text>
                </View> */}
                <View>
                  <PartyTypeBadge type={item.partyType} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default Feed_Item;
