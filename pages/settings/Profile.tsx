import React, { useState } from 'react'
import { View, Text, Avatar, Switch } from 'react-native-ui-lib'
import auth from '@react-native-firebase/auth'
import ProfilePiece from '../../pieces/ProfilePiece'

const Profile = () => {

    const [darkTheme, setdarkTheme] = useState(false)

    const user = auth().currentUser



    return (
        <View padding-10>
            {user && <ProfilePiece image={user.photoURL || ""} name={user.displayName || ""} />}
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
                        }}></Switch>
                </View>
            </View>
        </View>
    )


}

export default Profile
