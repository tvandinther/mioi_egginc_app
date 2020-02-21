import React from "react"
import DashboardCard from "./DashboardCard"
import PlayerIDInput from "../appSettings/PlayerIDInput"
import { Typography } from "@material-ui/core"

export default function PlayerIDPromptCard(props) {


    return (
        <DashboardCard>
            <Typography variant="h5">
                Welcome to mioi.io's Egg, Inc. companion app
            </Typography>
            <br/>
            <Typography variant="body1">
                The dashboard shows you all of the information you need at a glance. To get you the tailored information you're after, enter your PlayerID below. 
            </Typography>
            <br/>
            <Typography variant="body2">
                The PlayerID will be saved on the device you're viewing this on.
            </Typography>
            <PlayerIDInput/>
        </DashboardCard>
    )
}