import React from 'react'
import { View, Text, TextField, TouchableOpacity, Button } from 'react-native-ui-lib'
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

const Login = () => {
    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text>Welcome</Text>
            <View br50 marginT-90 padding-10 bg-white style={{ width: "100%", elevation: 0 }}>
                <View marginT-10 padding-10 centerV style={{}}>
                    <TextField floatOnFocus floatingPlaceholder style={style.input} placeholder="email" />
                    <TextField floatOnFocus floatingPlaceholder style={style.input} placeholder="password" />
                    <TouchableOpacity right>
                        <Text>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View marginT-20 style={{ width: "100%" }}>
                <TouchableOpacity center style={[style.btn, { elevation: 10 }]}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity center style={[style.btn]}>
                    <Text>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity center style={[style.btn]}>
                    <Text>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
            <View marginV-50 row center>
                <Text>Don't have an account?</Text>
                <TouchableOpacity><Text> Register</Text></TouchableOpacity>
            </View>
            <TouchableOpacity><Text> skip</Text></TouchableOpacity>
        </ScrollView>
    )
}

export default Login
const style = StyleSheet.create({
    cont: {
        padding: 10,
    },
    input: {
        marginVertical: 8
    },
    btn: {
        backgroundColor: "white",
        width: "100%",
        padding: 10,
        borderRadius: 6
        , marginTop: 10,

    }
})