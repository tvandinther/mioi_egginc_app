import React from "react"
import Navbar from "../components/Navbar"
import PlayerIDInput from "../components/appSettings/PlayerIDInput"
import { Container, Card, Typography, Divider, Switch, List, ListItem, TextField, ListItemText, ListItemSecondaryAction } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector, useDispatch } from "react-redux"
import * as settingsActions from "../actions/settingsActions"
import ClearPlayerID from "../components/appSettings/ClearPlayerID"
import ThemeSwitch from "../components/appSettings/ThemeSwitch"

const useStyle = makeStyles(theme => ({
    root: {
        
    },
    card: {
        margin: "20px 0px",
        padding: "16px",
    }
}))

export default function AppSettings(props) {
    const classes = useStyle()
    const dispatch = useDispatch()
    const playerData = useSelector(store => store.playerData)
    const settings = useSelector(store => store.settings)
    const pageDetails = {
        title: "App Settings",
        shortTitle: "Settings",
    }

	const PlayerData = () => (
		<div>
			<Typography variant="h5">
				Player Data
			</Typography>
			<Divider variant="middle"/>
			<List>
				<ListItem>
					<Typography>
						{(playerData && playerData.userName) ? `Hello ${playerData.userName}!` : `Hello mystery user! Enter your Player ID to access personalised features.`}
					</Typography>
				</ListItem>
				<ListItem>
					<PlayerIDInput/>
				</ListItem>
				<ListItem>
					<ClearPlayerID/>
				</ListItem>
			</List>
		</div>
	)

	const Appearance = () => (
		<div>
			<Typography variant="h5">
				Appearance
			</Typography>
			<Divider variant="middle"/>
			<List>
				<ListItem>
					<ThemeSwitch/>
					<ListItemText primary="Dark Theme"/>
				</ListItem>
			</List>
		</div>
	)

    return (
        <div>
            <Navbar title={pageDetails.shortTitle}/>
            <Container>
                <Card className={classes.card}>
					<Appearance/>
					<Divider/>
					<PlayerData/>
                </Card>
            </Container>
        </div>
    )
}