import React from "react"
import { Select } from "@material-ui/core"

export default function ContractTargetInput(props) {
	const { contract } = props
	let options = []
	
	options.push(
		<MenuItem key={`rewardSelection${index}`} value={index} className={classes.selectorItem}>
			<img src={`/images/egg${farm.eggType}.png`} className={classes.image}/>
			<Typography>{name}</Typography>
		</MenuItem>
	)

	return (
		<Select>

		</Select>
	)
}