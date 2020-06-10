import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Input } from "@material-ui/core"
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
	},
	inputRoot: {
		textAlign: "center",
	},
}))

export default function SEInput(props) {
	const classes = useStyle()
	const dispatch = useDispatch()
	var initialValue = Number(props.value) || 0
	let [value, setValue] = useState(Number(initialValue))
	
	useEffect(() => setValue(initialValue), [initialValue])

	const handleBlur = (evt, newValue) => {
		newValue = isNaN(newValue) ? evt.target.value : newValue
		let value = Number(newValue)
		setValue(value)
		dispatch(setMysticalEgg("SOUL_EGGS", value))
	}
	
    return (
        <div className={classes.root}>
            <img src={`/images/SOUL_EGGS.png`}/>
            <TextMask
				value={value}
				classes={{input: classes.inputRoot}}
				onBlur={handleBlur}
				helptext="e.g. 123,456 or 123.456T"
			>
				{Input}
			</TextMask>
        </div>
    )
}