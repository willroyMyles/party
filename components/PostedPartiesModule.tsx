import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {View, Text, Colors, TouchableOpacity} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FireStore from '../data_layer/FireStore';
import {FeedItemModel} from '../universal/Models';
import Feed_itemV2 from './Feed_itemV2';
import LeaderBoardTilesV2 from './LeaderBoardTilesV2';
import PostedPartiesItem from './PostedPartiesItem';

const limit = 4;
const PostedPartiesModule = () => {
  const Navigator = useNavigation();

  const [data, setdata] = useState<FeedItemModel[]>([]);

  useEffect(() => {
    FireStore.retrieve
      .getPostedEvents()
      .then((res) => {
        setdata(res);
      })
      .catch((err) => {
        //could not get data
        console.log('is there an error?');
      });
  }, []);

  const handlePress = () => Navigator.navigate('posted parties');

  if (data.length > 0)
    return (
      <View marginT-30 style={{width: '100%'}}>
        <View>
          <Text lvl2> parties you've posted</Text>
        </View>

        <View
          br20
          marginT-0
          style={{borderBottomWidth: 0, borderBottomColor: Colors.foreground}}>
          {data
            .filter((_, index) => index < limit)
            .map((value, index) => {
              return (
                <View key={index}>
                  <LeaderBoardTilesV2 index={index} item={value} />
                </View>
              );
            })}

          {data.length > limit && (
            <View paddingB-35>
              <TouchableOpacity
                row
                center
                marginT-20
                onPress={handlePress}
                activeOpacity={0.85}
                bg-foreground
                br20
                paddingV-10
                marginH-50>
                <Text lvl2 style={{fontWeight: '600'}}>
                  see more {'\t'}
                </Text>

                <Icon name="arrow-right" size={18} style={{opacity: 0.4}} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );

  return <View />;
};

export default PostedPartiesModule;
