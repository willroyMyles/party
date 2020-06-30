import {observable, action} from "mobx"
import * as faker from "faker"
class Store {
	@observable data: Array<any> = []

	@observable currentEvent: any = {}

	@action generateFakeData = () => {
		this.data = []
		for (let index = 0; index < 5; index++) {
			const element: any = {}

			element.image = faker.image.nightlife()
			element.date = faker.date.future(2, new Date())
			element.title = faker.company.catchPhrase()
			element.hint = faker.lorem.sentence(2)
			element.person = faker.name.findName()
			element.about = faker.lorem.paragraphs(1)
			element.place = faker.address.secondaryAddress()
			this.data.push(element)
			console.log(element.image)
		}
	}
}

const dataProvider = new Store()
export default dataProvider
