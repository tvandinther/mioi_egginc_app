import React from "react"
import {FormControl, InputLabel, ListItem, MenuItem, Select} from "@material-ui/core"
import {setPlayerId, validatePlayerId} from "../../actions/settingsActions"
import {useDispatch, useSelector} from "react-redux"

export default function PlayerIDSelect() {
	const savedIds = useSelector(store => store.settings.savedIds)
	const selectedId = useSelector(store => store.settings.playerId)
	const dispatch = useDispatch()

	return null

	if (Object.keys(savedIds).length < 2) {
		return null
	}

	const menuItems = Object.entries(savedIds).sort((a, b) => a[1].toUpperCase() > b[1].toUpperCase() ? 1 : -1).map(([playerId, playerName]) => {
		return (
			<MenuItem
				value={playerId}
				key={playerId}
			>
				{playerName}
			</MenuItem>
		)
	})

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPlayerId(evt.target.value))
		dispatch(validatePlayerId(evt.target.value))
	}

	return (
		<ListItem>
			<FormControl>
				<InputLabel>
					Player Select
				</InputLabel>
				<Select
					onChange={handleChange}
					value={selectedId}
					label="Player Select"
				>
					{menuItems}
				</Select>
			</FormControl>
		</ListItem>
		
	)
}