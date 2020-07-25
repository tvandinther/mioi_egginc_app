import React from "react"
import { Typography, Divider, List, ListItem, ListItemText } from "@material-ui/core"
import ClearCurrentPlayerID from "./ClearCurrentPlayerID"
import ClearAllPlayerID from "./ClearAllPlayerID"
import PlayerIDSelect from "./PlayerIDSelect"
import AddPlayerID from "./AddPlayerID"
import { useSelector } from "react-redux"

export default function PlayerData() {
	const playerId = useSelector(store => store.settings.playerId)
	const savedIds = useSelector(store => store.settings.savedIds)

	const playerName = savedIds[playerId]

	return (
		<div>
			<Typography variant="h5">
				Player Data
			</Typography>
			<Divider variant="middle"/>
			<List>
				<ListItem>
					<Typography>
						{playerName ? `Hello ${playerName}!` : `Hello mystery user! Enter your Player ID to access personalised features.`}
					</Typography>
				</ListItem>
				<PlayerIDSelect/>
				<ListItem>
					<AddPlayerID/>
				</ListItem>
				<ListItem>
					<ClearCurrentPlayerID/>
				</ListItem>
				<ListItem>
					<ClearAllPlayerID/>
				</ListItem>
				<Divider variant="middle"/>
				
			</List>
		</div>
	)
}