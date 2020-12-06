import React, {useEffect} from 'react';
import {View, Text, Colors} from 'react-native-ui-lib';

import FireStore from '../data_layer/FireStore';
import {FlatList} from 'react-native-gesture-handler';
import Feed_itemV2 from './Feed_itemV2';
import {observer} from 'mobx-react';
import notificationSystem from '../data_layer/NotificationSystem';

const RSVPModule = () => {
  useEffect(() => {
    FireStore.retrieve
      .rsvpEvents()
      .then((_) => {
        [...FireStore.rsvpData.entries()].map(([key, vals]) => {
          notificationSystem.addToWatch(key.toString(), vals.dateNum);
        });

        notificationSystem.checkTime();
      })
      .catch(() => {});
  }, []);

  if ([...FireStore.rsvpData.values()].length > 0)
    return (
      <View marginT-30 style={{width: '100%'}}>
        <View>
          <Text lvl2>
            {[...FireStore.rsvpData.values()].length} RSVP parties
          </Text>
        </View>

        <View
          br20
          marginT-0
          style={{borderBottomWidth: 0, borderBottomColor: Colors.foreground}}>
          <FlatList
            data={[...FireStore.rsvpData.values()]}
            horizontal
            keyExtractor={(item, index) => item + '' + index + ''}
            renderItem={({item, index}) => {
              return <Feed_itemV2 key={index} reference={item.reference} />;
            }}
          />
        </View>
      </View>
    );

  return <View />;
};

export default observer(RSVPModule);
