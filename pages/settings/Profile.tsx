import React, { useEffect, useState } from 'react'
import { View, Text, Avatar, Switch, TouchableOpacity, Colors } from 'react-native-ui-lib'
import ProfilePiece from '../../pieces/ProfilePiece'
import tm, { ThemeType } from '../../universal/UiManager'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BackDrop, { BackDropV2 } from '../../components/BackDrop'
import RSVPModule from '../../components/RSVPModule'
import { ScrollView } from 'react-native-gesture-handler'
import FireStore from '../../data_layer/FireStore'

const Profile = () =>
{

    const theme = useTheme()
    const navigation = useNavigation()
    const [darkTheme, setdarkTheme] = useState( false )
    const handleCreateEvent = () =>
    {
        FireStore.auth.needAuth().then( res =>
        {
            if ( res )
            {
                navigation.navigate( "create event" )
            }
        } )
    }
    const handleCHnage = ( val: boolean ) =>
    {
        setdarkTheme( val )
        setTimeout(() => {
                tm.setThemeType( val )
        }, 300);
    }

    const handleLocationChanged = ( val: boolean ) =>
    {
        
    }

    useEffect( () =>
        setdarkTheme( tm.themeType == ThemeType.DARK )
        , [] )

    return (
        <ScrollView contentContainerStyle={{ minHeight: "100%", overflow: "scroll", padding: 10, backgroundColor: Colors.background }}>
            <ProfilePiece />
            <View>
                <View row spread>
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
                <View marginT-20 row spread>
                    <Text lvl2>Location Permission</Text>
                    <Switch
                        offColor={Colors.secondary}
                        onColor={Colors.secondary}
                        // value={darkTheme}
                        thumbColor={Colors.background}
                        thumbStyle={{ backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.primary + "60" }}
                        style={{ borderWidth: 1, borderColor: Colors.primary + "68", elevation: 1 }}

                    onValueChange={handleLocationChanged}
                    ></Switch>
                </View>
            </View>
            <View>
                <RSVPModule />
            </View>
            <View center marginT-40>
                <TouchableOpacity row onPress={handleCreateEvent} activeOpacity={.8} center style={[style.create, { backgroundColor: Colors.foreground }]}>

                    <Icon name="plus" size={18} color={Colors.text1} />
                    <Text btn uppercase marginH-10 >create party</Text>
                    <BackDropV2 />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )


}

export default Profile

const style = StyleSheet.create( {
    create: {
        padding: 20,
        // borderWidth: .1,
        // borderColor: Colors.red80,
        borderRadius: 7,
        width: "100%",
        elevation: 10,
        minHeight: 160,
        overflow: "hidden"


    }
} )
