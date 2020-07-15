import app, {firestore, auth} from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import {FeedItemModel} from "../universial/Models"

console.ignoredYellowBox = ["Setting a timer"]

const eventCollection = "events"
const userCollection = "users"

class FirebaseStore {
	HandleGoogleSignIn(result: {
		type: "success"
		accessToken: string | null
		idToken: string | null
		refreshToken: string | null
		user: import("expo-google-app-auth").GoogleUser
	}) {
		return new Promise((resolve, reject) => {
			//get crdentials
			const cred = app.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken)

			//sign in and retrive info
			this.auth
				.signInWithCredential(cred)
				.then((res) => {
					//upload new user to database
					this.dataBase
						.doc(`${userCollection}/${result.user.id}`)
						.set({
							email: result.user.email,
							avatar: result.user.photoUrl,
							username: result.user.name,
							provider: "google",
						})
						.then((res) => {
							resolve(result.user)
						})
						.catch((err) => {
							reject(false)
						})
				})
				.catch((err) => {
					reject(false)
				})
		})
	}
	firebaseConfig = {
		apiKey: "AIzaSyBR-UlFdPNUufcwSgUq8eAib_UC7CPQCAQ",
		authDomain: "party-7a1eb.firebaseapp.com",
		databaseURL: "https://party-7a1eb.firebaseio.com",
		projectId: "party-7a1eb",
		storageBucket: "party-7a1eb.appspot.com",
		messagingSenderId: "562995348940",
		appId: "1:562995348940:web:f898483431f9de0633c969",
		measurementId: "G-S6PT28Z9P3",
	}
	appName = "[DEFAULT]"
	auth!: app.auth.Auth
	dataBase!: app.firestore.Firestore
	storage!: app.storage.Storage

	init = () => {
		return new Promise((resolve) => {
			if (app.apps.length > 0) resolve(true)
			else {
				app.initializeApp(this.firebaseConfig)
				this.auth = app.auth()
				this.dataBase = app.firestore()
				this.storage = app.storage()
				resolve(true)
			}
		})
	}

	constructor() {
		if (app.apps.length > 0) {
			//initialized already
		} else {
			app.initializeApp(this.firebaseConfig)
		}
		this.auth = app.auth()
		this.dataBase = app.firestore()
		this.storage = app.storage()
	}

	doStuff = () => {}

	signInWithEmailAndPassword = ({email, password}: {email: string; password: string}) => {
		return new Promise((resolve, reject) => {
			this.init()
			this.auth
				.signInWithEmailAndPassword(email, password)
				.then((res) => {
					resolve({name: res.user?.displayName, id: res.user?.uid})
				})
				.catch((err) => {
					console.log("error will robinson", err)
					reject(err)
				})
		})
	}

	isLoggedIn = () => {
		this.init()
		console.log(this.auth.currentUser)

		return this.auth.currentUser != null
	}

	signUp = ({email, password, username}: {email: string; password: string; username: string}) => {
		return new Promise((resolve, reject) => {
			this.auth
				.createUserWithEmailAndPassword(email, password)
				.then((res) => {
					const data = {email: email, username: username}

					this.dataBase
						.collection(userCollection)
						.add(data)
						.then((res) => {
							resolve(res.id)
						})
						.catch((err) => {
							console.log("database error", err)
						})
				})
				.catch((err) => {
					reject(err)
				})
		})
	}

	uploadPhoto = (data: FeedItemModel) => {
		return new Promise(async (resolve) => {
			const filename = data.flyer?.substring(data.flyer?.lastIndexOf("/") + 1)

			const response = await fetch(data.flyer || "")
			const blob = await response.blob()

			const operation = this.storage.ref(`images/flyers/${filename}`)

			operation
				.put(blob)
				.then((res) => {
					// resolve( true )
					resolve(operation.fullPath)
				})
				.catch((err) => {
					resolve(false)
				})
		})
	}

	uploadEvent = (data: FeedItemModel) => {
		return new Promise((resolve, reject) => {
			this.uploadPhoto(data).then((res) => {
				if (res) {
					// successful upload of image
					this.dataBase
						.collection(eventCollection)
						.add(data)
						.then((res) => {
							resolve(true)

							//should update user
							//should update array
							this.updateUserEvents(true, res.id, data.personId || "")
						})
						.catch((err) => {
							reject(false)
						})
				} else {
					reject(false)
				}
			})
		})
	}

	updateUserEvents = (add: boolean, eventId: string, personId: string) => {
		if (add) {
			this.dataBase
				.doc(`${userCollection}/${personId}`)
				.set({events: firestore.FieldValue.arrayUnion(eventId)}, {merge: true})
		} else {
			this.dataBase.doc(`${userCollection}/${personId}`).set({events: firestore.FieldValue.arrayRemove(eventId)})
		}
	}

	uploadAvatar = (data: any) => {
		return new Promise(async (resolve) => {
			console.log(data)

			const filename = data.avatar.substring(data.avatar.lastIndexOf("/") + 1)
			const oldFilename = data.old.substring(data.old.lastIndexOf("/") + 1)

			const response = await fetch(data.avatar || "")
			const blob = await response.blob()
			this.storage
				.ref(`images/avatars/${oldFilename}`)
				.delete()
				.then((res) => {
					console.log("success")
				})
				.catch((err) => {
					console.log("error", err)
				})
			const operation = this.storage.ref(`images/avatars/${filename}`)

			operation
				.put(blob)
				.then((res) => {
					// resolve( true )
					resolve(operation.fullPath)
					this.dataBase.doc(`${userCollection}/${data.id}`).update({avatar: operation.fullPath})
				})
				.catch((err) => {
					resolve(false)
				})
		})
	}
}

const Fire = new FirebaseStore()

export default Fire
