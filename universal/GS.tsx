import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useTheme} from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PartyType} from './Models';
import Animated from 'react-native-reanimated';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

export const AFL = Animated.createAnimatedComponent(FlatList);

export const getTabBarIcon = (text: string) => {
  switch (text) {
    case 'splotch':
      return AssetImages.picture;
    case 'map':
      return AssetImages.nearby;
    case 'th-large':
      return AssetImages.home;
    case 'trophy':
      return AssetImages.leaderboard;
    case 'user-cog':
      return AssetImages.profile;
  }
};

export const AssetImages = {
  bluePin: require('../assets/images/blu.png'),
  redPin: require('../assets/images/red.png'),
  greenPin: require('../assets/images/green.png'),
  purplePin: require('../assets/images/purple.png'),
  home: require('../assets/images/Home.png'),
  leaderboard: require('../assets/images/Leaderboard.png'),
  location: require('../assets/images/Location.png'),
  nearby: require('../assets/images/nearby.png'),
  picture: require('../assets/images/picture.png'),
  profile: require('../assets/images/profile.png'),
};

export const getColorForType = (type: PartyType, background = false) => {
  switch (type) {
    case PartyType.LOUNGE:
      return background ? Colors.red80 : Colors.red20;
    case PartyType.CLUB:
      return background ? Colors.green80 : Colors.green20;
    case PartyType.WATER_PARTY:
      return background ? Colors.blue80 : Colors.blue20;
    case PartyType.OUTDOOR:
      return background ? Colors.purple80 : Colors.purple20;
  }
};

export const getPartyTypeArray = () => {
  const arr = Object.values(PartyType).filter((e) => typeof e == typeof '');
  return arr;
};

export const GetIcon = ({name}: {name: string}) => {
  const theme = useTheme();
  return (
    <View center padding-5 br100 style={{width: 29, height: 29, elevation: 0}}>
      <Icon name={name} size={16} style={GS.icon} color={Colors.primary} />
    </View>
  );
};

export const GetPartytypeString = (type: PartyType) => {
  const ty = PartyType[type];

  const str = ty.replace('_', ' ').toLowerCase();
  return str;
};

export const GS = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 4,
    width: '100%',
    elevation: 3,
  },
  input: {
    backgroundColor: 'rgba(100,100,150,.03)',
    marginTop: -7,
    padding: 5,
    borderRadius: 7,
    paddingStart: 12,
    marginBottom: -15,
    width: '30%',
  },
  floater: {
    marginStart: 12,
    opacity: 0.5,
    color: Colors.grey30,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // textShadowRadius: 3,
    // textDecorationLine: "underline",
    zIndex: 2,
  },
  textOne: {
    // fontWeight: "700",
    fontSize: 17,
    color: Colors.text1,
    textShadowRadius: 1,
    textTransform: 'capitalize',
    fontFamily: 'RR',
  },
  textTwo: {
    fontWeight: '600',
    fontSize: 14,
    color: Colors.text2,
    fontFamily: 'RR',
  },
  textThree: {
    fontWeight: '600',
    fontSize: 11,
    color: Colors.muted,
    textTransform: 'uppercase',
    fontFamily: 'RR',
  },
  indicator: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.muted,
    textTransform: 'uppercase',
    paddingHorizontal: 7,
    borderRadius: 1,
    borderColor: Colors.light,
    backgroundColor: Colors.background,
    alignContent: 'center',
    alignItems: 'center',
    fontFamily: 'RR',
  },
  regular: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.text1,
    textShadowOffset: {width: 0.2, height: 0.2},
    textShadowRadius: 0.01,
    fontFamily: 'RR',
  },
});
