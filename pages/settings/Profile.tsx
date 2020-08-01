import React, { useState } from 'react'
import { View, Text, Avatar, Switch, TouchableOpacity, Colors } from 'react-native-ui-lib'
import auth from '@react-native-firebase/auth'
import ProfilePiece from '../../pieces/ProfilePiece'
import tm from '../../universal/UiManager'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Profile = () => {

    const navigation = useNavigation()
    const [darkTheme, setdarkTheme] = useState(false)
    const handleCreateEvent = () => navigation.navigate("create event")

    return (
        <View padding-10 bg-background style={{ minHeight: "100%" }}>
            <ProfilePiece />
            <View>
                <View row spread>
                    <Text>Change Theme</Text>
                    <Switch
                        // offColor={Colors.text}
                        // onColor={Colors.background_secondary}
                        value={darkTheme}
                        // thumbColor={Colors.primary}
                        // thumbStyle={{backgroundColor: Colors.primary}}
                        // style={{backgroundColor: uiManager.theme.bgHilight, borderWidth: 1, borderColor: Colors.primary}}
                        onValueChange={(val: boolean) => {
                            setdarkTheme(val)
                            tm.setThemeType(val)
                        }}></Switch>
                </View>
            </View>
            <View center marginT-40>
                <TouchableOpacity onPress={handleCreateEvent} activeOpacity={.8} center style={[style.create, { backgroundColor: Colors.foreground }]}>
                    <Text>create event</Text>

                </TouchableOpacity>
            </View>
        </View>
    )


}

export default Profile

const style = StyleSheet.create({
    create: {
        padding: 20,
        // borderWidth: .1,
        // borderColor: Colors.red80,
        borderRadius: 7,
        width: "100%",
        elevation: 5,


    }
})
