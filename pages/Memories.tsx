import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native-ui-lib'
import { useTheme } from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { FeedItemModel } from '../universal/Models'
import { FlatList } from 'react-native-gesture-handler'
import Feed_Item from '../components/Feed_Item'
import FireStore from '../data_layer/FireStore'
import * as faker from 'faker'
import FeedItemVersionOne from '../components/FeedItemVersionOne'
import FeedItemMemoryVersionOne from '../components/FeedItemMemoryVersionOne copy'
import { SafeAreaView } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'

const Memories = () => {
   const theme = useTheme()
	const navigation = useNavigation()
	const [data, setdata] = useState<FeedItemModel[]>([])
	useEffect(() => {
		getPastEvents()
		console.log("called");
		
	}, [FireStore.memoryData.size])

	const handleViewClick = (item: FeedItemModel) => {
		navigation.navigate("event", {reference : item.reference})
	}

	const getPastEvents = () => {
		const d: FeedItemModel[] = [...FireStore.memoryData.values()]
		setdata(d)
	}


	return (
		<SafeAreaView style={{flex:1}}>

		<View bg-background flex>
			<FlatList
				onScroll={() => {}}
				// style={{borderWidth: 0, flex: 1}}
				data={data}
				renderItem={({item, index}) => {
					return (
						<View key={index}>
							<FeedItemMemoryVersionOne reference={item.reference || ""} />
						</View>
					)
				}}
				keyExtractor={(item: FeedItemModel) => item.reference || faker.random.number(20000000000).toString()}
				/>
			<View center>
				<Button onPress={() => getPastEvents()}>
					<Text btn>load feed </Text>
				</Button>
			</View>
		</View>
				</SafeAreaView>
	)
}

export default observer(Memories)
