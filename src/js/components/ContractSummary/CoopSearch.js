import React, { useState, useEffect } from "react"
import ValidatedInput from "../ValidatedInput"
import { contractNameFormat } from "../../tools/eggincTools"
import { Typography, Button } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

export default function CoopSearch(props) {
    const theme = useTheme()
    const style = {
        display: "grid",
        margin: "20px 5px",
        gridTemplate: "1fr / 1fr 100px",
        gridGap: "10px",
    }
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

    const handleSubmit = () => {
        props.getCoop(coopSearchString, props.contractId)
    }

    return (
        
            <div style={style}>
                <ValidatedInput onEnter={handleSubmit} value={coopSearchString} setValue={setCoopSearchString} validatorFunction={contractNameFormat}/>
                <Button onClick={handleSubmit} variant="outlined" >Search</Button>
            </div>
        
    )
}