import React from "react"
import {View, Text, Button} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import {useNavigation} from "@react-navigation/native"

const Settings_Page = () => {
	const navigation = useNavigation()

	return (
		<View bg-blue80 padding-10 style={{minHeight: "100%", justifyContent: "center"}}>
			<Text imp>Settings</Text>
			<View marginT-10>
				<Button onPress={() => navigation.navigate("profile")}>
					<Text>Profile</Text>
				</Button>
			</View>
			<View marginT-10>
				<Button onPress={() => navigation.navigate("about")}>
					<Text>About / Contact</Text>
				</Button>
			</View>
		</View>
	)
}

export default Settings_Page
