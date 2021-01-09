import React from "react"
import {TextField, TextFieldProps} from "@material-ui/core"

export interface Props {
    validatorFunction: (value: string) => string;
    setValue: (value: string) => void;
    pasteSubmit: boolean;
    onEnter: () => void;
    "aria-label"?: string;
    error: boolean;
    autoFocus: boolean;
    type: string;
    label: string;
    value: string;
}

export default function ValidatedInput(props: Props & TextFieldProps) {

    const validate = (value: string) => {
        if (typeof props.validatorFunction === "function") {
            value = props.validatorFunction(value)
        }
        return value
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let {value} = event.target
        value = validate(value)
        props.setValue(value)
    }

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        let {value, selectionStart, selectionEnd} = event.currentTarget
        let pastedValue = event.clipboardData.getData("text")
        let pre = value.substring(0, selectionStart ?? undefined)
        let post = value.substring(selectionEnd ?? 0, value.length)
        value = (pre + pastedValue + post).trim()
        value = validate(value)
        event.preventDefault()
        props.setValue(value)
        if (props.pasteSubmit) props.onEnter()
    }

    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            props.onEnter()
        }
    }

    return (
		<TextField 
			aria-label={props["aria-label"]}
            error={props.error} 
			autoFocus={props.autoFocus}
			onKeyUp={handleKeyUp} 
            type={props.type}
            label={props.label}
            fullWidth 
            variant="outlined" 
            value={props.value} 
            onChange={handleChange} 
            onPaste={handlePaste} 
        />
    )
}