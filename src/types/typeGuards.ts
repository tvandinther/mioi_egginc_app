import { ContractGoals, ContractReward } from "./contract"

export function isContractGoals(goals: ContractGoals | ContractReward[]): goals is ContractGoals {
	return (goals as ContractGoals).standard !== undefined && (goals as ContractGoals).elite !== undefined
}