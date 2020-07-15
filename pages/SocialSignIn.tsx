import React, {Component} from "react"
import {Text, View} from "react-native"
import * as Google from "expo-google-app-auth"
import fireSotreMob from "../dataLayer/FireStore"
// import * as Google from "expo-google-sign-in"
export class SocialSignIn extends Component {
	onLoginSuccess: any
	componentDidMount() {
		this.signInWithGoogle()
	}
	async signInWithGoogle() {
		try {
			const result = await Google.logInAsync({
				androidClientId: "562995348940-uh15ratmr7ct4hcmogvc0k1tpf15i24s.apps.googleusercontent.com",
				// iosClientId: IOSClientId,
				scopes: ["profile", "email"],
			})
			if (result.type === "success") {
				fireSotreMob.handleGoogleSignin(result)
			}
		} catch ({message}) {
			alert("login: Error:" + message)
		}
	}
	render() {
		return (
			<View>
				<Text> textInComponent </Text>
			</View>
		)
	}
}

export default SocialSignIn
