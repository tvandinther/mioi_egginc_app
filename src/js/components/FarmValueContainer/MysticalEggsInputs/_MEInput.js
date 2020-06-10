import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { TextField } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { setMysticalEgg } from "../../../actions/farmValueActions"
import TextMask from "../../TextMask"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr",
        alignItems: "center",
        justifyItems: "center",

        "& >img": {
            width: 100,
            height: "auto",
        }
    }
}))

export default function MEInput(props) {
    const { type } = props
	const classes = useStyle()
	const dispatch = useDispatch()
	var initialValue = Number(props.value) || 0
	let [value, setValue] = useState(Number(initialValue))
	
	useEffect(() => setValue(initialValue), [initialValue])

	const handleBlur = (evt, newValue) => {
		newValue = isNaN(newValue) ? evt.target.value : newValue
		let value = Number(newValue)
		setValue(value)
		dispatch(setMysticalEgg(type, value))
	}
	var AlteredInput = () => (
		<Input
				min={0}
				max={999}
				type="number"
				value={value}
				onChange={(evt) => setValue(evt.target.value)}
				onBlur={(evt) => {
					let newValue = Number(evt.target.value === "" ? 0 : evt.target.value)
					setValue(newValue)
					dispatch(setMysticalEgg(type, newValue))
				}}
            />
	)
	if (type === "SOUL_EGGS") {
		AlteredInput = () => (
			<TextMask
				value={value}
				onBlur={handleBlur}
				helpText="e.g. 123,456 or 123.456T"
			>
				{Input}
			</TextMask>
		)
	}
    return (
        <div className={classes.root}>
            <img src={`/images/${type}.png`}/>
            <AlteredInput/>
        </div>
    )
}