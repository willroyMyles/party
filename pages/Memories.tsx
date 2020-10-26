import React, { useState, useEffect } from 'react'
import { View, Text, Button, Colors, LoaderScreen } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { FeedItemModel } from '../universal/Models'
import { FlatList } from 'react-native-gesture-handler'
import Feed_Item from '../components/Feed_Item'
import FireStore from '../data_layer/FireStore'
import * as faker from 'faker'
import FeedItemVersionOne from '../components/FeedItemVersionOne'
import FeedItemMemoryVersionOne from '../components/FeedItemMemoryVersionOne'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import ListFooterComp from '../components/ListFooterComp'
import ListheaderComp from '../components/ListheaderComp'

const Memories = () => {
   const theme = useTheme()



	return (
		<SafeAreaView style={{flex:1, paddingTop:20, backgroundColor:Colors.background}}>

		<View bg-background flex>
				<FlatList
					ListHeaderComponent={<ListheaderComp header="past parties" />}
					onScroll={() => { }}
					// onEndReached={getPastEvents}
					// onEndReachedThreshold={.1}
				style={{borderWidth: 0, flex: 1}}
				data={[...FireStore.memoryData.values()]}
					renderItem={( { item, index } ) =>
					{					
					return (
						<View key={index}>
							<FeedItemMemoryVersionOne item={item} />
						</View>
					)
				}}
					keyExtractor={( item: FeedItemModel ) => item.reference || faker.random.number( 200 ).toString()}
				/>
			
		</View>
				</SafeAreaView>
	)
}

export default observer(Memories)
