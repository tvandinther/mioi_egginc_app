import React, { useState, useRef } from "react"
import research from "../../../tools/research.json"
import { Typography, Divider, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core"
import ResearchInput from "./ResearchInput"
import { makeStyles } from "@material-ui/core/styles"
import HeadedCard from "../../HeadedCard"
import Loading from "../../Loading"

const useStyle = makeStyles(theme => ({
    panelDetails: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gridAutoRows: "auto",
        gridGap: 5,
    },
    header: {
        padding: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
	},
	panelOverride: {
		paddingLeft: 12,
		paddingRight: 12,
	}
}))

export default function ResearchTierPanels(props) {
	const classes = useStyle()
	let researchTiers = Array.from(research.common)
	researchTiers.push(research.epic)
	let [expanded, setExpanded] = useState(false)

	function ResearchExpansionPanel(props) {
		const panelRef = useRef(null)
		const { index, tier, expanded, setExpanded } = props
		var thisExpanded = expanded === index
		var researchInputs = <Loading/>
		if (thisExpanded) {
			researchInputs = []
			tier.research.forEach((research, index) => {
				researchInputs.push(<Divider key={`divider${index}`}/>)
				researchInputs.push(<ResearchInput key={`research${index}`} tier={tier.tier} research={research} />)
			})
			
		}

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

		return (
			<ExpansionPanel key={`panel${index}`} expanded={thisExpanded} onChange={handleChange}>
				<ExpansionPanelSummary>
					<Typography variant="subtitle1">{tier.title}</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails ref={panelRef} className={classes.panelDetails} classes={{root: classes.panelOverride}}>
					{researchInputs}
				</ExpansionPanelDetails>
			</ExpansionPanel>
		)
	}

	const expansionPanels = researchTiers.map((tier, index) => <ResearchExpansionPanel key={index} index={index} tier={tier} expanded={expanded} setExpanded={setExpanded}/>)

    return (
        <div>
            <HeadedCard title="Research" className={classes.header}>
                <Typography variant="subtitle1">Select a tier to change research</Typography>
            </HeadedCard>
            {expansionPanels}
        </div>
    )
}