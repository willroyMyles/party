export enum PartyType {
	STAGE_SHOW,
	CARNIVAL,
	CLUB,
	LAWN_DANCE,
	STREET_DANCE,
	CHILL_SPOTS,
	HOUSE_PARTY,
	BAR,
	DANCEHALL,
	OLD_HITS,
	ROUND_ROBIN,
	AFTER_WORK_JAM,
	WATER_PARTY,
	SOCA,
}

export interface FeedItemModel {
	flyer?: string

	flyerBase64?: string
	date?: Date
	description?: string
	title?: string
	hint?: string
	person?: string
	location?: Object
	reference?: string
	start?: string
	end?: string
	partyType?: PartyType

	admission?: number
}
