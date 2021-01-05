import { ContractGoals, ContractReward, Coop } from "./contract"

export function isContractGoals(goals: ContractGoals | ContractReward[]): goals is ContractGoals {
	return  (
		goals !== undefined &&
		(goals as ContractGoals).standard !== undefined &&
		(goals as ContractGoals).elite !== undefined
	)
}

export function isCoop(coop: Coop | undefined): coop is Coop {
	return (
		coop !== undefined &&
		(coop as Coop).fetched !== undefined &&
		(coop as Coop).coop !== undefined
	)
}