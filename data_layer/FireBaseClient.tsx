
import auth from '@react-native-firebase/auth'
class Store {

    isLoggedIn = () => auth().currentUser == undefined



}

const FBS = new Store()
export default FBS