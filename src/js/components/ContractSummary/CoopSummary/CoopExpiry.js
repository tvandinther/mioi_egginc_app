import React from "react"
import { convertEpoch } from "../../../tools/eggincTools"
import { Typography, LinearProgress } from "@material-ui/core"

export default function CoopExpiry(props) {
    const coop = props.coop
    let string = null
    let color = "initial"
    let progress = (props.timeLeft / props.duration) * -100
    
    if (coop.timeLeft) {
        if (false && coop.timeLeft <= 0) {
            string = `Contract Expired!`
            color = "error"
        }
        else {
            string = `Time left: ${convertEpoch(coop.timeLeft)}`
        }
    }
    if (string) return (
        <div style={{display: "flex"}}>
            {false && <LinearProgress variant="determinate" value={progress} style={{width: "100%", height: "2rem"}}/>}
            <Typography align="center" variant="subtitle1" color={color}>{string}</Typography>
        </div>
    )
    else return null
}