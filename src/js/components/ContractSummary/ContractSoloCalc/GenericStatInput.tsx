import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Input} from "@material-ui/core"
import {setContractCalcParameter} from "../../../actions/contractActions"
import TextMask from "../../TextMask"
import useStyle from "./styles"

export default function GenericStatInput(props: any) {
	const classes = useStyle()
	const initialValue = props.value || 0
	const directive = props.directive || (() => {
	})
	const name = props.name
	const dispatch = useDispatch()
	const data = useSelector(store => directive(store))
	// const playerContractFarm = useSelector(store => store.playerData.farms.find(item => item.contractId === contract.name))
	let [value, setValue] = useState(data || initialValue)

	const handleBlur = (evt: any, newValue: any) => {
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
			aria-label={name}
		>
			{Input}
		</TextMask>
	)
}