import React, { CSSProperties } from "react"
import { convertEpoch, convertSymbol } from "../../../tools/eggincTools"
//@ts-ignore
import { ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css"
import { Typography, Paper, Divider } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import HelpTooltip from "../../Decorator/HelpTooltip"
import { useSelector } from "react-redux"
import useStyle from "./styles"
import { Contract, ContractReward, Coop } from "../../../../types/contract"

function Overlay({ completed }: { completed: boolean | undefined }) {
    const classes = useStyle()
    const theme = useTheme()
    if (completed === undefined) return null
    return (
        <div className={classes.overlay}>
            <Typography 
                variant="h5" 
                align="center"
                style={{
                    color: completed ? theme.palette.success.main : theme.palette.error.main,
                }}
            >{completed ? "Contract Completed!" : "Contract Failed!"}</Typography>
        </div> 
    )
}

export default function CoopExpiryEstimate({ rewards, coop, data, style }: { rewards: ContractReward[], coop?: Coop, data?: any, style?: CSSProperties}) {
    const classes = useStyle()
	const theme = useTheme()
	const hourlyEggLayingRate = useSelector(store => store.settings.hourlyEggLayingRate)
    let totalRate, eggsRemaining, timeLeft
    if (coop) {
        totalRate = coop.members.reduce((acc, member) => acc + member.rate, 0)
        eggsRemaining = (rewards[rewards.length - 1].goal - coop.eggs)
        timeLeft = coop.timeLeft
    }
    else if (data) {
        totalRate = data.layingRate
        eggsRemaining = (rewards[rewards.length - 1].goal - data.eggsLaid)
        timeLeft =  data.timeLeft
    }
    else {
        return null
    }


	let estimate =  eggsRemaining / totalRate
	if (estimate === Infinity) estimate = Number.MAX_SAFE_INTEGER
    let progress = estimate / (estimate + timeLeft) * 100

    let fill = theme.palette.warning.main
    if (progress > 65) fill = theme.palette.error.main
    else if (progress <= 50) fill = theme.palette.success.main
    let completed = undefined
    if (eggsRemaining <= 0) {
        completed = true
        progress = 0
    }
    else if (timeLeft <= 0) {
        completed = false
        progress = 0
	}
	const EPOCH_1_YEAR = 3600 * 24 * 365
    return (
        <Paper style={style} className={classes.expiryEstimate}>
			<div className={classes.mainExpiryEstimate}>
				<Overlay completed={completed}/>
				<Typography variant="body2" className={`${classes.estimate} ${classes.title}`}>
						Completion Estimate <HelpTooltip small helpText="Time to complete final goal at current rate"/>
				</Typography>

				<Typography variant="body2" className={`${classes.expiry} ${classes.title}`}>
					Contract Time Left <HelpTooltip small helpText="Time remaining on contract"/>
				</Typography>

				<div className={classes.divider}/>

				<div className={classes.progress}>
					<ProgressBar height="100%" percent={progress} unfilledBackground={theme.palette.background.off} filledBackground={fill}/>
				</div>
				
				<Typography variant="body2" className={`${classes.estimate} ${classes.value}`}>
					{estimate == Infinity ? "A very long time" : convertEpoch(estimate)}
				</Typography>

				<Typography variant="body2" className={`${classes.expiry} ${classes.value}`}>
					{convertEpoch(timeLeft)}
				</Typography>
				<div style={{clear: "both"}}></div>
			</div>
            {(progress > 50) && <Divider style={{clear: "both"}}/>}
            <Typography align="center" variant="body2" className={classes.tip}>
                {progress > 50 ? `Tip: ${hourlyEggLayingRate ? convertSymbol(eggsRemaining / timeLeft * 3600) + "/hr" : convertSymbol(eggsRemaining / timeLeft) + "/s"} required to reach success threshold.` : null}
            </Typography>
        </Paper>
    )
}