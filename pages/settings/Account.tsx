import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'
import { useTheme } from 'styled-components'

const Account = () => {
    const theme = useTheme()
    return (
        <View bg-background>
            <Text>account</Text>
            <View>
                <RowButton text="Login" where="login" />
                <RowButton text="Sign up" where="register" />
            </View>
        </View>
    )
}

export default Account
