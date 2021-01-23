export default interface PlayerDataRedux {
	approxTime: number,
	contracts: {
		contracts: PlayerDataContract[]
	},
	error: boolean,
	farms: any[],
	fetched: boolean,
	fetching: boolean,
	game: any,
	stats: any,
	gameServicesId: string,
	eiUserId: string,
	userName: string,
}

export interface PlayerDataContract {
	accepted: boolean,
	contract: {
		id: string,
		lengthSeconds: number,
	},
	coopId: string | null,
	league: number,
	timeAccepted: number,
}