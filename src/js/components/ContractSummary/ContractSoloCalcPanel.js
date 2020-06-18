import React, { useState } from "react"
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core"
import ContractSoloCalc from "./ContractSoloCalc"
import ReactGA from "react-ga"

export default function ContractSoloCalcPanel(props) {
	let [expanded, setExpanded] = useState(false)

	const handleChange = (evt, expanded) => {
		setExpanded(expanded)
		ReactGA.event({
			category: "Interaction",
			action: "Solo Contract Calculator " + (expanded ? "Expanded" : "Collapsed")
		})
	}

	return (
		<ExpansionPanel style={props.style} onChange={(evt, expanded) => setExpanded(expanded)} expanded={expanded}>
			<ExpansionPanelSummary>
				<Typography>Contract Calculator</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				{expanded && <ContractSoloCalc contract={props.contract} coop={props.coop}/>}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}