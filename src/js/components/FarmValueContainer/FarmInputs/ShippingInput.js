import React, { useState, useEffect } from "react"
import HeadedCard from "../../HeadedCard"
import { Input } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector, useDispatch } from "react-redux"
import { setEggsShipped } from "../../../actions/farmValueActions"
import TextMask from "../../TextMask"

const useStyle = makeStyles(theme => ({
	root: {
		textAlign: "center",
	},
	inputRoot: {
		textAlign: "center",
	},
}))

export default function ShippingInput(props) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const initialValue = useSelector(store => store.farmValue.stats.shippingCapacity)
	let [value, setValue] = useState(initialValue)

	useEffect(() => setValue(initialValue), [initialValue])

	const handleBlur = (evt, newValue) => {
		newValue = isNaN(newValue) ? evt.target.value : newValue
		let value = Number(newValue)
		setValue(value)
		dispatch(setEggsShipped(value))
	}

	return (
		<HeadedCard cardID="shipping_input" collapsable title="Shipping" className={classes.root}>
			<TextMask
				value={value}
				classes={{input: classes.inputRoot}}
				onBlur={handleBlur}
				helpText="e.g. 123,456 or 123.456T"
				aria-label="Shipping Capacity"
			>
				{Input}
			</TextMask>
		</HeadedCard>
	)
}