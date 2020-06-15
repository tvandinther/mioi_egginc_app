import React from "react"
import { Typography, Tooltip } from "@material-ui/core"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { getRewardDetails, convertSymbol } from "../../tools/eggincTools"

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		flex: "1 1 0px",

		"& > *": {
			margin: 2,
			flexGrow: 1,
		}
	},
	rewardSet: {
		marginTop: 5,
		

		"& .header": {
			paddingLeft: 5,
			backgroundColor: theme.palette.grey[700],
			color: theme.palette.getContrastText(theme.palette.grey[700]),
		}
	},
	quantityText: {
		...theme.typography.h6,
		marginLeft: 5,
	},
	reward: {
        display: "flex",
		margin: "5px 0px",
        gridTemplateColumns: "auto 1fr",
    },
    rewardIcon: {
        width: "32px",
        height: "32px",
    }
}))

export default function ContractCardRewards(props) {
	const classes = useStyle()
	const goals = props.goals
	if (goals.standard !== undefined) {
		return (
			<div className={classes.root}>
				<RewardSet goalSet={goals.standard} title="Standard"/>
				<RewardSet goalSet={goals.elite} title="Elite"/>
			</div>
		)
	}
	return (
		<div className={classes.root}>
			<RewardSet goalSet={goals} title="Standard & Elite"/>
		</div>
	)
}

function RewardSet(props) {
	const classes = useStyle()
	const { goalSet, title } = props
	const rewards = goalSet.map((reward, index) => <RewardItem key={index} reward={reward}/>)
	return (
		<div className={classes.rewardSet}>
			<Typography className="header" color="textSecondary" variant="subtitle2">{title}</Typography>
			{rewards}
		</div>
	)
}

function RewardItem(props) {
	const classes = useStyle()
	const { goal } = props.reward
    const { path, quantity } = getRewardDetails(props.reward)
    return (
		<Tooltip title={convertSymbol(goal)} placement="left" arrow>
			<div className={classes.reward}>
				<img className={classes.rewardIcon} src={path}></img>
				<span className={classes.quantityText}>{quantity}</span>
			</div>
		</Tooltip>
    )
}

// <Typography variant="h6">{quantity}</Typography>