import React, { useState, useEffect } from "react"
import { TextField } from "@material-ui/core"

export default function ValidatedInput(props) {

    const validate = (value) => {
        if (typeof props.validatorFunction === "function") {
            value = props.validatorFunction(value)
        }
        return value
    }

    const handleChange = (event) => {
        let { value } = event.target
        value = validate(value)
        props.setValue(value)
    }

    const handlePaste = (event) => {
        let { value, selectionStart, selectionEnd } = event.target
        let pastedValue = event.clipboardData.getData("text")
        let pre = value.substring(0, selectionStart)
        let post = value.substring(selectionEnd, value.length)
        value = (pre + pastedValue + post).trim()
        value = validate(value)
        event.preventDefault()
        props.setValue(value)
        if (props.pasteSubmit) props.onEnter()
    }

    const handleKeyUp = (event) => {
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