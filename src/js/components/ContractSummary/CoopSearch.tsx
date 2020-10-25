import React, { useState, useEffect, CSSProperties } from "react"
import { useSelector, useDispatch } from "react-redux"
import ValidatedInput from "../ValidatedInput"
import { updateContractCoopSearchString, getCoop, setPlayerCoopToCoop } from "../../actions/contractActions"
import { contractNameFormat } from "../../tools/eggincTools"
import { Button, CircularProgress } from "@material-ui/core"
import ReactGA from "react-ga"
import useStyle from "./styles"

export default function CoopSearch({ style, initialSearch, contractId }: { style: CSSProperties, initialSearch: string, contractId: string }) {
	const dispatch = useDispatch()
	const classes = useStyle()
	const search = useSelector(store => store.contract.coopSearch[contractId])
	let coop = useSelector(store => store.contract.coops[contractId])
	const playerCoop = useSelector(store => store.contract.playerCoops[contractId])
	let loading = coop ? coop.fetching : false
	let [coopSearchString, setCoopSearchString] = useState(initialSearch || search.searchString)
	let [error, setError] = useState(search.searchFailed)
	let [disableSearch, setDisableSearch] = useState(search.disabled)

	const setReduxSearchString = (value: string) => {
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
				label: contractId,
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

	useEffect(() => {
		// Use preloaded player Co-op if search term matches
		if (playerCoop && (coopSearchString === playerCoop.coop)) {
			coop = playerCoop
			dispatch(setPlayerCoopToCoop(playerCoop, contractId))
		}
	}, [playerCoop])

	return (
		<div style={style} className={classes.search}>
			<ValidatedInput
				pasteSubmit={false}
				label="Search a Co-op"
				type="search"
				error={error}
				autoFocus={!loading && !coop.fetched && !coopSearchString}
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