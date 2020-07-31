import { observable, action } from 'mobx'
import FBS from './FireBaseClient'
class Store {

    @observable data = []

    @action isLoggedIn = () => FBS.isLoggedIn()


    retrieve = {
        isLoggedIn: this.isLoggedIn
    }
}

const FireStore = new Store()
export default FireStore