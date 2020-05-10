import React, { useEffect } from "react"
import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import { timeConvert, contractTimeSoloEstimate } from "../../../tools"

export function SoloCalcResults(props) {
	const parameters = useSelector(store => store.contract.contractCalc)
	const time = contractTimeSoloEstimate(parameters)
	var timeString
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

	return (
		<Typography align="center" variant="h6">{timeString}</Typography>
	)
}