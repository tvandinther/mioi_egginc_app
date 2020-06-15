import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import ValidatedInput from "../ValidatedInput"
import { updateContractCoopSearchString, getCoop, setPlayerCoopToCoop } from "../../actions/contractActions"
import { contractNameFormat } from "../../tools/eggincTools"
import { Typography, Button, CircularProgress } from "@material-ui/core"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import ReactGA from "react-ga"

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
	const { initialSearch, contractId } = props
	const dispatch = useDispatch()
	const classes = useStyle()
	const search = useSelector(store => store.contract.coopSearch[contractId])
	let coop = useSelector(store => store.contract.coops[contractId])
	const playerCoop = useSelector(store => store.contract.playerCoops[contractId])
	let loading = coop ? coop.fetching : false
	let [coopSearchString, setCoopSearchString] = useState(initialSearch || search.searchString)
	let [error, setError] = useState(search.searchFailed)
	let [disableSearch, setDisableSearch] = useState(search.disabled)

	const setReduxSearchString = (value) => {
		setCoopSearchString(value)
		if (!value) setDisableSearch(true)
		else {
			setDisableSearch(false)
			if (search.failedSearches.includes(value)) setError(true)
			else setError(false)
		}
	}

	const handleSubmit = () => {
		if (!loading) {
			dispatch(updateContractCoopSearchString(contractId, coopSearchString))
			dispatch(getCoop(coopSearchString, contractId))
			ReactGA.event({
				category: "Contract",
				action: "Co-op Searched",
				label: props.contractId,
			})
		}
	}

	useEffect(() => {
		if (!coop.fetched && coopSearchString) handleSubmit()
	}, [])

	useEffect(() => {
		setError(search.searchFailed)
	}, [search.searchFailed])

	useEffect(() => {
		setCoopSearchString(search.searchString)
	}, [search.searchString])

	// // Disables search button on a failed search term
	// useEffect(() => {
	//     if (search.failedSearches.includes(coopSearchString)) setError(true)
	// }, [search])

	useEffect(() => {
		// Use preloaded player Co-op if search term matches
		if (playerCoop && (coopSearchString === playerCoop.coop)) {
			coop = playerCoop
			dispatch(setPlayerCoopToCoop(playerCoop, contractId))
		}
	}, [playerCoop])

	return (
			<div style={props.style} className={classes.root}>
				<ValidatedInput
					pasteSubmit={false}
					label="Search a Co-op"
					type="search"
					error={error}
					onEnter={handleSubmit}
					value={coopSearchString}
					setValue={setReduxSearchString}
					validatorFunction={contractNameFormat}
					inputProps={{"aria-label": "Search a Co-op"}}
				/>
				<Button onClick={handleSubmit} variant="outlined" disabled={loading || disableSearch}>
					Search
					{loading && <CircularProgress className={classes.progress}/>}
				</Button>
			</div>
	)
}