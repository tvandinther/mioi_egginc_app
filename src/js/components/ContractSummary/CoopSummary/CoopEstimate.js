import React from "react"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { convertEpoch } from "../../../tools/eggincTools"

export default function CoopEstimate(props) {
    const theme = useTheme()
    const timeStringStyle = {
        fontWeight: "bold",
        color: null,
    }
    if (props.coop && props.coop.fetched && !props.coop.error) {
        let totalRate = props.coop.members.reduce((acc, member) => acc + member.rate, 0)
        let eggsRemaining = (props.contract.rewards[props.contract.rewards.length - 1].goal - props.coop.eggs)
        let epochTime =  eggsRemaining / totalRate
        let timeString = convertEpoch(epochTime)
        let auxString = " left until completion at the current laying rate."
        if (epochTime < props.coop.timeLeft || eggsRemaining <= 0) {
            if (eggsRemaining <= 0) {
                timeString = "Contract Completed!"
                auxString = null
            }
            timeStringStyle.color = theme.palette.success.dark
        }
        else {
            timeStringStyle.color = theme.palette.error.dark
        }
        return (
            <Typography align="center"><span style={timeStringStyle}>{timeString}</span>{auxString}</Typography>
        )
    }
    else {
        return null
    }
}