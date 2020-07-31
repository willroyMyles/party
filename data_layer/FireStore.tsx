import { observable, action } from 'mobx'
import FBS from './FireBaseClient'
class Store {

    @observable data = []

    @action isLoggedIn = () => FBS.isLoggedIn()
    @action login = (email: string, password: string) => FBS.login(email, password)
    @action register = (username: string, email: string, password: string) => FBS.register(username, email, password)


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