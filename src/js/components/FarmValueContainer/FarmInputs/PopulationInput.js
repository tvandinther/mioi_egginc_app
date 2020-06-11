import React, { useState, useEffect } from "react"
import { Slider, FormControlLabel, Switch, Input } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { setPopulation } from "../../../actions/farmValueActions"
import { convertSymbol } from "../../../tools/eggincTools"
import HeadedCard from "../../HeadedCard"
import TextMask from "../../TextMask"

const useStyle = makeStyles(theme => ({
    root: {
		display: "flex",
		flexDirection: "column",
        gridGap: 10,
        alignItems: "center",
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

    const handleInputChange = (evt, newValue) => {
        setValue(newValue)
    }

    const handleBlur = (evt, newValue) => {
		let currentValue = value
		newValue = isNaN(newValue) ? evt.target.value : newValue
        if (newValue < 0 || newValue == "") {
            currentValue = 0
        }
        else if (newValue > maxHabCapacity) {
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
			<TextMask
				key="input"
				classes={{input: classes.inputRoot}}
				className={classes.input}
				onChange={handleInputChange}
				onBlur={handleBlur}
				value={value}
				helpText="e.g. 123,456 or 123.456T"
				aria-label="Farm Population"
			>
				{Input}
			</TextMask>
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