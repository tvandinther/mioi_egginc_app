import React, { useEffect } from "react"
import { Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useSelector } from "react-redux"
import { timeConvert, contractTimeSoloEstimate, convertSymbol } from "../../../tools"
import { useParams } from "react-router-dom"

export function SoloCalcResults() {
	let parameters = useSelector(store => store.contract.contractCalc)
	const { contractId } = useParams<{contractId: string}>()
	const coop = useSelector(store => store.contract.coops[contractId])
	const groupCalc = useSelector(store => store.contract.contractCalc.groupCalc)
	const memberCount = coop.fetched ? coop.members.length : coop.contractLink.coopSize
	let groupParameters = { ...parameters }
	if (groupCalc) { // TO DO: Create validation for group parameters
		//@ts-ignore
		groupParameters.hatchRate *= memberCount
		//@ts-ignore
		groupParameters.layingRate *= memberCount
		//@ts-ignore
		groupParameters.shippingRate *= memberCount
		//@ts-ignore
		groupParameters.maxShippingRate *= memberCount
		//@ts-ignore
		groupParameters.population *= memberCount
		//@ts-ignore
		groupParameters.maxPopulation *= memberCount
	}
	let [time, warning] = contractTimeSoloEstimate(groupCalc? groupParameters : parameters)
	let timeString
	if (isNaN(time)) {
		timeString = 'Never'
	}
	else if (time > 60 * 24 * 7 * 52) {
		timeString = 'Forever'
	}
	else if (time <= 0)	{
		timeString = 'Completed'
	}
	else {
		timeString = "Roughly " + timeConvert(time, "s")
	}
	let warningText: JSX.Element | undefined
	if (warning) {
		if (warning.type === "maxPopulation") {
			warningText = <Typography>Your farm's <strong>max hab capacity</strong> is limiting your completion time! You need a max hab capacity of at least <strong>{convertSymbol(warning.value)}</strong> to maintain full pace.</Typography>
		}
		else if (warning.type === "shippingRate") {
			warningText = <Typography>Your farm's <strong>shipping capacity</strong> is limiting your completion time! You need a shipping capacity of at least <strong>{convertSymbol(warning.value)}</strong> to maintain full pace.</Typography>
		}
	}

	return (
		<div>
			<Typography align="center" variant="subtitle1">Time remaining assuming {groupCalc ? "group" : "solo"} progress using the variables below:</Typography>
			{warning && <Alert severity="warning">{warningText}</Alert>}
			<Typography align="center" variant="h6">{timeString}</Typography>
		</div>
	)
}