import { Contract } from "./contract";

export default interface PlayerDataRedux {
	approxTime: number,
	contracts: {
		contractsList: PlayerDataContract[]
	},
	error: boolean,
	farmsList: any[],
	fetched: boolean,
	fetching: boolean,
	game: any,
	stats: any,
	userId: string,
	userName: string,
}

export interface PlayerDataContract {
	accepted: boolean,
	contract: {
		identifier: string,
		lengthSeconds: number,
	},
	coopIdentifier: string | null,
	league: number,
	timeAccepted: number,
}