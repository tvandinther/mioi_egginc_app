import React, { useState, useEffect } from "react"
import HeadedCard from "../../HeadedCard"
import { Input } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { setEggsShipped } from "../../../actions/farmValueActions"

export default function ShippingInput(props) {
	const dispatch = useDispatch()
	const initialValue = useSelector(store => store.farmValue.stats.shippingCapacity)
	let [value, setValue] = useState(initialValue)

	useEffect(() => setValue(initialValue), [initialValue])

	const handleBlur = evt => {
		let value = evt.target.value === "" ? "" : Number(evt.target.value)
		setValue(value)
		dispatch(setEggsShipped(value))
	}

	return (
		<HeadedCard collapsable title="Shipping">
			<Input
				value={value}
				onBlur={handleBlur}
				onChange={(evt) => setValue(evt.target.value)}
			/>
		</HeadedCard>
	)
}