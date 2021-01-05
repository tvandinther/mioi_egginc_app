import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Card, IconButton, Typography} from "@material-ui/core"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ReactGA from "react-ga"
import {useDispatch, useSelector} from "react-redux"
import {setCollapsedCard} from "../actions/appActions"
import {composeClassNames} from "../tools";

const useStyle = makeStyles(theme => ({
	card: {},
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

interface Props {
	children: any;
	style?: React.CSSProperties;
	className?: string;
	hoverable?: boolean;
	collapsable?: boolean;
	cardID: string;
	title?: string;
}

export default function HeadedCard(props: Props) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const hoverable = props.hoverable || false
	const collapsable = props.collapsable || false
	const cardState = useSelector(store => store.app.cardStates[props.cardID]) || {}
	let [raised, setRaised] = useState(false)
	let [collapsed, setCollapsed] = useState(cardState.collapsed || false)

	const toggleRaised: React.MouseEventHandler = () => {
		if (hoverable) setRaised(!raised)
	}

	const toggleCollapsed: React.MouseEventHandler = () => {
		if (collapsable) {
			setCollapsed(!collapsed)
			dispatch(setCollapsedCard(!collapsed, props.cardID))
			ReactGA.event({
				category: "Interaction",
				action: !collapsed ? "Card Collapsed" : "Card Expanded",
				label: props.cardID,
			})
		}
	}

	return (
		<Card style={props.style} raised={hoverable && raised} onMouseOver={toggleRaised} onMouseOut={toggleRaised}
			  className={`${classes.card}`}>
			<div className={classes.header} onClick={toggleCollapsed}
				 style={{cursor: collapsable ? "pointer" : undefined}}>
				<Typography className={classes.title} variant="h5" align="center"
							style={{color: "white"}}>{props.title}</Typography>
				{collapsable &&
				<IconButton className={`${classes.collapseButton} ${collapsed ? classes.iconCollapsed : ''}`}
							style={{color: "white"}} aria-label={collapsed ? "Expand Card" : "Collapse Card"}>
					<ExpandLessIcon/>
				</IconButton>}
			</div>
			<div
				className={composeClassNames(collapsed ? classes.bodyHidden : "", props.className ?? "", classes.cardBody)}>
				{props.children}
			</div>
		</Card>
	)
}