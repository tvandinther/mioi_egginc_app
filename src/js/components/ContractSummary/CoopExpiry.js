import React from "react"
import { convertEpoch } from "../../tools/eggincTools"
import { Typography, CircularProgress } from "@material-ui/core"

export default function CoopExpiry(props) {
    let string = null
    let color = "initial"
    console.log(props)
    let progress = (props.timeLeft / props.duration) * -100
    
    if (props.timeLeft) {
        if (props.timeLeft <= 0) {
            string = `Contract Expired!`
            color = "error"
            progress = "completed"
        }
        else {
            string = `Expires in ${convertEpoch(props.timeLeft)}`
        }
    }
    if (string) return (
        <div style={{display: "flex"}}>
            <CircularProgress thickness={5} variant="static" value={progress} />
            <Typography variant="subtitle1" color={color}>{string}</Typography>
        </div>
    )
    else return null
}