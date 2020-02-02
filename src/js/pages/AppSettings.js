import React from "react"
import Navbar from "../components/Navbar"
import PlayerIDInput from "../components/appSettings/PlayerIDInput"
import { Container, Card, Typography, Divider, Switch, List, ListItem, TextField, ListItemText, ListItemSecondaryAction } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"

const useStyle = makeStyles(theme => ({
    root: {
        
    },
    card: {
        margin: "20px 0px",
        padding: "10px 0px",
    }
}))

export default function AppSettings(props) {
    const classes = useStyle()
    const settings = useSelector(store => store.settings)
    const pageDetails = {
        title: "App Settings",
        shortTitle: "Settings",
    }

    return (
        <div>
            <Navbar title={pageDetails.shortTitle}/>
            <Container>
                <Card className={classes.card}>
                    <Typography variant="h5">
                        User Data
                    </Typography>
                    <Divider variant="middle"/>
                    <List>
                        <ListItem>
                            <Typography>
                                {settings.playerData.userName ? `Hello ${settings.playerData.userName}!` : `Hello mystery user! Enter your Player ID to access personalised features.`}
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <PlayerIDInput/>
                        </ListItem>
                        <ListItem>
                            <Switch/>
                            <ListItemText primary="Detonate"/>
                        </ListItem>
                    </List>
                    
                </Card>
            </Container>
        </div>
    )
}