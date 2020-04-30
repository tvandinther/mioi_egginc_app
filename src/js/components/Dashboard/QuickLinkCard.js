import React from "react"
import HeadedCard from "../HeadedCard"
import { NavLink } from "react-router-dom"
import { Typography } from "@material-ui/core"

export default function QuickLinkCard(props) {
    return (
        <HeadedCard hoverable title="Link">
			<NavLink to={props.link} style={{height: "fit-content"}}>
				<Typography variant="h3" align="center">{props.title}</Typography>
				<br/>
				<Typography variant="body1">{props.body}</Typography>
				{props.imgSrc && <img src={props.imgSrc}></img>}
			</NavLink>
		</HeadedCard>
    )
}