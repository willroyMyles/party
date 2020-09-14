import React, { useState, useEffect } from 'react'
import { View, Text, TextField, Colors, TouchableOpacity } from 'react-native-ui-lib'
import Animated from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'
import { FeedItemModel } from '../universal/Models'
import FireStore from '../data_layer/FireStore'
import FeedItemMemoryVersionOne from './FeedItemMemoryVersionOne'
import Feed_Item from './Feed_Item'
import Icon from 'react-native-vector-icons/FontAwesome5'
import SearchBar from './SearchBar'
import { StyleSheet } from 'react-native'
import { GS } from '../universal/GS'
import { useTheme } from 'styled-components'


const SearchComponent = () =>
{
    const theme = useTheme()
    const [value, setValue] = useState<string>( "" )
    const [data, setdata] = useState<FeedItemModel[] | undefined>( undefined )

    const onBlur = () =>
    {

    }


    const onChange = ( v: string ) =>
    {
        setValue( v )
        if ( v.length == 0 )
        {
            setdata( undefined )
            return
        }
        const r = new RegExp( `${ v.toLowerCase() }` )

        const d = [...FireStore.data.values()].filter( ( value, index ) => value.title?.toLowerCase().match( r ) )

        setdata( d )
    }

    return (
        <View bg-background flex style={{ borderWidth: 0, justifyContent: "center" }}>

            <View style={s.bar} marginT-10>
                <TextField placeholderStyle={GS.floater} hideUnderline style={[s.bar, { backgroundColor: Colors.foreground }]} placeholder="search" onBlur={onBlur} onChangeText={onChange} value={value}
                />
                <View style={{
                    position: "absolute",
                    right: 25,
                    top: 17
                }}>
                    <Icon name="search" size={14} color={Colors.text2} />

                </View>
            </View>
            <View flex style={{ margin: 1, borderColor: Colors.grey50, padding: 0 }}>
                <ScrollView contentContainerStyle={{ minHeight: "100%" }}>
                    {data?.map( ( value, index ) =>
                    {
                        return <Feed_Item item={value} />
                    } )}

                    {value === "" && <View flex-2 center >
                        <Text lvl2 center>Start typing to begin search</Text>
                    </View>}

                    {value !== "" && data?.length === 0 && <View flex-10 center >
                        <Text lvl2>No results...</Text>
                    </View>}
                </ScrollView>


            </View>
        </View>
    )
}

const s = StyleSheet.create( {
    bar: {
        padding: 5,
        paddingHorizontal: 12,
        borderRadius: 50
    }
} )
export default SearchComponent
