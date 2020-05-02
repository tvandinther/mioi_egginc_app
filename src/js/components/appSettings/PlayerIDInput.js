import React, { useState, useEffect } from "react"
import { setPlayerId, validatePlayerId } from "../../actions/settingsActions"
import { TextField, Button, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector, useDispatch } from "react-redux"
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Loading from "../Loading"
import ReactGA from "react-ga"

// MY ID FOR TESTING
// 105311171997915647553

const useStyle = makeStyles(theme => ({
	root: {
		display: "grid",
		gridTemplateColumns: "1fr auto",
		gridGap: 10,
		alignItems: "center",
		justifyItems: "center",
	},
}))



export default function PlayerIDInput(props) {
	const classes = useStyle()
    const dispatch = useDispatch()
	const playerId = useSelector(store => store.settings.playerId)
	const fetchedPlayerId = useSelector(store => store.playerData.userId)
	const fetching = useSelector(store => store.playerData.fetching)
    const playerDataError = useSelector(store => store.playerData.error)
    let [error, setError] = useState(playerId ? playerDataError && !fetching : false)
    let [value, setValue] = useState(playerId || "")

	useEffect(() => {
		setValue(playerId || "")
	}, [playerId])

	// useEffect(() => {
	// 	dispatch(setPlayerId(fetchedPlayerId))
	// }, [fetchedPlayerId])

    const handleChange = event => {
        setValue(event.target.value)
        setError(false)
    }
    const handleSubmit = event => {
        if (value !== "" && value !== playerId) {
			dispatch(validatePlayerId(value))
			dispatch(setPlayerId(value))
			ReactGA.event({
				category: "Player",
				action: "PlayerID Submitted",
			})
        }
	}
	
	const handleKeyUp = event => {
		if (event.key === "Enter") {
			handleSubmit()
		}
	}

    return (
		<div className={classes.root}>
			<TextField 
				value={value}
				fullWidth
				error={error}
				helperText="Found at the bottom of the 'Privacy & Data' in-game menu"
				label="Player ID"
				onChange={handleChange}
				onKeyUp={handleKeyUp}
			/>
			{fetching && <Loading/>}
			{!fetching && <IconButton
				onClick={handleSubmit}
				color="primary"
				size="medium"
				disabled={value === playerId}
			>
				<CheckCircleIcon/>
			</IconButton>}
		</div>
    )
}