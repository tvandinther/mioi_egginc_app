import React from "react"
import HeadedCard from "../../HeadedCard"
import { NavLink } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { QuickLinkCardProps } from "../../../../types/dashboard"

export default function QuickLinkCard(props: QuickLinkCardProps) {
    return (
		<NavLink to={props.link} style={{height: "fit-content"}}>
			<HeadedCard cardID={`link_${props.link}`} hoverable title="Link">
				<Typography variant="h3" align="center">{props.title}</Typography>
				<br/>
				<Typography variant="body1">{props.body}</Typography>
				{props.imgSrc && <img src={props.imgSrc}></img>}
			</HeadedCard>
		</NavLink>
	)
}