import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { View, Text, Colors, TouchableOpacity } from 'react-native-ui-lib'
import FireStore from '../data_layer/FireStore'
import { FeedItemModel } from '../universal/Models'
import Feed_itemV2 from "./Feed_itemV2"
import PostedPartiesItem from './PostedPartiesItem'




const PostedPartiesModule = () => {

    const Navigator = useNavigation();

    const [data, setdata] = useState<FeedItemModel[]>([])

    useEffect(() => {
       FireStore.retrieve.getPostedEvents().then(res=>{
            setdata(res);
       }).catch(err=>{
           //could not get data
       })
    }, )

    const handlePress = () => Navigator.navigate("posted parties")

    if ( data.length > 0 ) return (
		<View marginT-30 style={{ width: "100%" }}>
			<View>
				<Text lvl2> parties you've posted</Text>
			</View>

			<View br20 marginT-0 style={{ borderBottomWidth: 0, borderBottomColor: Colors.foreground }}>

				<FlatList
                    data={data}
                    numColumns={2}
                    scrollEnabled={false}
					keyExtractor={( item, index ) => item + "" + index + ""}
					renderItem={( { item, index } ) =>
					{
                        if(index >= 4) return <View/>;
						return <PostedPartiesItem key={index} reference={item.reference} />
					}}
				/>
                {data.length > 4 && <View>
                        <TouchableOpacity onPress={handlePress} activeOpacity={.85} center bg-foreground padding-10 marginH-10>
                            <Text lvl2>see more</Text>
                        </TouchableOpacity>
                    </View>}
			</View>

		</View>
    );

	return <View />
}

export default PostedPartiesModule
