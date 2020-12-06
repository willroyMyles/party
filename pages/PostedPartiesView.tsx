import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {FlatList} from 'react-native';
import {LoaderScreen, View, Text} from 'react-native-ui-lib';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Feed_Item from '../components/Feed_Item';
import FireStore from '../data_layer/FireStore';
import {GetPartytypeString} from '../universal/GS';
import {FeedItemModel} from '../universal/Models';
import {SafeAreaView} from 'react-native-safe-area-context';

const PostedPartiesView = () => {
  const [data, setData] = useState<FeedItemModel[]>([]);

  useEffect(() => {
    FireStore.retrieve
      .getPostedEvents()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        //could not get data
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
      <View bg-background flex center>
        <FlatList
          ListHeaderComponent={
            <Text center marginV-12 lvl1>
              Parties you've posted
            </Text>
          }
          data={data}
          keyExtractor={(item, index) => item.reference + 'item' + index}
          renderItem={({item, index}) => {
            return (
              <View>
                <Feed_Item item={item} />
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostedPartiesView;
