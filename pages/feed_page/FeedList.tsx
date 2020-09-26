import React, { useEffect, useState } from 'react'
import { View, Text, Colors, KeyboardAwareListView } from 'react-native-ui-lib'
import Animated from 'react-native-reanimated'
import { FlatList, FlatListProps} from 'react-native'
import { useTheme } from 'styled-components'
import * as faker from 'faker'


const AFL = Animated.createAnimatedComponent( FlatList )

const FeedList = (  { scrollY, off } : {scrollY:Animated.Value<number>, off:number} ) =>
{

    const theme = useTheme()
    const diffY = Animated.diffClamp( scrollY, 0, off )
    const headerY = Animated.interpolate( diffY, {
        inputRange: [0, off],
        outputRange: [0, -off]
    } )


    const [data, setData] = useState<any[]>([])
    useEffect( () =>
    {
       loadData()
        
    }, [] )
    
    const loadData = () =>
    {
        setData([])
        const d = []
        for ( let index = 0; index < 3; index++ )
        {
            const random = faker.address.city()
            d.push( random )
            
        }
        setData( dat => dat.concat(d) )

    }

    const add1 = () =>
    {
        const d = []
        d.push( faker.address.city())
        setData( dat => dat.concat( d ) )
    }

    return (
        <Animated.View style={{
            paddingBottom: 180,
            backgroundColor: Colors.red60,
            // height: "100%",

        width: "100%",

      borderWidth:5
        }}>
            <AFL
                style={{
                    paddingTop: 200,

                    height: "120%",
                    width: "100%",
                    borderWidth: 7,
                    borderColor:Colors.yellow20
                }}
                scrollEventThrottle={16}
                data={data}
                onEndReachedThreshold={.1}
                onEndReached={add1}
                keyExtractor={( item: any, index: number ) => `${item} , ${index}`}
                onScroll={e =>
                {
                    const c = e.nativeEvent.contentOffset.y
                    scrollY.setValue(c)
                }}
                renderItem={( { item, index } ) =>
                {
                    return <View padding-100 bg-green60 margin-10 center>
                        <Text>{item}</Text>
                        <Text>{index}</Text>
                    </View>
                }}
            
            />
        </Animated.View>
    )
}

export default FeedList
