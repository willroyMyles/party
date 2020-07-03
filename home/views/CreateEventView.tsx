import React, {useEffect} from "react"
import {View, Text, TouchableOpacity, TextField, Colors, Button} from "react-native-ui-lib"
import {ScrollView, StyleSheet, TextInput} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import {useTheme} from "styled-components"
import {useForm, Controller} from "react-hook-form"
import {values} from "mobx"

const CreateEventView = () => {
	const theme = useTheme()
	const {register, setValue, handleSubmit, setError, errors, control, getValues} = useForm()

	const submitter = (data: any) => {
		console.log(data, "data")
	}

	const style = StyleSheet.create({
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
		<ScrollView style={{flex: 1}} endFillColor={Colors.primary}>
			<View bg-background padding-10 paddingB-35>
				<Text imp>Create Event</Text>
				<View marginT-15>
					<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}></Text>
					<TouchableOpacity>
						<View
							centerH
							centerV
							paddingV-100
							marginV-10
							row
							style={{
								borderWidth: 1,
								borderStyle: "dashed",
								borderColor: Colors.primary + 55,
								borderRadius: 7,
								backgroundColor: Colors.backgroundHighlight,
								elevation: 0,
							}}>
							<Icon name="plus" size={30} color={Colors.primary} style={{paddingEnd: 15}} />
							<Text imp1 color={Colors.primary} style={{textTransform: "uppercase"}}>
								upload flyer
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View marginT-40>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							name of party
						</Text>
						{errors.name && <ErrorText text={errors.name.message} />}
					</View>
					<Controller
						control={control}
						render={({onChange, onBlur, value}) => (
							<TextInput style={style.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
						)}
						name="name"
						rules={{required: "is required"}}
						defaultValue=""
					/>
				</View>
				<View>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							Description
						</Text>
						{errors.description && <ErrorText text={errors.description.message} />}
					</View>
					<Controller
						control={control}
						render={({onChange, onBlur, value}) => (
							<TextInput
								maxLength={250}
								style={style.input}
								onBlur={onBlur}
								onChangeText={(value: any) => onChange(value)}
								value={value}
							/>
						)}
						name="description"
						rules={{required: "is required", maxLength: {value: 250, message: "exceeded max characters"}}}
						defaultValue=""
					/>
				</View>
				<View>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							date of party
						</Text>
						{errors.date && <ErrorText text={errors.date.message} />}
					</View>
					<Controller
						control={control}
						render={({onChange, onBlur, value}) => (
							<TextInput style={style.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
						)}
						name="date"
						rules={{required: "is required"}}
						defaultValue=""
					/>
				</View>
				<View>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							time of party
						</Text>
						{errors.start && <ErrorText text={errors.start.message} />}
						{errors.end && <ErrorText text={errors.end.message} />}
					</View>
					<View
						row
						flex-1
						style={{flexDirection: "row", flexGrow: 1, alignItems: "baseline", justifyContent: "space-between"}}>
						<Text reg>from</Text>
						<Controller
							control={control}
							render={({onChange, onBlur, value}) => (
								<TextInput
									style={[style.input, {width: "30%", marginHorizontal: 5}]}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									value={value}
								/>
							)}
							name="start"
							rules={{required: "start time is required,"}}
							defaultValue=""
						/>
						<Text reg>to</Text>
						<Controller
							control={control}
							render={({onChange, onBlur, value}) => (
								<TextInput
									style={[style.input, {width: "30%", marginHorizontal: 5}]}
									onBlur={onBlur}
									onChangeText={(value) => onChange(value)}
									value={value}
								/>
							)}
							name="end"
							rules={{required: "end time is required"}}
							defaultValue=""
						/>
						<View />
					</View>
				</View>
				<View>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							admission of party
						</Text>
						{errors.admission && <ErrorText text={errors.admission.message} />}
					</View>
					<Controller
						control={control}
						render={({onChange, onBlur, value}) => (
							<TextInput style={style.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
						)}
						name="admission"
						rules={{required: "is required"}}
						defaultValue=""
					/>
				</View>
				<View>
					<Text hint></Text>
				</View>
				<View>
					<View row>
						<Text reg style={{opacity: 0.7, textTransform: "capitalize"}}>
							location of party
						</Text>
						{errors.location && <ErrorText text={errors.location.message} />}
					</View>
					<Controller
						control={control}
						render={({onChange, onBlur, value}) => (
							<TextInput style={style.input} onBlur={onBlur} onChangeText={(value) => onChange(value)} value={value} />
						)}
						name="location"
						rules={{required: "is required"}}
						defaultValue=""
					/>
				</View>
				<View row style={{justifyContent: "space-around"}}>
					<Button bg-primary size="large" borderRadius={2}>
						<Text btn>Preview</Text>
					</Button>
					<Button
						bg-primary
						size="large"
						borderRadius={2}
						onPress={(e: any) => {
							handleSubmit(submitter)()
						}}>
						<Text btn>Submit</Text>
					</Button>
				</View>
			</View>
		</ScrollView>
	)
}

const ErrorText = ({text}: {text: string}) => {
	return (
		<View>
			<Text marginL-3 reg style={{color: "rgba(250,40,40,1)"}}>
				{text}
			</Text>
		</View>
	)
}

export default CreateEventView
