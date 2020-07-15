import React, {Component} from "react"
import {Text, View} from "react-native"
import * as GSI from "expo-google-sign-in"
export class GoogleSignIn extends Component {
	state = {user: null}

	componentDidMount() {
		this.initAsync()
	}

	initAsync = async () => {
		await GSI.initAsync({
			// You may ommit the clientId when the firebase `googleServicesFile` is configured
			// clientId: "<YOUR_IOS_CLIENT_ID>",
		})
		this._syncUserWithStateAsync()
	}

	_syncUserWithStateAsync = async () => {
		const user = await GSI.signInSilentlyAsync()
		this.setState({user})
	}

	signOutAsync = async () => {
		await GSI.signOutAsync()
		this.setState({user: null})
	}

	signInAsync = async () => {
		try {
			await GSI.askForPlayServicesAsync()
			const {type, user} = await GSI.signInAsync()
			if (type === "success") {
				this._syncUserWithStateAsync()
			}
		} catch ({message}) {
			alert("login: Error:" + message)
		}
	}

	onPress = () => {
		if (this.state.user) {
			this.signOutAsync()
		} else {
			this.signInAsync()
		}
	}

	render() {
		return <Text onPress={this.onPress}>Toggle Auth</Text>
	}
}

export default GoogleSignIn
