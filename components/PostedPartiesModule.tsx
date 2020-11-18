import React, { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { View, Text, Colors, TouchableOpacity } from 'react-native-ui-lib'
import FireStore from '../data_layer/FireStore'
import Feed_itemV2 from "./Feed_itemV2"
import PostedPartiesItem from './PostedPartiesItem'



const PostedPartiesModule = () => {


    useEffect(() => {
       //call firebase 
    }, )



    if ( [...FireStore.rsvpData.values()].length > 0 ) return (
		<View marginT-30 style={{ width: "100%" }}>
			<View>
				<Text lvl2> parties you've posted</Text>
			</View>

			<View br20 marginT-0 style={{ borderBottomWidth: 0, borderBottomColor: Colors.foreground }}>

				<FlatList
                    data={[...FireStore.rsvpData.values()]}
                    numColumns={2}
                    
					keyExtractor={( item, index ) => item + "" + index + ""}
					renderItem={( { item, index } ) =>
					{
						return <PostedPartiesItem key={index} reference={item.reference} />
					}}
				/>
                {[...FireStore.rsvpData.values()].length > 4 && <View>
                        <TouchableOpacity center bg-foreground padding-10 marginH-10>
                            <Text lvl2>see more</Text>
                        </TouchableOpacity>
                    </View>}
			</View>

		</View>
    );

	return <View />
}

export default PostedPartiesModule
