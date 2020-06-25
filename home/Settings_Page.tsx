import React from "react"
import {View, Text, Button} from "react-native-ui-lib"
import {SafeAreaView} from "react-native-safe-area-context"
import {useNavigation} from "@react-navigation/native"

const Settings_Page = () => {
	const navigation = useNavigation()

	return (
		<View flex-1 bg-background padding-10 style={{minHeight: "100%"}}>
			<Text imp>Settings</Text>
			<View marginT-10 flex-1 style={{justifyContent: "center"}}>
				<Button marginV-10 borderRadius={0} bg-primary enableShadow onPress={() => navigation.navigate("profile")}>
					<Text btn>Profile</Text>
				</Button>
				<Button
					marginV-10
					bg-primary
					enableShadow
					borderRadius={0}
					style={{elevation: 10}}
					onPress={() => navigation.navigate("about")}>
					<Text btn>About / Contact</Text>
				</Button>
			</View>
		</View>
	)
}

export default Settings_Page
