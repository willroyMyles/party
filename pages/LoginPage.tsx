import React from "react"
import {View, Text, TextField, Button, TouchableOpacity, Colors} from "react-native-ui-lib"
import {Link, useNavigation} from "@react-navigation/native"
import {useForm, Controller} from "react-hook-form"
import Fire from "../dataLayer/Firebase"
import {TextInput, StyleSheet} from "react-native"

const LoginPage = () => {
	const navigation = useNavigation()

	const handleSignup = () => {
		navigation.navigate("signup")
	}

	const {handleSubmit, errors, control} = useForm()

	const onSubmit = (data: any) => {
		// Fire.signInWithEmailAndPassword(data)
		Fire.isLoggedIn()
	}

	const styles = StyleSheet.create({
		input: {
			borderWidth: 1,
			// borderColor: "rgba(0,0,0,.3)",
			borderColor: Colors.primary + "55",
			backgroundColor: Colors.backgroundHighlight,
			marginBottom: 35,
			marginTop: 7,
			borderRadius: 4,
			padding: 9,
			elevation: 0,
			color: Colors.textColor,
			fontFamily: "Nunito_Semi_Bold",
		},
	})

	return (
		<View flex-5 centerV bg-primary>
			<View flex-1>
				<View padding-20 marginV-25 centerV flex-1>
					<Text imp style={{color: "white"}}>
						Log in
					</Text>
				</View>
			</View>
			<View padding-20 centerV bg-background flex-3 top style={{borderTopEndRadius: 25, borderTopStartRadius: 25}}>
				<View row>
					<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
						email
					</Text>
					{errors.email && <ErrorText text={errors.email.message} />}
				</View>
				<Controller
					name="email"
					control={control}
					rules={{required: "is required"}}
					render={({onChange, onBlur, value}) => (
						<TextInput
							style={styles.input}
							onChangeText={(values: any) => onChange(values)}
							onBlur={onBlur}
							value={value}
						/>
					)}
					defaultValue=""
				/>

				<View row>
					<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
						Password
					</Text>
					{errors.password && <ErrorText text={errors.password.message} />}
				</View>
				<Controller
					name="password"
					control={control}
					rules={{required: "is required"}}
					render={({onChange, onBlur, value}) => (
						<TextInput
							style={styles.input}
							maxLength={16}
							secureTextEntry={true}
							onChangeText={(values: any) => onChange(values)}
							onBlur={onBlur}
							value={value}
						/>
					)}
				/>
				<Button
					marginT-25
					bg-primary
					size="large"
					borderRadius={4}
					onPress={(e: any) => {
						return handleSubmit(onSubmit)()
					}}>
					<Text btn>Submit</Text>
				</Button>
				<View marginT-20 centerH style={{alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
					<Text hint>Don't have an account? </Text>
					<TouchableOpacity onPress={handleSignup}>
						<Text primary hint>
							sign up
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}

const ErrorText = ({text}: {text: string}) => {
	//consider exporting from central location
	return (
		<View>
			<Text marginL-3 reg style={{color: "rgba(250,40,40,1)"}}>
				{text}
			</Text>
		</View>
	)
}
export default LoginPage
