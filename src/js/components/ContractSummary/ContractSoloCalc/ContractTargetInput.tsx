import React, { useState, useEffect } from "react"
import { setContractCalcParameter } from "../../../actions/contractActions"
import { convertSymbol, getRewardDetails } from "../../../tools"
import ImageDropdown, { MenuMap, MenuMapItem } from "../../ImageDropdown"
import { useDispatch } from "react-redux"
import useStyle from "./styles"
import { Contract } from "../../../../types/contract"
import { isContractGoals } from "../../../../types/typeGuards"

export default function ContractTargetInput({ contract }: { contract: Contract }) {
	const classes = useStyle()
	const dispatch = useDispatch()
	let [selected, setSelected] = useState()
	let [open, setOpen] = useState()
	
	let initialValue: number
	let eliteGoals: MenuMapItem
	let standardGoals: MenuMapItem
	let goals: MenuMapItem
	let menuMap: MenuMap

	if (isContractGoals(contract.goals)) {
		initialValue = contract.goals.elite[contract.goals.elite.length - 1].goal

		eliteGoals = {
			title: "Elite",
			items: contract.goals.elite.map(target => ({
				title: convertSymbol(target.goal),
				imageSrc: getRewardDetails(target).path,
				value: target.goal,
			})),
		}
	
		standardGoals = {
			title: "Standard",
			items: contract.goals.standard.map(target => ({
				title: convertSymbol(target.goal),
				imageSrc: getRewardDetails(target).path,
				value: target.goal,
			})),
		}

		menuMap = [eliteGoals, standardGoals]
	}
	else {
		initialValue = contract.goals[contract.goals.length - 1].goal

		goals = {
			title: "Goals",
			items: contract.goals.map(target => ({
				title: convertSymbol(target.goal),
				imageSrc: getRewardDetails(target).path,
				value: target.goal,
			})),
		}

		menuMap = [goals]
	}

	useEffect(() => {
		dispatch(setContractCalcParameter("target", initialValue))
	}, [initialValue])
	
	return (
		<ImageDropdown
			initialValue={initialValue}
			menuMap={menuMap}
			dispatchFunc={(value: number) => setContractCalcParameter("target", value)}
		/>
	)
}