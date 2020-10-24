export interface Contract {
	boostTokenInterval: number,
	coopAllow: boolean,
	coopSize: number,
	description: string,
	duration: number,
	egg: number,
	goals: ContractGoals | ContractReward[],
	name: string,
	rewards: ContractReward,
	serveUntil: number,
	title: string,
	validUntil: number,
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