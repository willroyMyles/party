import {observable, action, autorun} from "mobx"
import * as faker from "faker"
import {FeedItemModel, PartyType} from "../universial/Models"
import moment from "moment"
import Fire from "./FirebaseV2"
import {firestore} from "firebase"
import {threadId} from "worker_threads"
import fireSotreMob from "./FireStore"

const amountForCategory = 50

class Store {
	@observable data: Map<string, FeedItemModel> = new Map()

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

	@action getEventsForCategory = () => {
		return new Promise((resolve) => {
			Fire.getEventsInCategories(amountForCategory)
				.then((res: firestore.QuerySnapshot<firestore.DocumentData> | any) => {
					res.docs.map((value: firestore.DocumentData, index: number) => {
						if (!this.data.has(value.data().reference)) this.data.set(value.data().reference, value.data())
					})
					resolve(true)

					this.updateDataImages()
				})
				.catch((err) => {
					resolve(false)
				})
		})
	}

	updateDataImages = () => {
		this.data.forEach(async (value, key) => {
			const element: FeedItemModel = this.data.get(key)
			if (element.imageUrl == undefined || element.imageUrl == null || element.imageUrl == "") {
				element.imageUrl = await Fire.getURLForEventFlyers(element.flyer || "")
				this.data.set(key, element)
			}
		})
	}

	generateFakeData = () => {
		return new Promise((resolve) => {
			const d = []
			for (let index = 0; index < 13; index++) {
				d.push(faker.image.image())
			}
			resolve(d)
		})
	}
}

const dataProvider = new Store()
export default dataProvider
