import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ValidatedInput from "../ValidatedInput"
import { updateContractCoopSearchString, getCoop } from "../../actions/contractActions"
import { contractNameFormat } from "../../tools/eggincTools"
import { Typography, Button, CircularProgress } from "@material-ui/core"
import { useTheme, makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        margin: "5px",
        gridTemplate: "1fr / 1fr 100px",
        gridGap: "10px",
    },
    progress: {
        position: "absolute",
    }
}))

export default function CoopSearch(props) {
    const dispatch = useDispatch()
    const classes = useStyle()
    const search = useSelector(store => store.contract.coopSearch[props.contractId])
    const coop = useSelector(store => store.contract.coops[props.contractId])
    let loading = coop ? coop.fetching : false
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
    
    useEffect(() => {
        if (!coop && !search.searchFailed && search.searchString) handleSubmit()
    }, [])
    
    return (
            <div style={props.style} className={classes.root}>
                <ValidatedInput pasteSubmit={false} label="Search a Co-op" type="search" error={disableSearch} onEnter={handleSubmit} value={coopSearchString} setValue={setReduxSearchString} validatorFunction={contractNameFormat}/>
                <Button onClick={handleSubmit} variant="outlined" disabled={loading || disableSearch}>
                    Search
                    {loading && <CircularProgress className={classes.progress}/>}
                </Button>
            </div>
        
    )
}