import fireSotreMob from "./FireStore"
import * as Google from "expo-google-app-auth"

export const SignInWithGoogle = async () => {
	return new Promise(async (resolve) => {
		try {
			const result = await Google.logInAsync({
				androidClientId: "562995348940-uh15ratmr7ct4hcmogvc0k1tpf15i24s.apps.googleusercontent.com",
				// iosClientId: IOSClientId,
				scopes: ["profile", "email"],
			})
			if (result.type === "success") {
				fireSotreMob.handleGoogleSignin(result).then((res) => {
					if (res) {
						resolve(true)
					} else {
						resolve(false)
					}
				})
			} else {
				//canceled or something
			}
		} catch ({message}) {
			alert("login: Error:" + message)
		}
	})
}
