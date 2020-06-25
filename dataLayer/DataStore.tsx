import {observable, action} from "mobx"
import faker from "faker"
class Store {
	@observable data: Array<any> = []

	@action generateFakeData = () => {
		for (let index = 0; index < 5; index++) {
			const element: any = {}

			element.image = faker.image.nightlife()
			element.date = faker.date.future(2, new Date())
			element.title = faker.company.catchPhrase()
			element.hint = faker.lorem.sentence(2)
			this.data.push(element)
		}
	}
}

const dataProvider = new Store()
export default dataProvider
