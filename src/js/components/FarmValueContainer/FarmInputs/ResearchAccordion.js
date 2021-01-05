import React, { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Typography, Divider, Accordion, AccordionSummary, AccordionDetails, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { setResearch } from "../../../actions/farmValueActions.js"
import ResearchInput from "./ResearchInput"
import Loading from "../../Loading"
import research from "../../../tools/research.json"

const useStyle = makeStyles(theme => ({
    panelDetails: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridAutoRows: "auto",
        gridGap: 5,
    },
	panelOverride: {
		paddingLeft: 12,
		paddingRight: 12,
	},
	summary: {
		display: "flex",
		justifyContent: "space-between",
	}
}))

export default function ResearchAccordion(props) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const panelRef = useRef(null)
	const { index, tier, expanded, setExpanded, maxed, setMaxed } = props
	var thisExpanded = expanded === index
	var researchInputs = <Loading/>
	if (thisExpanded) {
		researchInputs = []
		tier.research.forEach((research, index) => {
			researchInputs.push(<Divider key={`divider${index}`}/>)
			researchInputs.push(<ResearchInput key={`research${index}`} tier={tier.tier} research={research} />)
		})
		
	}
	// let tierBreakdown = {}
	// for (let research of tier.research) {
	// 	let level = useSelector(store => {
	// 		//if (tier.tier === "epic") store.farmValue.game.epicResearch[research.id]
	// 		store.farmValue.farm.commonResearch[research.id]
	// 	})
	// 	tierBreakdown[research.id] = level
	// }

	// useEffect(() => {
	// 	let max = true
	// 	for (let [id, level] of Object.entries(tierBreakdown)) {
	// 		if (tier.research.find(research => research.id === id).maxLevel > level) max = false
	// 	}
	// 	if (max) setMaxed(tier.tier)
	// 	console.log("Max? ", max, maxed)
	// }, [tierBreakdown])

	const handleChange = (evt, isExpanded) => {
		if (isExpanded) {
			setExpanded(index)
			// // scrollIntoView doesn't work very well. Can't decide if UX is better with or without
			// var element = panelRef.current
			// element.scrollIntoView()
		}
		else {
			setExpanded(false)
		}
	}

	const handleMax = evt => {
		let researchObject = {}
		if (tier.tier === "epic") {
			for (let research of tier.research) {
				researchObject[research.id] = research.maxLevel
			}
			dispatch(setResearch(researchObject, "epic"))
		}
		else {
			for (let i = 0; i < tier.tier; i++) {
				let tier = research.common[i]
				for (let research of tier.research) {
					researchObject[research.id] = research.maxLevel
				}
			}
			dispatch(setResearch(researchObject))
		}
		setMaxed(tier.tier)
		evt.stopPropagation()
		// setExpanded(index)
	}

	const tierMaxed = false

	return (
		<Accordion key={`panel${index}`} expanded={thisExpanded} onChange={handleChange}>
			<AccordionSummary classes={{content: classes.summary}}>
				<Typography variant="subtitle1">{tier.title}</Typography>
				<Button variant="outlined" disabled={tierMaxed} onClick={handleMax}>{tierMaxed ? "Maxed" : "Max Tier"}</Button>
			</AccordionSummary>
			<AccordionDetails ref={panelRef} className={classes.panelDetails} classes={{root: classes.panelOverride}}>
				{researchInputs}
			</AccordionDetails>
		</Accordion>
	)
}