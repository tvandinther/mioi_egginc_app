import React, { useState, useEffect } from "react"
import { Select, MenuItem, Typography, ListSubheader, Divider } from "@material-ui/core"
import { setContractCalcParameter } from "../../../actions/contractActions"
import { convertSymbol, getImageSrc } from "../../../tools"
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

	let options = []
	for (let [key, targets] of Object.entries(contract.goals)) {
		options.push(
			<ListSubheader
				key={key}
				unselectable="true"
			>
				{key}
			</ListSubheader>
		)
		options.push(<Divider/>)
		for (let target of targets) {
			const { goal } = target
			options.push(
				<MenuItem key={`rewardSelection${key}${goal}`} value={goal} className={classes.selectorItem}>
					<img src={getImageSrc(target).path} className={classes.image}/>
					<Typography>{convertSymbol(goal)}</Typography>
				</MenuItem>
			)
		}
	}

	const handleChange = evt => {
		let value = evt.target.value
		if (value === undefined) {
			return
		}
        setSelected(value)
        dispatch(setValue(value))
    }

	const handleOpen = evt => {
		setOpen(true)
	}

	const handleClose = evt => {
		if (evt.target.getAttribute("unselectable") === "true") {
			return
		}
		setOpen(false)
	}

	const eliteGoals = {
		title: "Elite",
		items: contract.goals.elite.map(target => ({
			title: convertSymbol(target.goal),
			imageSrc: getImageSrc(target).path,
			value: target.goal,
		})),
	}

	const standardGoals = {
		title: "Standard",
		items: contract.goals.standard.map(target => ({
			title: convertSymbol(target.goal),
			imageSrc: getImageSrc(target).path,
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

	return (
		<Select
			value={selected}
			open={open}
			onOpen={handleOpen} 
			onChange={handleChange} 
			onClose={handleClose}
			className={classes.selector}
			classes={{select: classes.selectorItem}}
		>
			{options}
		</Select>
	)
}