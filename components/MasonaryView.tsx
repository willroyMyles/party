import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image } from 'react-native';
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
const {width} = Dimensions.get("screen")
const MasonaryView = ( { data, numOfCols }: { data: string[], numOfCols : number } ) =>
{
    
    const off = numOfCols / 5.5
    const wid = width / numOfCols 
 
    return (
        
        <FlatList
            contentContainerStyle={{ borderWidth: 0, paddingBottom: 35 * numOfCols , padding:10, width }}
                style={{ width:"100%", overflow:"visible"}}
                data={data.slice()}
            keyExtractor={( item, index ) => item }
            numColumns={numOfCols}
                renderItem={( { item, index } ) =>
                {
                    const notIt = index % numOfCols == 0
                    return <View style={{
                        top: notIt ? 0 : 75,
                        padding: 12 / numOfCols,
                        width:wid-7.5
}}>
                        <TouchableOpacity
                        // onPress={() => handleImagePressed( index )}
                        activeOpacity={0.85}
                        key={index}
                        style={{
                            elevation: 10,
                            borderWidth: 2,
                            borderColor: Colors.text1+"33",
                            borderRadius: 16,
                            overflow:"hidden",
                            height: 250,

                            }}>
                            
                            <Image source={{ uri: item }} resizeMode="cover"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </TouchableOpacity>
                    </View>
            
                }}

            />
    )
}

export default MasonaryView
