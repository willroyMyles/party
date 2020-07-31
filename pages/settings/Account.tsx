import React from 'react'
import { View, Text } from 'react-native-ui-lib'
import RowButton from '../../components/RowButton'

const Account = () => {
    return (
        <View>
            <Text>account</Text>
            <View>
                <RowButton text="Login" where="login" />
                <RowButton text="Sign up" where="register" />
            </View>
        </View>
    )
}

export default Account
