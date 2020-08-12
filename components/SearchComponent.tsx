import React, { useState, useEffect } from 'react'
import { View, Text, TextField, Colors, TouchableOpacity } from 'react-native-ui-lib'
import Animated from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'
import { FeedItemModel } from '../universal/Models'
import FireStore from '../data_layer/FireStore'
import FeedItemMemoryVersionOne from './FeedItemMemoryVersionOne copy'
import Feed_Item from './Feed_Item'

const SearchComponent = () =>
{
    const [value, setValue] = useState<string>( "" )
    const [data, setdata] = useState<FeedItemModel[] |undefined>(undefined)
    
    const onBlur = () =>
    {
    
    }
 
    
    const onChange = ( v : string ) =>
    {
        setValue( v )
         if ( v.length == 0 )
        {
            setdata( undefined )
            return
        }
        const r = new RegExp( `${ v.toLowerCase() }` )
        console.log(v, r);
        
        const d = [...FireStore.data.values()].filter( ( value, index ) => value.title?.toLowerCase().match(r))
        console.log(d.length);
        
        setdata(d)
    }

    return (
         <View flex style={{borderWidth:0, justifyContent:"center"}}>
                <View marginH-10 marginT-15 marginB-0 padding-2>
                <TextField placeholder="search" onBlur={onBlur} onChangeText={onChange} value={value}
                />
            </View>
            <View  flex style={{margin:1, borderColor:Colors.grey50, padding:0}}>
                <ScrollView>
                    {data?.map( ( value, index ) =>
                    {
                    return <Feed_Item item={value} />
                })}
                </ScrollView>
              
            </View>
            </View>
    )
}

export default SearchComponent
