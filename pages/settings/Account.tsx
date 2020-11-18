import React, { useEffect, useState } from 'react'
import "mobx-react-lite/batchingForReactNative"
import { View, Text, TouchableOpacity, Colors, Switch } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'
import { useTheme } from 'styled-components'
import FireStore from '../../data_layer/FireStore'
import TToast from '../../components/TToast'
import { Alert, Linking, StyleSheet } from 'react-native'
import { GetLocationPermission } from '../../universal/GetLocation'
import tm, { ThemeType } from '../../universal/UiManager'
import ProfilePiece from '../../pieces/ProfilePiece'

const Account = () =>
{
    const theme = useTheme()
    const [darkTheme, setdarkTheme] = useState( false )

    useEffect( () =>
    setdarkTheme( tm.themeType == ThemeType.DARK )
    , [] )


    const confirmLogout = () =>
    {
        TToast.working( "We'll miss you", "Hold a moment while we log you out" )
        FireStore.auth.logout().then( res =>
        {
            TToast.success( "OK!", "logged out successfully" )
        } )
    }

    const handleCHnage = ( val: boolean ) =>
    {
        setdarkTheme( val )
        setTimeout(() => {
                tm.setThemeType( val )
        }, 10);
    }

    const handleLocationChanged = ( val: boolean ) =>
    {                
        if ( val )
        {
            GetLocationPermission().then( (res) =>
            {
                tm.setLocationGranted( res )

            })
        } else
        {
            tm.setLocationGranted(val)
        }
    }

    return (
        <View bg-background flex paddingT-20>
            <View>
            <ProfilePiece />

                <View row spread paddingH-10>
                    <Text lvl2>Dark Theme</Text>
                    <Switch
                        offColor={Colors.secondary}
                        onColor={Colors.secondary}
                        value={darkTheme}
                        thumbColor={Colors.background}
                        thumbStyle={{ backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.primary + "60" }}
                        style={{ borderWidth: 1, borderColor: Colors.primary + "68", elevation: 1 }}

                        onValueChange={handleCHnage}></Switch>
                </View>
                <View marginT-20 row spread paddingH-10>
                    <Text lvl2>Location Permission</Text>
                    <Switch
                        offColor={Colors.secondary}
                        onColor={Colors.secondary}
                        value={tm.isLocationGranted}
                        thumbColor={Colors.background}
                        thumbStyle={{ backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.primary + "60" }}
                        style={{ borderWidth: 1, borderColor: Colors.primary + "68", elevation: 1 }}

                        onValueChange={handleLocationChanged}
                    ></Switch>
                </View>
                {tm.isLocationGranted && <View marginT-20 row spread>
                    <Text lvl2>Location All the time</Text>
                    <TouchableOpacity onPress={() =>
                    {
                        Alert.alert( "Additional Location Permission Needed", `     \tHey, we need additional persmission location to be "allow all the time" to determine when your at a party. this will check if your at a party periodically. No personal information will be collected in the process`,
                            [{
                                text: "Maybe Later",
                                onPress: () => { },
                                style: "cancel"
                            },
                            {
                                text: "Sure",
                                onPress: () => Linking.openSettings()
                            },
                       
                            ], {cancelable:true} );
                    }} center style={{
                        backgroundColor: Colors.foreground,
                        paddingHorizontal: 12,
                        padding:6,
                        borderRadius: 5,
                        elevation:10
                    }}>
                        {/* <Icon name="info" size={22} color={Colors.text1} /> */}
                        <Text lvl1> show</Text>
                    </TouchableOpacity>
                </View>}
            </View>
            <View marginT-50>
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