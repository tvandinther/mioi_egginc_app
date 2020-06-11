import React from "react"
import { convertEpoch, convertSymbol } from "../../../tools/eggincTools"
import { ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css"
import { Typography, Paper, Divider } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import HelpTooltip from "../../Decorator/HelpTooltip"

const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        border: 1,
        borderStyle: "none",
        borderColor: theme.palette.grey[300],
        borderRadius: 10,
		margin: "10px 0px",
		display: "block",
	},
	main: {
		position: "relative",
		borderRadius: "inherit",
	},
    divider: {
		position: "absolute",
		width: 2,
		height: "100%",
		left: "calc(50% - 1px)",
        zIndex: 10,
        backgroundColor: theme.palette.secondary.main,
        boxShadow: theme.shadows[4],
    },
    progress: {
		clear: "both",
        height: 30,

        "& div": {
            borderRadius: "unset !important",

            "& div": {
                borderRadius: "unset !important",
            }
        }
	},
    estimate: {
		textAlign: "left",
		float: "left",
		maxWidth: "45%",
        marginLeft: 10,
    },
    expiry: {
		textAlign: "right",
		float: "right",
		maxWidth: "45%",
        marginRight: 10,
	},
	title: {
		
	},
	value: {
		
	},
    overlay: {
		position: "absolute",
		display: "grid",
		alignItems: "center",
		height: "100%",
		width: "100%",
        borderRadius: "inherit",
        backgroundColor: theme.palette.background.offOverlay,
        zIndex: 99,
	},
	tip: {
		clear: "both",
	}
}))

function Overlay(props) {
    const classes = useStyle()
    const theme = useTheme()
    if (props.completed === undefined) return null
    return (
        <div className={classes.overlay}>
            <Typography 
                variant="h5" 
                align="center"
                style={{
                    color: props.completed ? theme.palette.success.main : theme.palette.error.main,
                }}
            >{props.completed ? "Contract Completed!" : "Contract Failed!"}</Typography>
        </div> 
    )
}

export default function CoopExpiryEstimate(props) {
    const classes = useStyle()
	const theme = useTheme()
	const rewards = props.rewards
    let totalRate, eggsRemaining, timeLeft
    if (props.coop) {
        totalRate = props.coop.members.reduce((acc, member) => acc + member.rate, 0)
        eggsRemaining = (rewards[rewards.length - 1].goal - props.coop.eggs)
        timeLeft = props.coop.timeLeft
    }
    else if (props.data) {
        totalRate = props.data.layingRate
        eggsRemaining = (rewards[rewards.length - 1].goal - props.data.eggsLaid)
        timeLeft =  props.data.timeLeft
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
    let completed
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
        <Paper style={props.style} className={classes.root}>
			<div className={classes.main}>
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
					{estimate > EPOCH_1_YEAR ? "A very long time" : convertEpoch(estimate)}
				</Typography>

				<Typography variant="body2" className={`${classes.expiry} ${classes.value}`}>
					{convertEpoch(timeLeft)}
				</Typography>
				<div style={{clear: "both"}}></div>
			</div>
            {(progress > 50) && <Divider style={{clear: "both"}}/>}
            <Typography align="center" variant="body2" className={classes.tip}>
                {progress > 50 ? `Tip: ${convertSymbol(eggsRemaining / timeLeft)}/s required to reach success threshold.` : null}
            </Typography>
        </Paper>
    )
}