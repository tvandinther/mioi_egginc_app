import React, { useState, useEffect } from "react"
import { setContractCalcParameter } from "../../../actions/contractActions"
import { convertSymbol, getRewardDetails } from "../../../tools"
import { makeStyles } from "@material-ui/core/styles"
import ImageDropdown from "../../ImageDropdown"
import { useDispatch } from "react-redux"

const useStyle = makeStyles(theme => ({
	selector: {
        width: "100%",
        overflow: "hidden",
    },
    selectorItem: {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridGap: 5,
        alignItems: "center",
    },
    image: {
        height: 36,
        width: "auto",
    },
}))

export default function ContractTargetInput(props) {
	const { contract } = props
	const classes = useStyle()
	const dispatch = useDispatch()
	let [selected, setSelected] = useState()
	let [open, setOpen] = useState()
	const initialValue = contract.goals.elite[contract.goals.elite.length - 1].goal

	useEffect(() => {
		dispatch(setContractCalcParameter("target", initialValue))
	}, [initialValue])

	const eliteGoals = {
		title: "Elite",
		items: contract.goals.elite.map(target => ({
			title: convertSymbol(target.goal),
			imageSrc: getRewardDetails(target).path,
			value: target.goal,
		})),
	}

	const standardGoals = {
		title: "Standard",
		items: contract.goals.standard.map(target => ({
			title: convertSymbol(target.goal),
			imageSrc: getRewardDetails(target).path,
			value: target.goal,
		})),
	}

	return (
		<ImageDropdown
			initialValue={initialValue}
			menuMap={[eliteGoals, standardGoals]}
			dispatchFunc={(value) => setContractCalcParameter("target", value)}
		/>
	)
}