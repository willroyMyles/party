import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Colors, LoaderScreen, Modal } from 'react-native-ui-lib'
import { BackDropV2 } from './BackDrop'

const LoaderButton = ({ loading, onPress, title }: { loading: boolean, onPress: () => void, title: React.ReactNode }) => {

    const getTitle = () =>{
        if(typeof title == typeof ""){
            return (                <Text btn uppercase marginH-10 >{title}</Text>                )
        }else{
            return (title)
        }
    }

    const handleClick = () =>{
        if(loading) return;
        console.log("clciked");
        
        loading? null : onPress()
    }

    return (
        <View style={{width: style.create.width,  overflow:"hidden", paddingBottom: 20}}>
            <TouchableOpacity accessibilityStates="" row center disabled={loading} onPress={handleClick}   style={[style.create, { backgroundColor: Colors.foreground, opacity : loading? .7 : 1, }]}>
              
                <BackDropV2 />
              {getTitle()}
                {loading && <View style={{height:25}}>
                    <LoaderScreen color={Colors.primary }/>
                    </View>}

            </TouchableOpacity>
        </View>
    )
}

export default LoaderButton


const style = StyleSheet.create({
    create: {
        padding: 20,
        // borderWidth: .1,
        // borderColor: Colors.red80,
        borderRadius: 7,
        width: "100%",
        elevation: 3,
        minHeight: 160,
        overflow: "hidden"


    }
})