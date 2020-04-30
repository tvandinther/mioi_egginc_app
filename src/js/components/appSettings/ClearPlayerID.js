import React, { useState, useEffect } from "react"
import { clearPlayerId } from "../../actions/settingsActions"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"

export default function ClearPlayerID(props) {
	const dispatch = useDispatch()

	const handleSubmit = () => {
		dispatch(clearPlayerId())
	}

	return (
		<Button
			onClick={handleSubmit}
			variant="outlined"
			color="secondary"
		>
			Clear Player Data
		</Button>
	)
}