import React, { useState, useEffect } from "react"
import { validatePlayerId } from "../../actions/settingsActions"
import { TextField, IconButton } from "@material-ui/core"
import useStyle from "./styles"
import { useSelector, useDispatch } from "react-redux"
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import Loading from "../Loading"
import ReactGA from "react-ga"

// MY ID FOR TESTING
// 105311171997915647553

export default function PlayerIDInput() {
	const classes = useStyle()
    const dispatch = useDispatch()
	const playerId = useSelector(store => store.settings.playerId)
	const fetching = useSelector(store => store.playerData.fetching)
	const playerDataError = useSelector(store => store.playerData.error)
    let [error, setError] = useState(false)
	let [value, setValue] = useState("")

	useEffect(() => {
		if (!fetching) setError(playerDataError)
	}, [fetching])

	useEffect(() => {
		if (value == "") setError(false)
	}, [value])

	useEffect(() => {
		if (fetching) setValue(playerId || "")
	}, [playerId])

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setValue(evt.currentTarget.value)
        setError(false)
    }
    const handleSubmit = () => {
        if (value !== "" && value !== playerId) {
			dispatch(validatePlayerId(value))
			ReactGA.event({
				category: "Player",
				action: "PlayerID Submitted",
			})
        }
	}

	const handleKeyUp = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSubmit()
		}
	}

    return (
		<div className={classes.playIDInputRoot}>
			<TextField 
				value={value}
				fullWidth
				error={error}
				helperText="Found at the bottom of the 'Privacy & Data' in-game menu"
				label="Player ID"
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				inputProps={{"aria-label": "Player ID"}}
			/>
			{fetching && <Loading/>}
			{!fetching && <IconButton
				onClick={handleSubmit}
				color="primary"
				size="medium"
				disabled={value === playerId}
				aria-label="Submit"
			>
				<CheckCircleIcon/>
			</IconButton>}
		</div>
    )
}