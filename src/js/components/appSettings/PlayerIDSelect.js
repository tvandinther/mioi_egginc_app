import React from "react"
import { Select, ListItem, MenuItem, InputLabel, FormControl } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { setPlayerId, validatePlayerId } from "../../actions/settingsActions"
import { useSelector, useDispatch } from "react-redux"

const useStyle = makeStyles(theme => ({
	root: {
		
	},
	select: {
		
	},
}))

export default function PlayerIDSelect(props) {
	const classes = useStyle()
	const savedIds = useSelector(store => store.settings.savedIds)
	const selectedId = useSelector(store => store.settings.playerId)
	const dispatch = useDispatch()

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

	const handleChange = evt => {
		dispatch(setPlayerId(evt.target.value))
		dispatch(validatePlayerId(evt.target.value))
	}

	return (
		<ListItem className={classes.root}>
			<FormControl>
				<InputLabel>
					Player Select
				</InputLabel>
				<Select
					className={classes.select}
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