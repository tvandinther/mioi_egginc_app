import React, { useState } from "react"
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from "@material-ui/core"
import ContractSoloCalc from "./ContractSoloCalc"

export default function ContractSoloCalcPanel(props) {
	let [expanded, setExpanded] = useState(false)

	return (
		<ExpansionPanel style={props.style} onChange={(evt, expanded) => setExpanded(expanded)} expanded={expanded}>
			<ExpansionPanelSummary>
				<Typography>Solo Contract Calculator</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				{expanded && <ContractSoloCalc contract={props.contract} coop={props.coop}/>}
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}