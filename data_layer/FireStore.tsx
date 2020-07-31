import { observable, action } from 'mobx'
import FBS from './FireBaseClient'
class Store {

    @observable data = []
    @observable userName: string | null = null

    @action isLoggedIn = () => FBS.isLoggedIn()
    @action login = (email: string, password: string) => FBS.login(email, password)
    @action register = (username: string, email: string, password: string) => new Promise((resolve, reject) => {
        FBS.register(username, email, password).then(res => {
            this.userName = username
            resolve(true)
        }).catch(err => reject(err))
    })


    retrieve = {
        isLoggedIn: this.isLoggedIn
    }

    auth = {
        login: this.login,
        register: this.register
    }
}

const FireStore = new Store()
export default FireStore