import React, {ChangeEvent, useEffect, useState} from "react"
import {convertSymbol, convertSymbolToNumber, isSymbolFormat} from "../tools"
import {FormHelperText} from "@material-ui/core"

type Props = {
	children: React.ElementType;
	value: number;
	onChange?: (evt: React.ChangeEvent, trueValue: number) => void;
	onBlur: (evt: React.FocusEvent, trueValue: number) => void;
	helpText?: string;
	[x: string]: any;
}

export default function TextMask(props: Props) {
	const {children, value, onChange, onBlur, helpText, ...inputProps} = props
	const InputElement = children
	let [maskedValue, setMaskedValue] = useState(convertSymbol(value))
	let [trueValue, setTrueValue] = useState(value)
	let [error, setError] = useState(false)

	useEffect(() => {
		setError(false)
		setMaskedValue(convertSymbol(value))
	}, [value])

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		onBlur(event, trueValue)
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		let newMaskedValue = event.target.value
		let newTrueValue = trueValue
		let deleted = maskedValue.length > newMaskedValue.length
		setError(false)
		if (isSymbolFormat(newMaskedValue)) { // Symbol condition
			newTrueValue = convertSymbolToNumber(newMaskedValue)
			setTrueValue(newTrueValue)
			setMaskedValue(newMaskedValue)
		} else if (/^\d{1,4}(,\d{1,4})*,?$/.test(newMaskedValue)) { // Number condition
			newTrueValue = Number(newMaskedValue.replace(/\D/g, ''))
			setTrueValue(newTrueValue)
			setMaskedValue(Number(newTrueValue).toLocaleString())
		} else if (newMaskedValue === "") { // Blank condition
			setTrueValue(Number(newMaskedValue))
			setMaskedValue(newMaskedValue)
		} else if (deleted) { // Allow deletion with error
			setError(true)
			setMaskedValue(newMaskedValue)
		} else { // Else prevent input
			setError(true)
			return
		}
		if (typeof onChange === "function") onChange(event, newTrueValue)
	}

	return (
		<div>
			<InputElement
				{...inputProps}
				align="center"
				value={maskedValue}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<FormHelperText error={error}>{error ? helpText : " "}</FormHelperText>
		</div>
	)
}