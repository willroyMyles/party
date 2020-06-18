import React from "react"
import {Button, TouchableOpacity, View, Text, TextField} from "react-native-ui-lib"
import {useNavigation} from "@react-navigation/native"
import {ScrollView, Dimensions} from "react-native"

const Signup = () => {
	const navigation = useNavigation()
	const handleLogin = () => navigation.navigate("login")

	return (
		<ScrollView contentContainerStyle={{minHeight: Dimensions.get("screen").height}}>
			<View flex-5 centerV padding-20>
				<View flex-2 />
				<View flex-3 top>
					<View marginV-25>
						<Text imp> Sign up</Text>
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
						// secureTextEntry={true}
					/>
					<TextField
						placeholder="Email"
						floatingPlaceholder={true}
						floatOnFocus={true}
						showCharacterCounter={true}
						maxLength={50}
						// error={this.state.passErrors}
						// rightIconSource={AssetsImages.images.eye_off}
						// rightIconStyle={{tintColor: Colors.grey40}}
						// onChangeText={(text) => this.setState({pass: text})}
						// value={this.state.pass}
						// secureTextEntry={true}
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
					<TextField
						placeholder="Confirm Password"
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
						<Text desc>Already have an account? </Text>
						<TouchableOpacity onPress={handleLogin}>
							<Text blue20 desc>
								log in
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

export default Signup
