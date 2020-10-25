
export enum PartyType {
	LOUNGE = 0,
	WATER_PARTY = 1,
	CLUB = 2,
	OUTDOOR = 3,
}

export interface FeedItemModel {
	flyer?: string
	title?: string
	description?: string

	imageUrl?: string
	flyerBase64?: string
	date?: Date
	hint?: string
	person?: string
	personId?: string
	location?: string
	locationObject: GeoCodeModel
	reference?: string
	start?: Date
	duration?: number
	partyType?: PartyType

	admission?: number

	timeStamp?: Date

	priority: number | 0,

	rating: number | 0,
	attendance : number | 0
	dateNum : number | 0
}

export interface UserDatabaseModel {
	email: string
	userName: string
	flyers: FeedItemModel[] | null
	rsvpParties: string[]
}

export interface GeoCodeModel
{
	city: string
	country: string
	isoCountryCode: string
	name: string
	postalCode: string
	region: string
	street: string
}
