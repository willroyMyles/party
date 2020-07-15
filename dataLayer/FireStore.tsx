import {action, observable, autorun} from "mobx"
import Fire from "./FirebaseV2"
import uiManager from "./UiManager"
import {FeedItemModel} from "../universial/Models"
import {AsyncStorage} from "react-native"
import {auth, app} from "firebase"
import {PROVIDER_GOOGLE} from "react-native-maps"
import {GoogleUser} from "expo-google-app-auth"

AsyncStorage.getItem("userId").then((res) => {
	console.log(res)
})

class FireStore {
	@action handleGoogleSignin(result: {
		type: "success"
		accessToken: string | null
		idToken: string | null
		refreshToken: string | null
		user: import("expo-google-app-auth").GoogleUser
	}) {
		return new Promise((resolve) => {
			Fire.HandleGoogleSignIn(result)
				.then((res: GoogleUser | any) => {
					this.setUsernameAndId(res.name, res.id)

					resolve(true)
				})
				.catch((err) => {
					resolve(false)
				})
		})
	}

	setUsernameAndId = (username: string, id: string) => {
		this.userName = username
		this.userId = id
	}
	@observable errorMessageLogin = ""
	@observable errorMessageSignUp = "error"
	@observable errorMessage = "error"

	@observable userId = ""

	@observable temp = ""
	@observable userName = ""

	@observable userImageUri = ""

	@observable user: firebase.UserInfo | any = null

	ou = autorun(() => {
		if (this.user == null) {
			if (Fire.isLoggedIn()) {
				console.log("getting user", Fire.auth.currentUser?.providerData[0])

				this.user = Fire.auth.currentUser?.providerData[0] || null
				this.userName = this.user?.displayName || null
				this.userId = this.user.uid
				this.userImageUri = this.user.photoURL
			}
		} else {
		}
	})

	v = autorun(async () => {
		if (this.userImageUri == "") {
			const img = await AsyncStorage.getItem("userImage")
			this.userImageUri = img || ""
			return
		} else {
			AsyncStorage.setItem("userImage", this.userImageUri)
			return
		}
	})

	un = autorun(async () => {
		if (this.userName == "") {
			const name = await AsyncStorage.getItem("userName")
			this.userName = name || ""
		} else {
			AsyncStorage.setItem("userName", this.userName)
		}
	})

	r = autorun(async () => {
		if (this.userId == "") {
			const id = await AsyncStorage.getItem("userId")
			this.userId = id || ""
			return
		} else {
			AsyncStorage.setItem("userImage", this.userId)
			return
		}
	})

	@action signUp = (data: any) => {
		this.temp = data.username
		return new Promise((resolve) => {
			Fire.signUp(data)
				.then((res: any) => {
					if (res) {
						resolve(true)

						this.setUsernameAndId(this.temp, res)
					}
				})
				.catch((err) => {
					//err = code, message, a
					//display correct message
					this.errorMessageSignUp = err.message
					resolve(false)
				})
		})
	}

	@action signIn = (data: any) => {
		return new Promise((resolve) => {
			Fire.signInWithEmailAndPassword(data)
				.then((res: {name: string; id: string} | any) => {
					if (res) {
						// get username and id
						this.setUsernameAndId(res.name, res.id)
						resolve(true)
					}
				})
				.catch((err) => {
					//display correct message
					this.errorMessageLogin = err.message
					resolve(false)
				})
		})
	}

	@action sendEvent = (data: FeedItemModel) => {
		data.person = this.userName
		data.personId = this.userId
		return new Promise((resolve) => {
			Fire.uploadEvent(data)
				.then((res) => {
					if (res) {
						resolve(true)
					}
				})
				.then((err) => {
					resolve(false)
				})
		})
	}

	@action sendAvatar = (data: any) => {
		data.id = this.userId

		Fire.uploadAvatar(data)
	}
}

const fireSotreMob = new FireStore()
export default fireSotreMob
