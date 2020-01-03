import React, { useState, useEffect } from "react"

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
    }

    return (
        <input type="text" name="contractName" value={props.value} onChange={handleChange} onPaste={handlePaste}></input>
    )
}