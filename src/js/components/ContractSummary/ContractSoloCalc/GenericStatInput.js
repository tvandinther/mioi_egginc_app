import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Input } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { setContractCalcParameter } from "../../../actions/contractActions"
import TextMask from "../../TextMask"

const useStyle = makeStyles(theme => ({
	input: {
		textAlign: "right",
		paddingRight: 24,
	},
}))

export default function GenericStatInput(props) {
	const classes = useStyle()
	const initialValue = props.value || 0
	const directive = props.directive || (() => {})
	const name = props.name
	const dispatch = useDispatch()
	const data = useSelector(store => directive(store))
	// const playerContractFarm = useSelector(store => store.playerData.farmsList.find(item => item.contractId === contract.name))
	let [value, setValue] = useState(data || initialValue)

	const handleBlur = (evt, newValue) => {
		dispatch(setContractCalcParameter(name, newValue))
	}

	useEffect(() => {
		handleBlur(undefined, value)
	}, [])

	return (
		<TextMask
			value={value}
			onBlur={handleBlur}
			fullWidth
			classes={{"input": classes.input}}
		>
			{Input}
		</TextMask>
	)
}