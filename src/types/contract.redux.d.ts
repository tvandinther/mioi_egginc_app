import { Coop, Contract } from "./contract";

export default interface ContractRedux {
	activeContracts: ActiveContracts,
	contractCalc: ContractCalc,
	coopSearch: {
		[key: string]: CoopSearch,
	}
	coops: {
		[key: string]: Coop,
	},
	playerCoops: {
		[key: string]: Coop
	}
}

export interface ActiveContracts {
	fetched: boolean,
	fetching: boolean,
	contracts: {
		[key: string]: ContractState,
	}
}

export interface ContractState extends Contract {
	coopSearch: any,
}

export interface ContractCalc {
	groupCalc: boolean,
	ignoreHabCapacity: boolean,
	ignoreShippingCapacity: boolean,
	hatchRate?: number,
	layingRate?: number,
	shippingRate?: number,
	maxShippingRate?: number,
	population?: number,
	maxPopulation?: number,
}

export interface CoopSearch {
	disabled: boolean,
	failedSearches: string[],
	searchFailed: boolean,
	searchString: string,
}