import React, { useState } from "react"
import { clearAllPlayerId } from "../../actions/settingsActions"
import { Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import ReactGA from "react-ga"
import ConfirmAction from "../Decorator/ConfirmAction"

export default function ClearPlayerID() {
	const dispatch = useDispatch()
	const savedIds = useSelector(store => store.settings.savedIds)
	let [openConfirmation, setOpenConfirmation] = useState(false)

	if (Object.keys(savedIds).length < 2) return null

	const handleSubmit = () => {
		dispatch(clearAllPlayerId())
		ReactGA.event({
			category: "Player",
			action: "PlayerID Cleared",
			label: "All",
		})
	}

	return (
		<div>
			<Button
				onClick={() => setOpenConfirmation(true)}
				variant="outlined"
				color="secondary"
			>
				Forget All Saved Players
			</Button>
			<ConfirmAction
				content={`Are you sure you want to forget all saved players?`}
				open={openConfirmation}
				confirm={handleSubmit}
				decline={() => setOpenConfirmation(false)}
			/>
		</div>
	)
}