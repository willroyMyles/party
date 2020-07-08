import React, {useEffect, useState, createRef} from "react"
import {View, Text, TouchableOpacity, TextField, Colors, Button, Image} from "react-native-ui-lib"
import {ScrollView, StyleSheet, TextInput, Alert} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import {useTheme} from "styled-components"
import {useForm, Controller} from "react-hook-form"
import {useNavigation} from "@react-navigation/native"
import * as ImagePicker from "expo-image-picker"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import {eventEmitter, eventStrings} from "../../universial/EventEmitter"
import {Region} from "react-native-maps"

const CreateEventView = () => {
	const theme = useTheme()
	const navigation = useNavigation()
	const [image, setImage] = useState<any>()
	const [showStart, setShowStart] = useState(false)
	const [showEnd, setShowEnd] = useState(false)
	const [showDate, setShowDate] = useState(false)
	const [imageUri, setImageUri] = useState<any>()
	const {register, setValue, handleSubmit, setError, errors, control, getValues} = useForm()
	const [startRef, setStartRef] = useState<any>()
	const [endRef, setendRef] = useState<any>()
	const [dateRef, setdateRef] = useState<any>()

	useEffect(() => {
		eventEmitter.addListener(eventStrings.locationConfirmed, (loc: Region | undefined) => {
			if (loc == undefined) {
				setError("location", {
					type: "req",
					message: "no location selected...",
				})
			}
			setValue("location", {lat: loc?.latitude, long: loc?.longitude})
			setValue("location", [loc?.latitude, loc?.longitude].toString())
		})
		return () => {
			eventEmitter.removeListener(eventStrings.locationConfirmed, () => undefined)
		}
	}, [])

	const onStartChange = (event: any, selectedDate: Date | undefined) => {
		startRef.blur()
		setValue("start", moment(selectedDate).format("h:mm a"))
		setShowStart(false)
	}

	const onEndChange = (event: any, selectedDate: Date | undefined) => {
		endRef.blur()
		setValue("end", moment(selectedDate).format("h:mm a"))
		setShowEnd(false)
	}

	const onDateChange = (event: any, selectedDate: Date | undefined) => {
		dateRef.blur()
		setValue("date", moment(selectedDate).format("MMM D, YY"))
		setShowDate(false)
	}

	const submitter = (data: any) => {
		console.log(data, "data")
	}

	const getFlyer = async () => {
		let result = await getPhotopermission()
		if (result) {
			ImagePicker.launchImageLibraryAsync({
				quality: 0.5,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [3, 4],
				base64: true,
				exif: true,
			}).then((res) => {
				if (!res.cancelled) {
					console.log(res.exif)
					setImageUri(res.uri)
					setImage(res.base64)
					setValue("flyer", image)
				}
			})
		}
	}

	const getPhotopermission = async () => {
		return new Promise(async (resolve, reject) => {
			const status = await ImagePicker.getCameraRollPermissionsAsync()
			if (status.granted) return resolve(status.granted)
			if (!status.granted && status.canAskAgain) {
				const result = await ImagePicker.requestCameraRollPermissionsAsync()
				if (!result.granted) {
					Alert.alert(
						"Oh My!",
						"We need your access your photos to upload the fyler",
						[
							{
								text: "ok",
								onPress: () => {
									console.log("pressed")
								},
								style: "default",
							},
						],
						{
							cancelable: true,
							onDismiss: () => {},
						}
					)
				}

				resolve(result.granted)
				return false
			}
		})
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

	const showMap = () => navigation.navigate("map-view")

	return (
		<ScrollView style={{flex: 1}} endFillColor={Colors.primary}>
			{showStart && (
				<DateTimePicker
					testID="dateTimePicker"
					value={new Date()}
					mode="time"
					// is24Hour={true}
					// display="default"
					onChange={(e, d) => {
						onStartChange(e, d)
					}}
				/>
			)}
			{showEnd && (
				<DateTimePicker
					testID="dateTimePicker"
					value={new Date()}
					mode="time"
					// is24Hour={true}
					// display="default"
					onChange={(e, d) => onEndChange(e, d)}
				/>
			)}

			{showDate && (
				<DateTimePicker
					testID="dateTimePicker"
					value={new Date()}
					mode="date"
					// is24Hour={true}
					// display="default"
					onChange={(e, d) => onDateChange(e, d)}
				/>
			)}
			<View bg-background padding-10 paddingB-35>
				<Text imp>Create Event</Text>
				<View marginT-15>
					<TouchableOpacity onPress={() => getFlyer()}>
						<Image
							source={{uri: imageUri}}
							cover
							style={{
								borderWidth: 1,
								borderColor: Colors.primary + 55,
								borderRadius: 7,
								backgroundColor: Colors.backgroundHighlight,
							}}
						/>
						<View
							centerH
							centerV
							paddingV-100
							marginV-10
							row
							style={{
								borderWidth: 1,
								// borderStyle: "dashed",
								borderColor: "black",
								borderRadius: 7,
								backgroundColor: "transparent",
								elevation: 0,
								position: "absolute",
								top: -9,
								left: 0,
								width: "100%",
								height: "100%",
							}}>
							<Icon name="plus" size={30} color={Colors.primary} style={{paddingEnd: 15}} />
							<Text imp1 color={Colors.primary} style={{textTransform: "uppercase"}}>
								upload flyer
							</Text>
						</View>
					</TouchableOpacity>
					{image && (
						<View marginT-10>
							<Button borderRadius={3} style={{width: "50%"}} onPress={() => setImage(null)}>
								<Text>clear image</Text>
							</Button>
						</View>
					)}
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
							Date and time
						</Text>
					</View>
					<View>{errors.date && <ErrorText text={"date " + errors.date.message} />}</View>
					<View>{errors.start && <ErrorText text={"start time " + errors.start.message} />}</View>
					<View>{errors.end && <ErrorText text={"end time " + errors.end.message} />}</View>
					<View
						row
						flex-1
						style={{flexDirection: "row", flexGrow: 1, alignItems: "baseline", justifyContent: "space-between"}}>
						<Controller
							control={control}
							render={({onChange, onBlur, value}) => (
								<TextInput
									ref={setdateRef}
									onBlur={onBlur}
									onFocus={() => setShowDate(true)}
									onChangeText={(value) => onChange(value)}
									value={value}
									style={[style.input, {width: "30%", marginHorizontal: 5}]}
									placeholder="date"
								/>
							)}
							name="date"
							rules={{required: "is required"}}
							defaultValue=""
						/>
						<Controller
							control={control}
							render={({onChange, onBlur, value}) => (
								<TextInput
									ref={setStartRef}
									style={[style.input, {width: "30%", marginHorizontal: 5}]}
									onBlur={onBlur}
									onFocus={() => setShowStart(true)}
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="start time"
								/>
							)}
							name="start"
							rules={{required: "start time is required,"}}
							defaultValue=""
						/>

						<Controller
							control={control}
							render={({onChange, onBlur, value}) => (
								<TextInput
									ref={setendRef}
									style={[style.input, {width: "30%", marginHorizontal: 5, justifyContent: "center"}]}
									onBlur={onBlur}
									onFocus={() => setShowEnd(true)}
									onChangeText={(value) => onChange(value)}
									value={value}
									placeholder="end time"
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
							<TextInput
								onFocus={() => showMap()}
								style={style.input}
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="location"
						rules={{required: "is required"}}
						defaultValue=""
					/>
				</View>
				<View row style={{justifyContent: "space-around"}}>
					<Button
						onPress={() => navigation.navigate("home")}
						bg-primary
						size="large"
						outline
						outlineColor={Colors.primary}
						borderRadius={2}>
						<Text btn color={Colors.primary}>
							Cancel
						</Text>
					</Button>
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
