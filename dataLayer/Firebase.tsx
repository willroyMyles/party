import app from "firebase/app"
import "firebase/auth"

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

	init = () => {
		if (app.apps.length > 0) return
		else {
			app.initializeApp(this.firebaseConfig)
			this.auth = app.auth()
		}
	}

	constructor() {
		if (app.apps.length > 0) {
			//initialized already
		} else {
			app.initializeApp(this.firebaseConfig)
		}
		this.auth = app.auth()
		console.log("inited")
	}

	doStuff = () => {}

	signInWithEmailAndPassword = ({email, password}: {email: string; password: string}) => {
		this.init()
		this.auth
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log("error will robinson", err)
			})
	}

	isLoggedIn = () => {
		this.init()
		console.log(this.auth.currentUser?.email)
	}

	signUp = ({email, password}: {email: string; password: string}) => {
		// this.init()
		// console.log(email, password)
		return new Promise((resolve, reject) => {
			this.auth
				.createUserWithEmailAndPassword(email, password)
				.then((res) => {
					resolve(true)
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
}

const Fire = new FirebaseStore()

export default Fire
