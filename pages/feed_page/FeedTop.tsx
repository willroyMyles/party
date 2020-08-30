import React from 'react'
import Animated from 'react-native-reanimated'
import { View, Text } from 'react-native-ui-lib'
import PartyTypesRow from '../PartyTypesRow'

const FeedTop = ( { scrollY, off }: { scrollY: Animated.Value<number>, off: number } ) =>
{
    
    const diffY = Animated.diffClamp( scrollY, 0, off )
    const headerY = Animated.interpolate( diffY, {
        inputRange: [0, off],
        outputRange: [0, -off]
    } )
    
    return (
        <Animated.View style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100%",
            transform: [{ translateY: headerY }],
            // height: 600
        }}>
            <PartyTypesRow heightt={off} />
        </Animated.View>
    )
}

export default FeedTop
