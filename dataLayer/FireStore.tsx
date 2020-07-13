import {action, observable} from "mobx"
import Fire from "./Firebase"
import {firestore} from "firebase"
import uiManager from "./UiManager"

class FireStore {
	@observable errorMessageLogin = ""
	@observable errorMessageSignUp = "error"

	@observable temp = ""
	@observable userName = ""
	@action signUp = (data: any) => {
		this.temp = data.username
		return new Promise((resolve) => {
			Fire.signUp(data)
				.then((res) => {
					if (res) {
						resolve(true)
						this.userName = this.temp
						this.temp = ""
						uiManager.userName = this.userName
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
				.then((res) => {
					if (res) resolve(true)
				})
				.catch((err) => {
					//display correct message
					this.errorMessageLogin = err.message
					resolve(false)
				})
		})
	}
}

const fireSotreMob = new FireStore()
export default fireSotreMob
