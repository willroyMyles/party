import React, { useState, useEffect } from 'react'
import { View, Text, TextField, Colors, TouchableOpacity } from 'react-native-ui-lib'
import Animated from 'react-native-reanimated'
import { ScrollView } from 'react-native-gesture-handler'
import { FeedItemModel } from '../universal/Models'
import FireStore from '../data_layer/FireStore'
import FeedItemMemoryVersionOne from './FeedItemMemoryVersionOne copy'

const SearchComponent = () =>
{
    const [visible, setVisible] = useState( false )
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

    const onClose = () => setVisible( false )
    return (
         <Animated.View style={{borderWidth:1, justifyContent:"center"}}>
                <View marginH-10 marginT-15 marginB-0 padding-2>
                <TextField placeholder="search" onBlur={onBlur} onFocus={() => setVisible( true )} onChangeText={onChange} value={value}
                />
            </View>
           {visible &&  <View center style={{minHeight:"40%", margin:1, marginTop:-5,  borderRadius:10, borderWidth:3, borderColor:Colors.grey50, padding:10}}>
                <ScrollView>
                    {data?.map( ( value, index ) =>
                    {
                    return <FeedItemMemoryVersionOne reference={value.reference || ""} />
                })}
                </ScrollView>
                <View absT absR margin-5>
                    <TouchableOpacity onPress={onClose}>
                    <Text>close</Text>
                    </TouchableOpacity>
                </View>
            </View>}
            </Animated.View>
    )
}

export default SearchComponent
