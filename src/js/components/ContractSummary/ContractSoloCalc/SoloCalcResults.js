import React, { useEffect } from "react"
import { Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useSelector } from "react-redux"
import { timeConvert, contractTimeSoloEstimate, convertSymbol } from "../../../tools"

export function SoloCalcResults(props) {
	const parameters = useSelector(store => store.contract.contractCalc)
	let [time, warning] = contractTimeSoloEstimate(parameters)
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
	if (warning) {
		if (warning.type === "maxPopulation") {
			warning.text = <Typography>Your farm's <strong>max hab capacity</strong> is limiting your completion time! You need a max hab capacity of at least <strong>{convertSymbol(warning.value)}</strong> to maintain full pace.</Typography>
		}
		else if (warning.type === "shippingRate") {
			warning.text = <Typography>Your farm's <strong>shipping capacity</strong> is limiting your completion time! You need a shipping capacity of at least <strong>{convertSymbol(warning.value)}</strong> to maintain full pace.</Typography>
		}
	}

	return (
		<div>
			{warning && <Alert severity="warning">{warning.text}</Alert>}
			<Typography align="center" variant="h6">{timeString}</Typography>
		</div>
	)
}