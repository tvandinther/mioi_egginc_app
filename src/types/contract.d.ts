export interface Contract {
	boostTokenInterval: number,
	coopAllow: boolean,
	coopSize: number,
	description: string,
	duration: number,
	egg: number,
	goals: ContractGoals | ContractReward[],
	name: string,
	rewards: ContractReward[],
	serveUntil: number,
	title: string,
	validUntil: number,
}

export interface MetaContract {
	accepted: boolean,
	contract: {
		identifier: string,
		lengthSeconds: number,
	},
	coopIdentifier: string | null,
	league: number,
	timeAccepted: number,
}

export interface ContractGoals {
	standard: ContractReward[],
	elite: ContractReward[],
}

export interface ContractReward {
	difficulty: number,
	goal: number,
	quantity: number,
	subtype: string | undefined,
	type: string,
}

export interface Coop {
	contract: string,
	contractLink: Contract,
	coop: string,
	eggs: number,
	error: any,
	fetched: boolean,
	fetching: boolean,
	league: string,
	members: Member[],
	public: boolean | null,
	timeLeft: number,
	totalRate: number,
}

export interface Member {
	active: boolean,
	boostTokens: number,
	eggs: number,
	name: string,
	rate: number,
	soulPower: number,
}