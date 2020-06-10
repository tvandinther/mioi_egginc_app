import React, { useState, useEffect } from "react"
import { convertSymbol, convertSymbolToNumber, isSymbolFormat } from "../tools"
import { FormHelperText } from "@material-ui/core"

export default function TextMask(props) {
	const { children, value, onChange, onBlur, helpText, ...inputprops } = props
	const InputElement = children
	let [maskedValue, setMaskedValue] = useState(convertSymbol(value))
	let [trueValue, setTrueValue] = useState(value)
	let [error, setError] = useState(false)
	// let maskedValue = convertSymbol(value)
	
	useEffect(() => {
		setError(false)
		setMaskedValue(convertSymbol(value))
	}, [value])

	const handleBlur = event => {
		onBlur(event, trueValue)
	}

	const handleChange = event => {
		let newMaskedValue = event.target.value
		let newTrueValue = trueValue
		let deleted = maskedValue.length > newMaskedValue.length
		setError(false)
		if (isSymbolFormat(newMaskedValue)) { // Symbol condition
			newTrueValue = convertSymbolToNumber(newMaskedValue)
			setTrueValue(newTrueValue)
			setMaskedValue(newMaskedValue)
		}
		else if (/^\d{1,4}(,\d{1,4})*,?$/.test(newMaskedValue)) { // Number condition
			newTrueValue = newMaskedValue.replace(/\D/g, '')
			setTrueValue(newTrueValue)
			setMaskedValue(Number(newTrueValue).toLocaleString())
		}
		else if (newMaskedValue === "") { // Blank condition
			setTrueValue(newMaskedValue)
			setMaskedValue(newMaskedValue)
		}
		else if (deleted) { // Allow deletion with error
			setError(true)
			setMaskedValue(newMaskedValue)
		}
		else { // Else prevent input
			setError(true)
			return
		}
		if (typeof onChange === "function") onChange(event, newTrueValue)
	}

	return (
		<div>
			<InputElement
				{...inputprops}
				align="center"
				value={maskedValue}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<FormHelperText error={error}>{error ? helpText : " "}</FormHelperText>
		</div>
	)
}