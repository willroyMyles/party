import { StyleSheet } from "react-native";
import { Colors } from "react-native-ui-lib";
import { useTheme } from "styled-components";



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
})