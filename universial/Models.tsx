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
	image?: string
	date?: Date
	title?: string
	hint?: string
	person?: string
	about?: string
	location?: string
	reference?: string
	time?: string
	partyType?: PartyType

	admission?: number
}
