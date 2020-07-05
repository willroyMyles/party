import {action} from "mobx"
import Fire from "./Firebase"

class FireStore {
	@action signUp = (data: any) => {
		return new Promise((resolve) => {
			Fire.signUp(data)
				.then((res) => {
					if (res) resolve(true)
				})
				.catch((err) => {
					//display correct message
					resolve(false)
				})
		})
	}
}
