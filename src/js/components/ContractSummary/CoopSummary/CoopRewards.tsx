import React, {CSSProperties} from "react"
import {makeStyles, useTheme} from "@material-ui/core/styles"
import "react-step-progress-bar/styles.css"
//@ts-ignore
import {ProgressBar, Step} from "react-step-progress-bar"
import {convertSymbol, getRewardDetails, percentString} from "../../../tools/eggincTools"
import {Paper, Tooltip} from "@material-ui/core"
import {useSelector} from "react-redux"
import {ContractReward} from "../../../../types/contract"

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",

		"& div.RSPBprogressBarText": {
			color: theme.palette.getContrastText(theme.palette.background.off),
		}
	},
	wrap: {
		margin: "10px 20px",
		borderRadius: 10,
	},
}))

export default function CoopRewards({ eggsLaid=0, rewards, style }: { eggsLaid?: number, rewards: ContractReward[], style?: CSSProperties }) {
	const theme = useTheme()
	const classes = useStyle()
	const detailedRewardsBar = useSelector(store => store.settings.detailedRewardsBar)
	
	function getSteps(rewardArray: ContractReward[], totalEggs: number) {
		return rewardArray.map((reward, index) => {
			return (
				<Step key={index} transition="scale">
					{({ accomplished, index }: { accomplished: boolean, index: number }) => {
						let greyFilter = accomplished ? null : "grayscale(0.7)"
						let shadow = accomplished ? "drop-shadow(0px 0px 3px rgba(0, 200, 0, 0.8))" : null
						const stepStyle: CSSProperties = {
							filter: ["drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4))", greyFilter].join(" "),
							transform: accomplished ? "scale(1.2)" : undefined,
							pointerEvents: "none",
						}
						
						return (
							<Tooltip 
								arrow
								title={`${percentString(totalEggs / reward.goal, 0, true)} completed`} 
								placement="top"
								enterTouchDelay={300}
								leaveTouchDelay={5000}
							>
								<div>
									<img width={40} src={getRewardDetails(reward).path} style={stepStyle}></img>
								</div>
							</Tooltip>
						)
					}}
				</Step>
			)
		})
	}

	const RewardBar = ({ eggsLaid, rewards, detailed=false, key }: { eggsLaid: number, rewards: ContractReward[], detailed?: boolean, key?: number }) => {
		const finalGoal = rewards[rewards.length - 1].goal
		let progress = Math.min(Math.max(0, eggsLaid / finalGoal * 100), 100)    

		// const fill = `linear-gradient(to right, #5498ff, #ff5454)`
		const fill =`linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`
		const steps = getSteps(rewards, eggsLaid)

		const Wrapper = !detailed ? Tooltip : ({ children }: { children: JSX.Element}) => <div>{children}</div>

		return (
			<Wrapper arrow data-testid="rewards-bar" title={`${convertSymbol(eggsLaid)}/${convertSymbol(finalGoal)}`}
					 enterTouchDelay={300} leaveTouchDelay={5000}>
				<Paper elevation={4} className={classes.wrap}>
					<ProgressBar
						height={20}
						percent={progress}
						unfilledBackground={theme.palette.background.off}
						filledBackground={fill}
						stepPositions={rewards.map(reward => reward.goal / finalGoal * 100)}
						text={detailed && `${convertSymbol(eggsLaid)}/${convertSymbol(finalGoal)}`}
					>
						{steps}
					</ProgressBar>
				</Paper>
			</Wrapper>
		)
	}

	let progressBars
	if (detailedRewardsBar) {
		progressBars = rewards.map((reward: ContractReward, index: number) => <RewardBar detailed rewards={[reward]} eggsLaid={eggsLaid} key={index}/>)
	}
	else {
		progressBars = <RewardBar rewards={rewards} eggsLaid={eggsLaid}/>
	}

    return (
		<div className={classes.root} style={style}>
			{progressBars}
		</div>
	)
}