import React from 'react'
import "mobx-react-lite/batchingForReactNative"
import { View, Text } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'
import { useTheme } from 'styled-components'
import FireStore from '../../data_layer/FireStore'

const Account = () => {
    const theme = useTheme()
    return (
        <View bg-background flex>
            <Text>account</Text>
            <View>
                <RowButton text="Login" where="login" />
                <RowButton text="Sign up" where="register" />
                    <RowButton text="Log out" where="" />
            </View>
        </View>
    )
}

export default Account
