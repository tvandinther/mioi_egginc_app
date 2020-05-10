import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Input, FormHelperText } from "@material-ui/core"
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

export default function PEInput(props) {
	const classes = useStyle()
	const dispatch = useDispatch()
	var initialValue = Number(props.value) || 0
	let [value, setValue] = useState(Number(initialValue))
	
	useEffect(() => setValue(initialValue), [initialValue])

	const handleBlur = (evt, newValue) => {
		newValue = Number(evt.target.value === "" ? 0 : evt.target.value)
		setValue(newValue)
		dispatch(setMysticalEgg("PROPHECY_EGGS", newValue))
	}

    return (
        <div className={classes.root}>
            <img src={`/images/PROPHECY_EGGS.png`}/>
            <Input
				min={0}
				max={999}
				type="number"
				value={value}
				onChange={(evt) => setValue(evt.target.value)}
				onBlur={handleBlur}
				classes={{input: classes.inputRoot}}
            />
			<FormHelperText> </FormHelperText>
        </div>
    )
}