import React from "react"
import {View, Text, TextField, Button, TouchableOpacity} from "react-native-ui-lib"
import {Link, useNavigation} from "@react-navigation/native"
import {useForm, Controller} from "react-hook-form"
import Fire from "../dataLayer/Firebase"

const LoginPage = () => {
	const navigation = useNavigation()

	const handleSignup = () => {
		navigation.navigate("signup")
	}

	const {handleSubmit, errors, control} = useForm()

	const onSubmit = (data: any) => {
		Fire.signUp(data)
	}

	return (
		<View flex-5 centerV padding-20>
			<View flex-1 />
			<View flex-3 top>
				<View marginV-25>
					<Text imp> Log in</Text>
				</View>
				<Controller
					name="email"
					control={control}
					rules={{required: "email required"}}
					render={({onChange, onBlur, value}) => (
						<TextField
							placeholder="User Name"
							floatingPlaceholder={true}
							floatOnFocus={true}
							showCharacterCounter={true}
							maxLength={200}
							onChangeText={(values: any) => onChange(values)}
							onBlur={onBlur}
							value={value}
							error={errors.email ? errors.email.message : null}
						/>
					)}
					defaultValue="heello"
				/>

				<Controller
					name="password"
					control={control}
					render={({onChange, onBlur, value}) => (
						<TextField
							placeholder="Password"
							floatingPlaceholder={true}
							floatOnFocus={true}
							showCharacterCounter={true}
							maxLength={16}
							secureTextEntry={true}
							onChangeText={(values: any) => onChange(values)}
							onBlur={onBlur}
							value={value}
						/>
					)}
				/>
				<Button
					onPress={(e: any) => {
						handleSubmit(onSubmit)()
					}}
					bg-grey50
					enableShadow
					marginT-20>
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
