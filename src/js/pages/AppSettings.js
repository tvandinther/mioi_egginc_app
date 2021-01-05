import React from "react"
import { Container, Card, Typography, Divider, Switch, List, ListItem, TextField, ListItemText, ListItemSecondaryAction } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"
import PlayerDataForm from "../components/appSettings/PlayerDataForm"
import Page from "../Page"
import BackButton from "../components/BackButton"
import switchProfiles from "../components/appSettings/switchProfiles"
import SettingsSwitch from "../components/appSettings/SettingsSwitch"

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
	
	const Appearance = () => (
		<div>
			<Typography variant="h5">
				Appearance
			</Typography>
			<Divider variant="middle"/>
			<List>
				<SettingsSwitch {...switchProfiles.darkTheme}/>
				<SettingsSwitch {...switchProfiles.hideTooltips}/>
				<SettingsSwitch {...switchProfiles.detailedRewardsBar}/>
				<SettingsSwitch {...switchProfiles.hourlyEggLayingRate}/>
			</List>
		</div>
	)

    return (
        <Page title="App Settings" shortTitle="Settings">
			<Container>
				<Card className={classes.card}>
					<BackButton/>
					<br/>
					<br/>
					<Appearance/>
					<Divider/>
					<PlayerDataForm/>
				</Card>
			</Container>
        </Page>
    )
}