import React, { CSSProperties, useState } from "react"
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core"
import ContractSoloCalc from "./ContractSoloCalc"
import ReactGA from "react-ga"
import { Contract, Coop } from "../../../types/contract"

export default function ContractSoloCalcPanel({ style, contract, coop }: { style: CSSProperties, contract: Contract, coop: Coop }) {
	let [expanded, setExpanded] = useState(false)

	const handleChange = (evt: React.ChangeEvent, expanded: boolean) => {
		setExpanded(expanded)
		ReactGA.event({
			category: "Interaction",
			action: "Solo Contract Calculator " + (expanded ? "Expanded" : "Collapsed")
		})
	}

	return (
		<Accordion style={style} onChange={(evt, expanded) => setExpanded(expanded)} expanded={expanded}>
			<AccordionSummary>
				<Typography>Contract Calculator</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{expanded && <ContractSoloCalc contract={contract} coop={coop}/>}
			</AccordionDetails>
		</Accordion>
	)
}