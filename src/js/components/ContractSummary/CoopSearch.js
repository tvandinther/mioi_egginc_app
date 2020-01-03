import React, { useState, useEffect } from "react"
import ValidatedInput from "../ValidatedInput"
import { contractNameFormat } from "../../tools/eggincTools"

export default function CoopSearch(props) {
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

    const handleSubmit = evt => {
        props.getCoop(coopSearchString, props.contractId)
    }

    return (
        <div>
            <ValidatedInput value={coopSearchString} setValue={setCoopSearchString} validatorFunction={contractNameFormat}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}