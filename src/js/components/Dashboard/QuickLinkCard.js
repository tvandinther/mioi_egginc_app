import React from "react"
import DashboardCard from "./DashboardCard"
import { NavLink } from "react-router-dom"
import { Typography } from "@material-ui/core"

export default function QuickLinkCard(props) {


    return (
        <NavLink to={props.link} style={{height: "fit-content"}}>
            <DashboardCard hoverable title="Link">
                <Typography variant="h3" align="center">{props.title}</Typography>
                <br/>
                <Typography variant="body1">{props.body}</Typography>
                {props.imgSrc && <img src={props.imgSrc}></img>}
            </DashboardCard>
        </NavLink>
    )
}