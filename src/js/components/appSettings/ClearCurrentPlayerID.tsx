import React, { useState, useEffect } from "react"
import { clearPlayerId, validatePlayerId } from "../../actions/settingsActions"
import { Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import ReactGA from "react-ga"
import ConfirmAction from "../Decorator/ConfirmAction"

export default function ClearPlayerID() {
	const dispatch = useDispatch()
	const playerId = useSelector(store => store.settings.playerId)
	const savedIds = useSelector(store => store.settings.savedIds)
	const fetched = useSelector(store => store.playerData.fetched)
	let [openConfirmation, setOpenConfirmation] = useState(false)

	useEffect(() => {
		if (playerId && !fetched) dispatch(validatePlayerId(playerId))
	}, [playerId])

	if (!playerId) return null

	const handleSubmit = () => {
		dispatch(clearPlayerId(playerId))
		ReactGA.event({
			category: "Player",
			action: "PlayerID Cleared",
			label: "Current"
		})
	}

	return (
		<div>
		<Button
			onClick={() => setOpenConfirmation(true)}
			variant="outlined"
			color="secondary"
		>
			Forget Current Player
			
		</Button>
		<ConfirmAction
			content={`Are you sure you want to forget about ${savedIds[playerId]}?`}
			open={openConfirmation}
			confirm={handleSubmit}
			decline={() => setOpenConfirmation(false)}
		/>
	</div>
	)
}