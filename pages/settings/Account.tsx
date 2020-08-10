import React from 'react'
import "mobx-react-lite/batchingForReactNative"
import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'
import { useTheme } from 'styled-components'
import FireStore from '../../data_layer/FireStore'
import TToast from '../../components/TToast'

const Account = () => {
    const theme = useTheme()
    const confirmLogout = () =>
    {
        FireStore.auth.logout().then( res =>
        {
            TToast.success("OK!", "logged out successfully")
        })
    }
    return (
        <View bg-background flex>
            <Text>account</Text>
            <View>
                <RowButton text="Login" where="login" />
                <RowButton text="Sign up" where="register" />
                <TouchableOpacity onPress={confirmLogout}>
                    <RowButton text="Log out" where="" />
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default Account
