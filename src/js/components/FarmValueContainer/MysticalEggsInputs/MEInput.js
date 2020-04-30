import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Input } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { setMysticalEgg } from "../../../actions/farmValueActions"

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

	const handleBlur = evt => {
		let value = evt.target.value === "" ? "" : Number(evt.target.value)
		setValue(value)
		dispatch(setMysticalEgg(type, value))
	}

    return (
        <div className={classes.root}>
            <img src={`/images/${type}.png`}/>
            <Input
                min={0}
				type="number"
				value={value}
				onChange={(evt) => setValue(evt.target.value)}
				onBlur={handleBlur}
            />
        </div>
    )
}