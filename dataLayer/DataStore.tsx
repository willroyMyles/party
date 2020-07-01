import {observable, action} from "mobx"
import * as faker from "faker"
import {FeedItemModel} from "../universial/Models"
class Store {
	@observable data: Map<string, any> = new Map()

	@observable currentEvent: any = {}

	@action generateFakeData = () => {
		return new Promise((resolve) => {
			this.data = new Map()
			for (let index = 0; index < 5; index++) {
				const element: FeedItemModel = {}

				element.image = faker.image.image()
				element.date = faker.date.future(2, new Date())
				element.title = faker.company.catchPhrase()
				element.hint = faker.lorem.sentence(2)
				element.poster = faker.name.findName()
				element.about = faker.lorem.paragraphs(1)
				element.location = faker.address.secondaryAddress()
				element.reference = faker.random.alphaNumeric(9)
				this.data.set(element.reference, element)
			}
			resolve(true)
		})
	}
}

const dataProvider = new Store()
export default dataProvider
