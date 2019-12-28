import React, { useState, useEffect } from "react"

export default function ValidatedInput(props) {
    const [coopSearchString, setCoopSearchString] = useState(props.searchString)
    useEffect(() => {
        console.log("STATE", props.contractId)
        setCoopSearchString(props.searchString);
        return () => {
            console.log("stored state: ", props.searchString)
            console.log("local state: ", coopSearchString)
            if (props.searchString !== coopSearchString) {
                props.updateContractCoopSearchString(props.contractId, coopSearchString)
            }
        }
    }, [props.contractId])

    const validate = (value) => {
        if (typeof props.validatorFunction === "function") {
            value = props.validatorFunction(value)
        }
        return value
    }

    const handleChange = (event) => {
        let { value } = event.target
        value = validate(value)
        setCoopSearchString(value)
    }

    const handlePaste = (event) => {
        let { value, selectionStart, selectionEnd } = event.target
        let pastedValue = event.clipboardData.getData("text")
        let pre = value.substring(0, selectionStart)
        let post = value.substring(selectionEnd, value.length)
        value = (pre + pastedValue + post).trim()
        value = validate(value)
        event.preventDefault()
        setCoopSearchString(value)
    }

    return (
        <input type="text" name="contractName" value={coopSearchString} onChange={handleChange} onPaste={handlePaste}></input>
    )
}