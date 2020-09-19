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

const Memories = () => {
   const theme = useTheme()
	const navigation = useNavigation()
	const [data, setdata] = useState<FeedItemModel[]>( [] )
	const [loading, setLoading] = useState( false )
	const [loadMore, setLoadMore] = useState(true)
	useEffect(() => {
		getPastEvents()
	}, [])

	const handleViewClick = (item: FeedItemModel) => {
		navigation.navigate("event", {reference : item.reference})
	}

	const getPastEvents = () =>
	{
		if(!loadMore || loading) return
		let reference = data.length >0 ? data[data.length - 1].reference  : ""

		setLoading(true)
		FireStore.retrieve.getPastEvents( reference ).then( res =>
		{
			const d: FeedItemModel[] = [...FireStore.memoryData.values()]
			setdata( d )
			setLoading( false )
			console.log( "got data", reference );
			
			
		} ).catch( err =>
		{
			setLoadMore( false )
			setLoading( false )
			console.log("didnt get data");
			
		})
	}


	return (
		<SafeAreaView style={{flex:1, paddingTop:20, backgroundColor:Colors.background}}>

		<View bg-background flex>
				<FlatList
					ListHeaderComponent={<View center>
						<Text lvl1 indicator>past events</Text>
					</View>}
					onScroll={() => { }}
					onEndReached={getPastEvents}
					onEndReachedThreshold={.1}
				style={{borderWidth: 0, flex: 1}}
				data={data}
					renderItem={( { item, index } ) =>
					{					
					return (
						<View key={index}>
							<FeedItemMemoryVersionOne item={item} />
						</View>
					)
				}}
					keyExtractor={( item: FeedItemModel ) => item.reference || faker.random.number( 200 ).toString()}
					ListFooterComponent={<ListFooterComp  loadMore={loadMore} loading={loading} />}
				/>
			
		</View>
				</SafeAreaView>
	)
}

export default observer(Memories)
