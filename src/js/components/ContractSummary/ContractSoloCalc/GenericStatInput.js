import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Input } from "@material-ui/core"
import { setContractCalcParameter } from "../../../actions/contractActions"
import TextMask from "../../TextMask"

export default function GenericStatInput(props) {
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
		>
			{Input}
		</TextMask>
	)
}