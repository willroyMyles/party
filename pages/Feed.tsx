import React, {useEffect, useState} from 'react';
import {View, Colors} from 'react-native-ui-lib';
import FireStore from '../data_layer/FireStore';
import {Dimensions, StyleSheet} from 'react-native';
import {eventEmitter, eventStrings} from '../universal/EventEmitter';
import Animated from 'react-native-reanimated';
import SearchBar from '../components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeedTop from './feed_page/FeedTop';
import FeedList from './feed_page/FeedList';

const Feed = () => {
  const off = 260;

  const [moreData, setMoreData] = useState(true);

  const scrollY = new Animated.Value(0);
  const diffY = Animated.diffClamp(scrollY, 0, off);

  useEffect(() => {
    eventEmitter.addListener(
      eventStrings.dataFromProviderFinishedLoad,
      loadData,
    );

    return () => {
      eventEmitter.removeListener(
        eventStrings.dataFromProviderFinishedLoad,
        loadData,
      );
    };
  }, []);

  const loadData = () => {
    const values = [...FireStore.intermediateryData.values()];
    // const lastIndex = values.length - 1
    // const ref = values[lastIndex].reference
    // setLastDocument( ref )
    setData((d) => [...d, ...values]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <View bg-background style={{height: '100%'}}>
        <SearchBar />
        <FeedTop off={off} scrollY={scrollY} />
        <FeedList off={off} scrollY={scrollY} />
      </View>
    </SafeAreaView>
  );
};

export default Feed;
