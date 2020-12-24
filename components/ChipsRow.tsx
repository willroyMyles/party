import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {View, Text, Colors, TouchableOpacity} from 'react-native-ui-lib';
import {useTheme} from 'styled-components';
import FireStore from '../data_layer/FireStore';
import {getColorForType} from '../universal/GS';
import {PartyType} from '../universal/Models';

const ChipsRow = ({height}: {height: number}) => {
  const theme = useTheme();
  const [data, setData] = useState<string[]>([]);
  const navigation = useNavigation();
  const viewCategory = (route: string) =>
    navigation.navigate('category', {type: route});

  useEffect(() => {
    load();
  }, [FireStore.categorizedData.size]);

  const load = () => {
    const ty = Object.keys(PartyType).filter((a) => a.length > 1);
    setData(ty);
  };

  return (
    <View bg-background padding-7>
      <View padding-10>
        <Text lvl1 color={Colors.primary} style={{fontWeight:"700", textShadowOffset:{height:3, width:3}}}>My #1 Party</Text>
      </View>
      {data.length != 0 && (
        <FlatList
          data={data}
          horizontal
          contentContainerStyle={{height: '100%', paddingVertical: 10}}
          keyExtractor={(item, index) => 'item' + index}
          renderItem={({item, index}) => {
            const type = PartyType[item];

            return (
              <TouchableOpacity
                onPress={() => {
                  viewCategory(item);
                }}
                center
                style={{
                  paddingHorizontal: 14,
                  backgroundColor: getColorForType(type),
                  marginHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 40,
                  paddingBottom: 6,
                  borderColor: getColorForType(type, true),
                  borderWidth: 0,
                  elevation: 0,
                }}>
                <Text
                  style={{
                    color: getColorForType(type, true),
                    fontWeight: '600',
                    textShadowRadius: 0,
                    textShadowOffset: {width: 0.2, height: 0.2},
                    fontSize: 17,
                  }}>
                  {item.toLowerCase().replace('_', ' ')}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default observer(ChipsRow);
