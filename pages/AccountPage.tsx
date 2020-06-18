import React from "react"
import {View, Text, Button, Colors} from "react-native-ui-lib"
import {StyleSheet} from "react-native"
import {useSafeArea} from "react-native-safe-area-view"
import {SafeAreaView} from "react-native-safe-area-context"

export const AccountPage = (props: any) => {
	const safearea = useSafeArea()
	console.log(props)

	return (
		<SafeAreaView style={{flex: 1}}>
			<View flex-3 padding-10>
				<View flex-2 bottom left width-1>
					<Text desc>
						Welcome to <Text imp>My #1 Party</Text>
					</Text>
				</View>
				<View flex-2 left top width-1 paddingT-20>
					<Text desc>The new way to browse and find parties.</Text>
				</View>

				<View flex-1 bottom paddingB-50>
					<Button
						bg-grey80
						enableShadow
						size="large"
						onPress={() => {
							props.navigation.push("login")
						}}>
						<Text imp1>Get Started</Text>
					</Button>
					<View padding-20 paddingT-20 style={{alignItems: "center"}}>
						<Text desc>
							By using <Text imp1>My #1 Party</Text> app, you agree to the
							<Text imp1> Terms and Services</Text> and our
							<Text imp1> Privacy Policy</Text>
						</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	bold: {
		fontWeight: "700",
		color: Colors.grey10,
	},
	text: {
		fontSize: 35,
	},
	light: {
		color: Colors.grey30,
	},
})

export default AccountPage
