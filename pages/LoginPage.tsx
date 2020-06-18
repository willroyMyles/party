import React from "react"
import {View, Text, TextField, Button, TouchableOpacity} from "react-native-ui-lib"
import {Link, useNavigation} from "@react-navigation/native"

const LoginPage = () => {
	const navigation = useNavigation()

	const handleSignup = () => {
		navigation.navigate("signup")
	}

	return (
		<View flex-5 centerV padding-20>
			<View flex-1 />
			<View flex-3 top>
				<View marginV-25>
					<Text imp> Log in</Text>
				</View>
				<TextField
					placeholder="User Name"
					floatingPlaceholder={true}
					floatOnFocus={true}
					showCharacterCounter={true}
					maxLength={200}
					// error={this.state.passErrors}
					// rightIconSource={AssetsImages.images.eye_off}
					// rightIconStyle={{tintColor: Colors.grey40}}
					// onChangeText={(text) => this.setState({pass: text})}
					// value={this.state.pass}
					secureTextEntry={true}
				/>
				<TextField
					placeholder="Password"
					floatingPlaceholder={true}
					floatOnFocus={true}
					showCharacterCounter={true}
					maxLength={16}
					// error={this.state.passErrors}
					// rightIconSource={AssetsImages.images.eye_off}
					// rightIconStyle={{tintColor: Colors.grey40}}
					// onChangeText={(text) => this.setState({pass: text})}
					// value={this.state.pass}
					secureTextEntry={true}
				/>
				<Button onPress={() => navigation.navigate("home")} bg-grey50 enableShadow marginT-20>
					<Text imp1>Submit</Text>
				</Button>
				<View marginT-20 centerH style={{alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
					<Text desc>Don't have an account? </Text>
					<TouchableOpacity onPress={handleSignup}>
						<Text blue20 desc>
							sign up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

export default LoginPage
