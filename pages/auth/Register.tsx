import React from 'react'
import { View, Text, TextField, TouchableOpacity } from 'react-native-ui-lib'
import { ScrollView, StyleSheet } from 'react-native'

const Register = () => {
    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={{ justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text>Register</Text>
            <View br50 marginT-90 padding-10 bg-white style={{ width: "100%", elevation: 0 }}>
                <View marginT-10 padding-10 centerV style={{}}>
                    <TextField floatOnFocus floatingPlaceholder style={style.input} placeholder="user-name" />
                    <TextField floatOnFocus floatingPlaceholder style={style.input} placeholder="email" />
                    <TextField floatOnFocus floatingPlaceholder style={style.input} placeholder="password" />
                </View>

            </View>
            <View marginT-20 style={{ width: "100%" }}>
                <TouchableOpacity center style={[style.btn, { elevation: 10 }]}>
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
            <View marginV-50 row center>
                <Text>Already have an account?</Text>
                <TouchableOpacity><Text> Login</Text></TouchableOpacity>
            </View>
            <TouchableOpacity><Text> skip</Text></TouchableOpacity>
        </ScrollView>
    )
}

export default Register
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