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
import {getPermissionsAsync} from "expo-location"

export const getImage = (quality?: number) => {
	return new Promise((resolve) => {
		getPhotopermission().then((result) => {
			if (result) {
				ImagePicker.launchImageLibraryAsync({
					quality: quality ? quality : 0.5,
					mediaTypes: ImagePicker.MediaTypeOptions.Images,
					aspect: [3, 4],
					base64: true,
					exif: true,
				}).then((res) => {
					resolve(res)
				})
			}
		})
	})
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
							onPress: () => {},
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
