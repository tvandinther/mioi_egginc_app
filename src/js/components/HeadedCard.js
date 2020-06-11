import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Card, Typography, IconButton } from "@material-ui/core"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ReactGA from "react-ga"

const useStyle = makeStyles(theme => ({
    card: {
        
	},
    header: {
        backgroundColor: theme.palette.primary.main,
		height: 32,
		display: "grid",
		gridTemplateColumns: "32px 1fr 32px",
		gridTemplateAreas: `
			"left center right"
		`,
	},
	title: {
		gridArea: "center",
		userSelect: "none",
	},
	collapseButton: {
		gridArea: "right",
		padding: "unset",
		transition: "all 200ms ease"
	},
	iconCollapsed: {
		transform: "rotate(180deg)",
	},
    cardBody: {
		padding: 10,
		transition: "all 500ms ease",
	},
	bodyHidden: {
		height: 0,
		paddingTop: "0px !important",
		paddingBottom: "0px !important",
	}
}))

export default function DashboardCard(props) {
    const classes = useStyle()
	const hoverable = props.hoverable || false
	const collapsable = props.collapsable || false
	let [raised, setRaised] = useState(false)
	let [collapsed, setCollapsed] = useState(false)

	const toggleRaised = hoverable ? () => {
        setRaised(!raised)
	} : null
	
	const toggleCollapsed = collapsable ? () => {
		setCollapsed(!collapsed)
		ReactGA.event({
			category: "Interaction",
			action: !collapsed ? "Card Collapsed" : "Card Expanded",
			label: props.title,
		})
	} : null

    return (
        <Card style={props.style} raised={hoverable && raised} onMouseOver={toggleRaised} onMouseOut={toggleRaised} className={`${classes.card}`}>
            <div className={classes.header} onClick={toggleCollapsed} style={{cursor: collapsable ? "pointer" : null}}>
                <Typography className={classes.title} variant="h5" align="center" style={{color: "white"}}>{props.title}</Typography>
				{collapsable && <IconButton className={`${classes.collapseButton} ${collapsed ? classes.iconCollapsed : ''}`} style={{color: "white"}} aria-label={collapsed ? "Expand Card" : "Collapse Card"}>
					<ExpandLessIcon/>
				</IconButton>}
            </div>
            <div className={`${collapsed ? classes.bodyHidden : ''} ${props.className} ${classes.cardBody}`}>
                {props.children}
            </div>
        </Card>
    )
}