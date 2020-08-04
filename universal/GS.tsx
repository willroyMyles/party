
import React, { useEffect } from 'react'
import { StyleSheet } from "react-native";
import { Colors, View } from "react-native-ui-lib";
import { useTheme } from "styled-components";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { style } from 'pages/auth/Login';


export const GetIcon = ({ name }: { name: string }) => {
    const theme = useTheme()
    return <View center paddingH-5 br100 bg-secondary style={{ width: 34, height: 34, elevation: 1 }}>
        <Icon name={name} size={16} style={GS.icon} />
    </View>
}


export const GS = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 4,
        width: "100%",
        elevation: 3,

    },
    input: {

        backgroundColor: "rgba(100,100,150,.03)",
        marginTop: -7,
        padding: 5,
        borderRadius: 7,
        paddingStart: 12,
        marginBottom: -15,
        width: "30%"
    },
    floater: {
        marginStart: 12,
        opacity: .5,
        color: Colors.grey30
    },
    icon: {

        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        color: Colors.primary,
        elevation: 5,
        textShadowRadius: 3,
        textDecorationLine: "underline",
        zIndex: 2
    }
})