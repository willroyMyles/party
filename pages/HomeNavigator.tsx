import React, { useState, useEffect, PureComponent, useMemo } from 'react';
import { View, Text, ColorName, Colors } from 'react-native-ui-lib';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MemoryLeaderBoard from './Memory&LeaderBoard';
import NearMe from './NearMe';
import Feed from './Feed';
import Settings from './Settings';
import NearMeV2 from './NearMeV2';
import { eventEmitter, eventStrings } from '../universal/EventEmitter';
import CustomTabBar from '../components/CustomTabBar';
import FeedV2 from './FeedV2';
import tm from '../universal/UiManager';
import { observer } from 'mobx-react';
import LeaderBoard from './LeaderBoard';
import Memories from './Memories';
import { useNavigation } from '@react-navigation/native';
import { AppState, AppStateStatus, Linking } from 'react-native';
import FireStore from '../data_layer/FireStore';
import TToast from '../components/TToast';

const Tab = createMaterialTopTabNavigator();


export const HomeNavigator =  observer(() =>
{

  const nav = useNavigation();
  useEffect( () =>
  {
    Linking.addEventListener("url", listenerForLinking)
    return () =>
    {
      Linking.removeEventListener("url", listenerForLinking)
    }
  }, [] )

  const listenerForLinking = ({url}:{url:string}) =>
  {
    const path = dissectUrl( url );
    if ( FireStore.data.has( path ) )
    {
      nav.navigate( "view event", { reference: path } )

    } else
    {
      TToast.error( "Oh my", "this party has either expired or removed by the owner" );
    }
    
  }

  const dissectUrl = (urlToDissect : string) =>
  {
    if ( urlToDissect.includes( "http" ) ) return urlToDissect.replace( "http://myparty.com/", '' );

    return ""
  }
  
    return (
      <Tab.Navigator
        tabBarPosition="bottom"
        swipeEnabled={false}
        tabBarOptions={{
          activeTintColor: Colors.primary,
          indicatorContainerStyle: {
            padding: 10,
          },
          tabStyle: {
            padding: 2,
            borderTopWidth: 1,
            borderColor: Colors.secondary,
          },
          allowFontScaling: true,
          // contentContainerStyle: {
          //     backgroundColor: Colors.background,
          //     elevation:10
          // },
        }}
        tabBar={( props ) => <CustomTabBar {...props} />}
      >
        <Tab.Screen
          name="memories"
          options={{ tabBarIcon: () => 'splotch' }}
          component={Memories}
        />
        <Tab.Screen
          options={{ tabBarIcon: () => 'map' }}
          name="near me"
          component={NearMe}
        />
        <Tab.Screen
          name="discover"
          options={{ tabBarIcon: () => 'th-large' }}
          component={FeedV2}
        />
        <Tab.Screen
          name="leaderboard"
          options={{ tabBarIcon: () => 'trophy' }}
          component={LeaderBoard}
        />
        <Tab.Screen
          name="settings"
          options={{ tabBarIcon: () => 'user-cog' }}
          component={Settings}
        />
      </Tab.Navigator>
    )
  
});

export default HomeNavigator;
