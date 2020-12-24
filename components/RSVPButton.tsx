import React from 'react';
import {View, TouchableOpacity, Text, Colors} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Feather';
import TToast from './TToast';
import FireStore from '../data_layer/FireStore';
import BackDrop, {BackDropV2, BackDropV3} from './BackDrop';
import {Alert, ViewStyle} from 'react-native';
import {ViewProps} from 'react-native-ui-lib/typings';
function RSVPButton({
  reference,
  style,
}: {
  reference: string | undefined;
  style?: ViewStyle;
}) {
  const handleRsvp = () => {
    if (reference)
      if (FireStore.isLoggedIn()) {
        FireStore.send
          .rsvp(reference)
          .then((res) => {
            TToast.success('Great!', 'Event eas added to your rsvp list!');
          })
          .catch((err) => {});
      } else {
        // TToast.needTobeLoggedIn()
        Alert.alert(
          'who are you?',
          'you need to be logged in to complete this action',
        );
      }
  };

  return (
    <View center row>
      <TouchableOpacity
        row
        activeOpacity={0.85}
        onPress={handleRsvp}
        center
        style={{
          borderRadius: 5,
          paddingHorizontal: 8,
          paddingVertical: 2,
          // backgroundColor: Colors.primary,
          // elevation: 5,
          marginTop: -10,
          overflow: 'hidden',
          borderWidth: 1,
          borderBottomWidth: 2,
          borderRightWidth: 2,
          borderColor: Colors.foreground,
        }}>
        <Icon name="star" size={14} color={Colors.text1} />

        <Text
          marginL-4
          btn
          uppercase
          adjustsFontSizeToFit
          style={{
            textShadowRadius: 2,
            textShadowOffset: {height: 1, width: 1},
          }}>
          rsvp
        </Text>
        <BackDropV3 />
      </TouchableOpacity>
    </View>
  );
}

export default RSVPButton;
