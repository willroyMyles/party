import React from 'react';
import {View, Colors} from 'react-native-ui-lib';
import {useTheme} from 'styled-components';
import {FeedItemModel} from '../universal/Models';
import {FlatList} from 'react-native-gesture-handler';
import FireStore from '../data_layer/FireStore';
import FeedItemMemoryVersionOne from '../components/FeedItemMemoryVersionOne';
import {SafeAreaView} from 'react-native-safe-area-context';
import {observer} from 'mobx-react';
import ListheaderComp from '../components/ListheaderComp';

const Memories = () => {
  const itemToRnder = ({item, index}: {item: FeedItemModel; index: number}) => {
    return (
      <View key={index}>
        <FeedItemMemoryVersionOne item={item} />
      </View>
    );
  };

  const loadMore = () => {
    const last = [...FireStore.memoryData.values()][
      [...FireStore.memoryData.values()].length - 1
    ];
    FireStore.retrieve.getStreamToPastParties(15, last.dateNum);
  };

  return (
    <SafeAreaView
      style={{flex: 1, paddingTop: 20, backgroundColor: Colors.background}}>
      <View bg-background flex>
        <FlatList
          ListHeaderComponent={<ListheaderComp header="past parties" />}
          onScroll={() => {}}
          onEndReached={loadMore}
          onEndReachedThreshold={3}
          style={{borderWidth: 0, flex: 1}}
          data={[...FireStore.memoryData.values()]}
          renderItem={itemToRnder}
          initialNumToRender={15}
          keyExtractor={(item: FeedItemModel, index) =>
            item.reference + '' + index
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(Memories);
