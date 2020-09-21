import React, { useState, useEffect } from 'react';
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

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = () =>
{
  useEffect( () =>
  {
    eventEmitter.addListener( eventStrings.locationGranted, () =>
      showNearMe( true ),
    );
    eventEmitter.addListener( eventStrings.locationNotGranted, () =>
      showNearMe( false ),
    );
    return () =>
    {
      eventEmitter.removeListener( eventStrings.locationGranted, () =>
        showNearMe( true ),
      );
      eventEmitter.removeListener( eventStrings.locationNotGranted, () =>
        showNearMe( false ),
      );
    };
  }, [] );

  const showNearMe = ( val: boolean ) =>
  {
    tm.setLocationGranted(val)
  };

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
      tabBar={( props ) => <CustomTabBar {...props} />}>
       <Tab.Screen
        name="memories"
        options={{ tabBarIcon: () => 'trophy' }}
        component={Memories}
      />
      {/*{tm.isLocationGranted && (
        <Tab.Screen
          options={{ tabBarIcon: () => 'map' }}
          name="near me"
          component={NearMe}
        />
      )} */}
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
      {/* <Tab.Screen
        name="settings"
        options={{ tabBarIcon: () => 'user-cog' }}
        component={Settings}
      />  */}
    </Tab.Navigator>
  );
};

export default observer(HomeNavigator);
