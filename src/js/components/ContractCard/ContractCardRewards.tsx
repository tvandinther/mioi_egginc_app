import React from "react"
import { Typography, Tooltip } from "@material-ui/core"
import { getRewardDetails, convertSymbol } from "../../tools/eggincTools"

import useStyle from "./styles"
import { ContractReward, ContractGoals } from "../../../types/contract"
import { isContractGoals } from "../../../types/typeGuards"

export default function ContractCardRewards(props: {goals: ContractGoals | ContractReward[]}) {
	const classes = useStyle()
	const goals = props.goals
	
	if (isContractGoals(goals)) {
		return (
			<div className={classes.reward}>
				<RewardSet goalSet={goals.standard} title="Standard"/>
				<RewardSet goalSet={goals.elite} title="Elite"/>
			</div>
		)
	}
	return (
		<div className={classes.reward}>
			<RewardSet goalSet={goals} title="Standard & Elite"/>
		</div>
	)
}

function RewardSet(props: {goalSet: ContractReward[], title: string}) {
	const classes = useStyle()
	const { goalSet, title } = props
	const rewards = goalSet.map((reward: any, index: any) => <RewardItem key={index} reward={reward}/>)
	return (
		<div className={classes.rewardSet}>
			<Typography className="header" color="textSecondary" variant="subtitle2">{title}</Typography>
			{rewards}
		</div>
	)
}

function RewardItem(props: {key: number, reward: ContractReward}) {
	const classes = useStyle()
	const { goal } = props.reward
    const { path, quantity } = getRewardDetails(props.reward)
    return (
		<Tooltip title={convertSymbol(goal)} placement="left" arrow>
			<div className={classes.rewardItem}>
				<img className={classes.rewardIcon} src={path}></img>
				<span className={classes.quantityText}>{quantity}</span>
			</div>
		</Tooltip>
    )
}