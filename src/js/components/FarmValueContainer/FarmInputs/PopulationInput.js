import React, { useState, useEffect } from "react"
import { Input, Slider, FormControlLabel, Switch } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { setPopulation } from "../../../actions/farmValueActions"
import { convertSymbol } from "../../../tools/eggincTools"
import HeadedCard from "../../HeadedCard"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        gridGap: 10,
        alignItems: "center",
        justifyItems: "center",
		gridTemplateColumns: "1fr",
		padding: "10px 30px",
    },
    input: {
		width: "180px",
	},
	inputRoot: {
		textAlign: "center",
	}
}))

export default function PopulationInput(props) {
    const maxHabCapacity = useSelector(store => store.farmValue.stats.maxHabCapacity)
    const classes = useStyle()
	const dispatch = useDispatch()
    const initialValue = useSelector(store => store.farmValue.farm.numChickens)

	let [value, setValue] = useState(initialValue)
	let [maxLock, setMaxLock] = useState(false)
	useEffect(() => setValue(initialValue), [initialValue])
	useEffect(() => {
		if (value > maxHabCapacity || maxLock) setValue(maxHabCapacity)
	}, [maxHabCapacity, maxLock])

    const handleInputChange = evt => {
        setValue(evt.target.value === "" ? "" : Number(evt.target.value))
    }

    const handleBlur = evt => {
        let currentValue = value
        if (value < 0 || value == "") {
            currentValue = 0
        }
        else if (value > maxHabCapacity) {
            currentValue = maxHabCapacity
        }
        setValue(currentValue)
        submitChange(currentValue)
    }

    const submitChange = (currentValue) => {
		maxLock = (currentValue == maxHabCapacity)
        dispatch(setPopulation(currentValue))
	}

    return (
        <HeadedCard collapsable title="Chicken Population" className={classes.root}>
			<Slider
				key="slider"
				value={Number(value) || 0}
				onChange={(evt, newValue) => setValue(Math.round(newValue))}
				onChangeCommitted={(evt, newValue) => submitChange(Math.round(newValue))}
				min={0}
				max={maxHabCapacity}
				color="secondary"
				marks={[{value: 0, label: 0}, {value: maxHabCapacity, label: convertSymbol(maxHabCapacity)}]}
			/>
			<Input
				key="input"
				classes={{input: classes.inputRoot}}
				className={classes.input}
				onChange={handleInputChange}
				onBlur={handleBlur}
				value={value}
			/>
			<FormControlLabel
				control={
					<Switch
						checked={maxLock}
						onChange={evt => setMaxLock(evt.target.checked)}
						name="atMaxCheck"
						color="secondary"
					/>
				}
				label="Lock at Max"
			/>
        </HeadedCard>
    )
}