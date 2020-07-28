import {action, observable, autorun, computed} from "mobx"
import Fire from "./FirebaseV2"
import uiManager from "./UiManager"
import {FeedItemModel} from "../universial/Models"
import {AsyncStorage, ImageURISource} from "react-native"
import {auth, app} from "firebase"
import {PROVIDER_GOOGLE} from "react-native-maps"
import {GoogleUser} from "expo-google-app-auth"
import {eventEmitter, eventStrings} from "../universial/EventEmitter"
import dataProvider from "./DataStore"

class FireStore {
	@observable errorMessageLogin = ""
	@observable errorMessageSignUp = "error"
	@observable errorMessage = "error"

	@observable userId = Fire.auth.currentUser?.uid

	@observable userName = Fire.auth.currentUser?.displayName

	@observable userImageUri: any = Fire.auth.currentUser?.photoURL

	@observable user: firebase.UserInfo | any = Fire.auth.currentUser

	@observable eventImagesMap: Map<string, any[]> = new Map()

	@observable numberOfImages = 0

	@observable rsvpParties: string[] = []

	@action signUp = (data: any) => {
		return new Promise((resolve) => {
			Fire.signUp(data)
				.then((res) => {
					if (res) {
						resolve(true)
						this.setUpUser()
					}
				})
				.catch((err) => {
					this.errorMessageSignUp = err.message
					resolve(false)
				})
		})
	}

	private setUpUser() {
		this.user = Fire.auth.currentUser
		this.userId = Fire.auth.currentUser?.uid
		this.userName = Fire.auth.currentUser?.displayName
		this.userImageUri = Fire.auth.currentUser?.photoURL
	}

	@action signIn = (data: any) => {
		return new Promise((resolve) => {
			Fire.signInWithEmailAndPassword(data)
				.then((res: {name: string; id: string} | any) => {
					if (res) {
						// get username and id
						this.setUpUser()
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

	@action logOut = () => {
		return new Promise((resolve) =>
			Fire.logOut().then((res) => {
				if (res) {
					resolve(true)
					this.setUpUser()
				} else resolve(false)
			})
		)
	}

	@action private sendEvent = (data: FeedItemModel) => {
		data.person = this.userName || ""
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

	@action private sendAvatar = (data: any) => {
		data.id = this.userId

		Fire.uploadAvatar(data)
	}

	@action private uploadPictureToEvent = (ref: string, imageUrl: string) => {
		return new Promise((resolve) => {
			Fire.uploadPhotoToEvent(ref, imageUrl).then((res) => {
				if (res) {
					resolve(true)
				} else {
					resolve(false)
				}
			})
		})
	}

	@action private picturesForEvent = (reference: string, initialUpdate: boolean = false) => {
		this.numberOfImages = 0

		if (!initialUpdate && this.eventImagesMap.has(reference)) {
			return new Promise((resolve) => resolve(true))
		}

		return new Promise<boolean>((resolve) => {
			Fire.getPicturesForEvent(reference)
				.then((res) => {
					if (res) {
						this.eventImagesMap.set(reference, res)

						resolve(true)
					}
				})
				.catch((err) => resolve(false))
		})
	}

	@action addToPinnedParty = (reference: string) => {
		return Fire.uploadRsvpEvent(reference, true).then((res: boolean | any) => {
			if (res) {
				this.rsvpParties.push(reference)
			}
			return res
		})
	}
	@action getRsvpEvents = () =>
		new Promise((resolve) => {
			if (fireSotreMob.userId) {
				this.rsvpParties = []
				Fire.getRsvpEvents(fireSotreMob.userId).then((res: string[]) => {
					this.rsvpParties.push(...res)
					resolve(true)
				})
			}
		})

	@action removeRsvp = (id: string) =>
		new Promise((resolve) => {
			if (Fire.isLoggedIn()) {
				Fire.uploadRsvpEvent(id, false).then((res) => {
					resolve(res)
				})
			}
		})

	send = {
		PictureToEvent: this.uploadPictureToEvent,
		Avater: this.sendAvatar,
		Event: this.sendEvent,
		RSVPEvent: this.addToPinnedParty,
	}

	retrieve = {
		picturesForEvent: this.picturesForEvent,
		rsvpEvents: this.getRsvpEvents,
	}

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
					this.setUpUser()

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

	@action isLoggedIn = () => {
		return Fire.isLoggedIn()
	}
}

const fireSotreMob = new FireStore()
export default fireSotreMob
