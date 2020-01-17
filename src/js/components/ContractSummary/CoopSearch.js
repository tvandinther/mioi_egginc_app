import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ValidatedInput from "../ValidatedInput"
import { updateContractCoopSearchString, getCoop } from "../../actions/contractActions"
import { contractNameFormat } from "../../tools/eggincTools"
import { Typography, Button, CircularProgress } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"

export default function CoopSearch(props) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const search = useSelector(store => store.contract.coopSearch[props.contractId])
    let loading = useSelector(store => store.contract.coops[props.contractId])
    loading = loading ? loading.fetching : false
    const style = {
        ...props.style,
        display: "grid",
        margin: "5px",
        gridTemplate: "1fr / 1fr 100px",
        gridGap: "10px",
    }
    const progressCircleStyle = {
        position: "absolute",

    }
    let [coopSearchString, setCoopSearchString] = useState(search.searchString)
    let [disableSearch, setDisableSearch] = useState(search.disabled)
    
    const setReduxSearchString = (value) => {
        setCoopSearchString(value)
        if (!value || search.failedSearches.includes(value)) {
            setDisableSearch(true)
        }
        else {
            setDisableSearch(false)
        }
        dispatch(updateContractCoopSearchString(props.contractId, value))
    }

    const handleSubmit = () => {
        if (!loading) {
            dispatch(getCoop(coopSearchString, props.contractId))
        }
    }
    return (
            <div style={style}>
                <ValidatedInput label="Search a Co-op" type="search" error={disableSearch} onEnter={handleSubmit} value={coopSearchString} setValue={setReduxSearchString} validatorFunction={contractNameFormat}/>
                <Button onClick={handleSubmit} variant="outlined" disabled={loading || disableSearch}>
                    Search
                    {loading && <CircularProgress style={progressCircleStyle}/>}
                </Button>
            </div>
        
    )
}