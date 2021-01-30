import React from "react"
import {Divider, List, ListItem, Typography} from "@material-ui/core"
import ClearCurrentPlayerID from "./ClearCurrentPlayerID"
import ClearAllPlayerID from "./ClearAllPlayerID"
import PlayerIDSelect from "./PlayerIDSelect"
import AddPlayerID from "./AddPlayerID"
import {useSelector} from "react-redux"

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
			<Typography>
				Player data services are currently unavailable.
				<br/>
				<br/>
				The MIOI Egg, Inc. Companion app is a 3rd party service that relies on unofficial streams of data from
				Auxbrain. MIOI has currently suspended some services as a temporary measure to cooperate with data
				migration efforts as a result of the Artifacts update. The ability to fetch information with your player
				ID will eventually resume in the coming weeks. In the meantime, continue to look up contract co-ops as
				you always have as this feature continues to operate uninterrupted.
			</Typography>
		</div>
	)

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