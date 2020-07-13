import React, {useState} from "react"
import {Button, TouchableOpacity, View, Text, TextField, Colors, Toast} from "react-native-ui-lib"
import {useNavigation} from "@react-navigation/native"
import {ScrollView, Dimensions, TextInput, StyleSheet} from "react-native"
import {useForm, Controller} from "react-hook-form"
import {useTheme} from "styled-components"
import SkipButton from "../components/SkipButton"
import fireSotreMob from "../dataLayer/FireStore"
import {observer} from "mobx-react"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"

const Signup = observer(() => {
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

	const [ToastVisible, setToastVisible] = useState(false)
	const [message, setMessage] = useState("hello")

	const theme = useTheme()
	const navigation = useNavigation()
	const {handleSubmit, errors, control, setError} = useForm()

	const handleLogin = () => navigation.navigate("login")

	const handleSignUp = (data: any) => {
		eventEmitter.emit(eventStrings.loggingIn, true)
		if (checPasswords(data)) {
			fireSotreMob.signUp(data).then((res) => {
				if (res) {
					//successful
					navigation.navigate("home")
				} else {
					//unsucessful
					console.log(fireSotreMob.errorMessageSignUp)

					setMessage(fireSotreMob.errorMessageSignUp)
					setToastVisible(true)
				}
				eventEmitter.emit(eventStrings.loggingIn, false)
			})
		} else {
			setToastVisible(true)
			setMessage("password mmismatch")
			setError("password", {message: "mismatch", type: "string"})
			setError("confirm", {message: "mismatch", type: "string"})
			eventEmitter.emit(eventStrings.loggingIn, false)
		}
	}

	const checPasswords = ({confirm, password}: {confirm: string; password: string}) => {
		return confirm === password
	}

	return (
		<ScrollView contentContainerStyle={{minHeight: Dimensions.get("screen").height}}>
			<Toast
				message={fireSotreMob.errorMessageSignUp}
				position="bottom"
				visible={ToastVisible}
				autoDismiss={3000}
				onDismiss={() => setToastVisible(false)}
			/>
			<View flex-5 bg-primary>
				<View flex-2 centerV padding-20>
					<View marginV-25>
						<Text imp color={"white"}>
							Sign up
						</Text>
					</View>
				</View>
				<View flex-3 top centerV padding-20 bg-background style={{borderTopEndRadius: 25, borderTopStartRadius: 25}}>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							username
						</Text>
						{errors.username && <ErrorText text={errors.username.message} />}
					</View>
					<Controller
						render={({onChange, onBlur, value}) => (
							<TextInput
								style={styles.input}
								onBlur={onBlur}
								onChangeText={(value) => {
									onChange(value)
								}}
								value={value}
							/>
						)}
						control={control}
						name="username"
						rules={{required: "is required"}}
						defaultValue=""
					/>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							email
						</Text>
						{errors.email && <ErrorText text={errors.email.message} />}
					</View>
					<Controller
						control={control}
						rules={{required: "is required"}}
						name="email"
						defaultValue=""
						render={({onChange, onBlur, value}) => (
							<TextInput style={styles.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
						)}
					/>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							Password
						</Text>
						{errors.password && <ErrorText text={errors.password.message} />}
					</View>
					<Controller
						control={control}
						rules={{required: "is required"}}
						name="password"
						defaultValue=""
						render={({onChange, onBlur, value}) => (
							<TextInput style={styles.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
						)}
					/>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							Confirm password
						</Text>
						{errors.confirm && <ErrorText text={errors.confirm.message} />}
					</View>
					<Controller
						control={control}
						rules={{required: "is required"}}
						name="confirm"
						defaultValue=""
						render={({onChange, onBlur, value}) => (
							<TextInput style={styles.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
						)}
					/>

					<Button
						bg-primary
						size="large"
						borderRadius={4}
						onPress={(e: any) => {
							return handleSubmit(handleSignUp)()
						}}>
						<Text btn>Submit</Text>
					</Button>
					<View marginT-20 centerH style={{alignItems: "center", flexDirection: "row", justifyContent: "center"}}>
						<Text hint>Already have an account? </Text>
						<TouchableOpacity onPress={handleLogin}>
							<Text color={Colors.primary} hint>
								log in
							</Text>
						</TouchableOpacity>
					</View>
					<SkipButton where="home" />
				</View>
			</View>
		</ScrollView>
	)
})

export default Signup

const ErrorText = ({text}: {text: string}) => {
	return (
		<View>
			<Text marginL-3 reg style={{color: "rgba(250,40,40,1)"}}>
				{text}
			</Text>
		</View>
	)
}
