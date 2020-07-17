import "mobx-react-lite/batchingForReactNative"
import React, {useEffect, useState, ReactNode} from "react"
import {View, Toast} from "react-native-ui-lib"
import {StyleSheet, ActivityIndicator} from "react-native"
import {Colors} from "react-native-ui-lib"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {createStackNavigator} from "@react-navigation/stack"
import {observer} from "mobx-react"
import uiManager from "./dataLayer/UiManager"
import {generate} from "@ant-design/colors"
import {ThemeProvider} from "styled-components"
import * as Font from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import Navigator from "./components/Navigator"
import {eventEmitter, eventStrings} from "./universial/EventEmitter"
import {decode, encode} from "base-64"
import fireSotreMob from "./dataLayer/FireStore"
console.ignoredYellowBox = ["Setting a timer"]

import _ from "lodash"

//ignores a warning
const _console = _.clone(console)
console.warn = (message: any) => {
	if (message.indexOf("Setting a timer") <= -1) {
		_console.warn(message)
	}
}
export default observer(function App() {
	const [loading, setLoading] = useState(true)
	const [activityLoading, setactivityLoading] = useState(false)
	const [showToast, setshowToast] = useState(false)

	useEffect(() => {
		if (!global.btoa) {
			global.btoa = encode
		}

		if (!global.atob) {
			global.atob = decode
		}

		SplashScreen.preventAutoHideAsync()

		eventEmitter.addListener(eventStrings.loggingIn, setactivityLoading)
		eventEmitter.addListener(eventStrings.showToast, setshowToast)
		Font.loadAsync({
			Nunito_Black: require("./assets/fonts/Nunito/Nunito-Black.ttf"),
			Nunito_Regular: require("./assets/fonts/Nunito/Nunito-Regular.ttf"),
			Nunito_Semi_Bold: require("./assets/fonts/Nunito/Nunito-SemiBold.ttf"),
		}).then(() => {
			setLoading(false)
			SplashScreen.hideAsync()
		})

		return () => {
			eventEmitter.removeListener(eventStrings.loggingIn, () => null)
			eventEmitter.removeListener(eventStrings.showToast, () => null)
		}
	}, [])

	return (
		<SafeAreaProvider>
			<ThemeProvider theme={uiManager.theme}>
				{!loading && (
					<View style={styles.container}>
						{activityLoading && (
							<View
								center
								style={{
									position: "absolute",
									height: "100%",
									width: "100%",
									backgroundColor: "rgba(0,0,0,.3)",
									zIndex: 1,
								}}>
								<ActivityIndicator size="large" color={Colors.primary} animating={activityLoading} />
							</View>
						)}
						<Navigator />
						<Toast
							onDismiss={() => setshowToast(false)}
							visible={showToast}
							position="bottom"
							autoDismiss={3000}
							message={fireSotreMob.errorMessage}
						/>
					</View>
				)}
			</ThemeProvider>
		</SafeAreaProvider>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	text: {
		color: "#fff",
	},
})
