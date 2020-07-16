import {observable, action} from "mobx"
import * as faker from "faker"
import {FeedItemModel, PartyType} from "../universial/Models"
import moment from "moment"
import Fire from "./FirebaseV2"
import {firestore} from "firebase"
class Store {
	@observable data: Map<string, any> = new Map()

	@observable currentEvent: any = {}

	@action getDataFromServerBasedOnSection = (section: number) => {
		return new Promise((resolve) => {})
	}

	@action getEvents = () => {
		return new Promise((resolve) => {
			Fire.getEventsInMultiplies(1)
				.then((res: firestore.QuerySnapshot<firestore.DocumentData> | any) => {
					res.docs.map((value: firestore.DocumentData, index: number) => {
						this.data.set(value.data().reference, value.data())
					})
					resolve(true)
				})
				.catch((err) => {
					resolve(false)
				})
		})
	}

	@action generateFakeData = () => {
		return new Promise((resolve) => {
			// this.data = new Map()
			// for (let index = 0; index < 15; index++) {
			// 	const element: FeedItemModel = {}

			// 	element.flyer = faker.image.image()
			// 	element.date = faker.date.future(2, new Date())
			// 	element.title = faker.company.catchPhrase()
			// 	element.hint = faker.lorem.sentence(2)
			// 	element.person = faker.name.findName()
			// 	element.description = faker.lorem.paragraphs(3)
			// 	element.location = [faker.address.latitude(), faker.address.longitude()]
			// 	element.reference = faker.random.alphaNumeric(9)
			// 	element.admission = Number.parseInt(faker.finance.amount(3000, 10000))
			// 	element.start = moment(faker.date.future().getDate()).format("h:mm a")
			// 	element.end = moment(faker.date.future().getDate()).format("h:mm a")
			// 	element.partyType = faker.random.number(13)
			// 	this.data.set(element.reference, element)
			// }
			resolve(true)
		})
	}
}

const dataProvider = new Store()
export default dataProvider
