import React from "react"
import { convertEpoch, convertSymbol } from "../../../tools/eggincTools"
import { ProgressBar } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css"
import { Typography, Paper, Divider } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        border: 1,
        borderStyle: "none",
        borderColor: theme.palette.grey[300],
        borderRadius: 10,
        display: "grid",
        margin: "10px 0px",
        gridTemplateColumns: "1fr 2px 1fr",
        gridTemplateRows: "auto 30px auto",
        gridTemplateAreas: `
            "estimateTitle dividerTop expiryTitle"
            "progress progress progress"
            "estimateValue dividerBottom expiryValue"
            "note note note"
        `
    },
    divider: {
        gridColumn: "dividerTop / dividerBottom",
        gridRow: "dividerTop / dividerBottom",
        zIndex: 10,
        backgroundColor: theme.palette.secondary.main,
        boxShadow: theme.shadows[4],
    },
    progress: {
        gridArea: "progress",
        height: "100%",

        "& div": {
            borderRadius: "unset !important",

            "& div": {
                borderRadius: "unset !important",
            }
        }
    },
    estimate: {
        textAlign: "left",
        marginLeft: 10,
    },
    expiry: {
        textAlign: "right",
        marginRight: 10,
    },
    overlay: {
        gridColumn: "1 / -1",
        gridRow: "1 / -1",
        borderRadius: "inherit",
        backgroundColor: theme.palette.background.offOverlay,
        zIndex: 99,
        display: "grid",
        alignItems: "center",
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
    let totalRate, eggsRemaining, timeLeft
    if (props.coop) {
        totalRate = props.coop.members.reduce((acc, member) => acc + member.rate, 0)
        eggsRemaining = (props.contract.rewards[props.contract.rewards.length - 1].goal - props.coop.eggs)
        timeLeft = props.coop.timeLeft
    }
    else if (props.data) {
        totalRate = props.data.layingRate
        eggsRemaining = (props.contract.rewards[props.contract.rewards.length - 1].goal - props.data.eggsLaid)
        timeLeft =  props.data.timeLeft
    }
    else {
        return null
    }


    let estimate =  eggsRemaining / totalRate
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

    return (
        <Paper style={props.style} className={classes.root}>
            <Overlay completed={completed}/>
            <Typography variant="body2" className={classes.estimate} style={{gridArea: "estimateTitle"}}>
                    Estimate
            </Typography>

            <Typography variant="body2" className={classes.estimate} style={{gridArea: "estimateValue"}}>
                {convertEpoch(estimate)}
            </Typography>

            <div className={classes.divider}/>

            <div className={classes.progress}>
                <ProgressBar height="100%" percent={progress} unfilledBackground={theme.palette.background.off} filledBackground={fill}/>
            </div>

            <Typography variant="body2" className={classes.expiry} style={{gridArea: "expiryTitle"}}>
                Time Left
            </Typography>

            <Typography variant="body2" className={classes.expiry} style={{gridArea: "expiryValue"}}>
                {convertEpoch(timeLeft)}
            </Typography>

            {(progress > 50) && <Divider/>}
            <Typography align="center" variant="body2" style={{gridArea: "note"}}>
                {progress > 50 ? `Tip: ${convertSymbol(eggsRemaining / timeLeft)}/s required to reach success threshold.` : null}
            </Typography>
        </Paper>
    )
}