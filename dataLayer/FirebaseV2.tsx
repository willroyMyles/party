import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import {FeedItemModel} from "../universial/Models"
import fireSotreMob from "./FireStore"

console.ignoredYellowBox = ["Setting a timer"]

const eventCollection = "events"
const userCollection = "users"

class FirebaseStore {
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
					//TODO should redirect
				})
				.catch((err) => {
					console.log("error will robinson", err)
					reject(err)
				})
		})
	}

	isLoggedIn = () => {
		this.init()
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
							this.dataBase.doc(`${userCollection}/${fireSotreMob.userId}`).set({events: [res.id]}, {merge: true})
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

	testAdd = () => {
		this.init()
		this.dataBase
			.collection("user")
			.add({
				name: "willroy",
				age: 23,
				title: "a demi god!",
			})
			.then((res) => {
				console.log(res)
			})
	}
}

const Fire = new FirebaseStore()

export default Fire
