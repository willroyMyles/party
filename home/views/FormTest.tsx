import React from "react"
import {View, Text, TextInput, Button} from "react-native"
import {useForm, Controller} from "react-hook-form"

const FormTest = () => {
	const {register, setValue, handleSubmit, setError, errors, control, getValues} = useForm()

	const onSubmit = (data: any) => {
		console.log(data)
	}

	return (
		<View>
			<Controller
				control={control}
				render={({onChange, onBlur, value}) => (
					<TextInput onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
				)}
				name="name"
				rules={{required: "name is requires"}}
				defaultValue="life"
			/>
			{errors.name && <Text>{errors.name.message}</Text>}
			<Button title="SUBMIT" onPress={() => handleSubmit(onSubmit)()} />
		</View>
	)
}

export default FormTest
