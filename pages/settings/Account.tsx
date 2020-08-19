import React from 'react'
import "mobx-react-lite/batchingForReactNative"
import { View, Text, TouchableOpacity, Colors } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'
import { useTheme } from 'styled-components'
import FireStore from '../../data_layer/FireStore'
import TToast from '../../components/TToast'
import { StyleSheet } from 'react-native'

const Account = () =>
{
    const theme = useTheme()
    const confirmLogout = () =>
    {
        TToast.working( "We'll miss you", "Hold a moment while we log you out" )
        FireStore.auth.logout().then( res =>
        {
            TToast.success( "OK!", "logged out successfully" )
        } )
    }
    return (
        <View bg-background flex>
            <View>
                <RowButton text="Login" where="login" />
                <RowButton text="Sign up" where="register" />
                <TouchableOpacity padding-10 paddingH-10 marginT-9 row spread onPress={confirmLogout} style={style.row}>
                    <Text lvl2 style={style.text}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Account

const style = StyleSheet.create( {
    row: {
        justifyContent: "space-between",
        paddingStart: 15,
        paddingBottom: 15,
        borderBottomColor: Colors.grey40 + "43",
        borderBottomWidth: .5,
        marginBottom: 2

    },
    text: {
        textTransform: "capitalize"
    }
} )