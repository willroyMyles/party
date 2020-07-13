import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

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

	init = () => {
		return new Promise((resolve) => {
			if (app.apps.length > 0) resolve(true)
			else {
				app.initializeApp(this.firebaseConfig)
				this.auth = app.auth()
				this.dataBase = app.firestore()
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

	signUp = ({email, password}: {email: string; password: string}) => {
		return new Promise((resolve, reject) => {
			this.auth
				.createUserWithEmailAndPassword(email, password)
				.then((res) => {
					console.log(res)

					resolve(true)
				})
				.catch((err) => {
					reject(err)
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
