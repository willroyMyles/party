import React, { useState } from 'react'
import { View, Text, Avatar, Switch } from 'react-native-ui-lib'
import auth from '@react-native-firebase/auth'
import ProfilePiece from '../../pieces/ProfilePiece'
import { changeTheme } from '../../universal/Theme'
import tm from '../../universal/UiManager'

const Profile = () => {

    const [darkTheme, setdarkTheme] = useState(false)

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
        </View>
    )


}

export default Profile
