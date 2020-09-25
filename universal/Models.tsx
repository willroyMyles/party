
export enum PartyType {
	STAGE_SHOW = 0,
	CARNIVAL = 1,
	CLUB = 2,
	LAWN_DANCE = 3,
	STREET_DANCE = 4,
	CHILL_SPOTS = 5,
	HOUSE_PARTY = 6,
	BAR = 7,
	DANCEHALL = 8,
	OLD_HITS = 9,
	ROUND_ROBIN = 10,
	AFTER_WORK_JAM = 11,
	WATER_PARTY = 12,
	SOCA = 13,
}

export interface FeedItemModel {
	flyer?: string
	title?: string
	description?: string

	imageUrl?: string
	flyerBase64?: string
	date?: string
	hint?: string
	person?: string
	personId?: string
	location?: string
	reference?: string
	start?: string
	duration?: number
	partyType?: PartyType

	admission?: number

	timeStamp?: Date

	priority: number | 0,

	rating: number | 0,
	attendance : number | 0
}

export interface UserDatabaseModel {
	email: string
	userName: string
	flyers: FeedItemModel[] | null
	rsvpParties: string[]
}
