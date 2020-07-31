import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'

const About = () => {
    return (
        <View>
            <Text marginT-20>about</Text>

            <View>
                <RowButton text="privacy policy" where="" />
                <RowButton text="support" where="" />
                <RowButton text="about" where="" />
                <RowButton text="terms of services" where="" />
            </View>
        </View>
    )
}

export default About
