import { Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"

export const getImage = (quality?: number) => {
	return new Promise<ImagePicker.ImagePickerResult>((resolve) => {
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
	return new Promise(async (resolve) => {
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
							onPress: () => { },
							style: "default",
						},
					],
					{
						cancelable: true,
						onDismiss: () => { },
					}
				)
			}

			resolve(result.granted)
			return false
		}
	})
}
