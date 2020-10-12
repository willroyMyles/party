import React, { forwardRef, useState } from 'react'
import { View, Text, Modal } from 'react-native-ui-lib'
import { useSpring } from 'react-spring/native'


const height = 40

interface IProps
{
    options: string[]
    title: React.ReactNode
    onpress: () => void
}


const CustomActionSheet = forwardRef(( p: IProps, ref ) =>
{

    const [visible, setStatevisible] = useState(false)
    
    const [props, set, stop] = useSpring( () => ( {
        bottom: -100,
        
    } ) )
    
    const calcHeight = () => (p.options.length + 1) * height

    const show = () =>
    {
        setStatevisible(true)
        set({bottom:calcHeight()})
    }

    const hide = () =>
    {
        setStatevisible( false )
        set( { bottom: 0 } )
    }


    return (
        <Modal visible={visible} animationType="fade">
            <View >
                <View style={{ height: height }}>
                    <Text></Text>
                </View>
            </View>
       </Modal>
    )
})

export default CustomActionSheet
