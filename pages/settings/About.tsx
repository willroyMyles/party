import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'
import { useTheme } from 'styled-components'

const About = () =>
{
    return (
        <View bg-background style={{ minHeight: "100%" }}>
            {/* <Text marginT-20 lvl2>about</Text> */}

            <View>
                <RowButton text="privacy policy" where="" />
                <RowButton text="support" where="" />
                <RowButton text="about" where="" />
                <RowButton text="terms of services" where="" />
                <RowButton text="services" where="" />
            </View>
        </View>
    )
}

export default About
