import React, { useEffect } from "react"
import Page from "../Page"
import { Container, Card, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"

const useStyle = makeStyles(theme => ({
	root: {
		marginTop: "8px",
	},
	card: {
		padding: 8,
		textAlign: "center",
	},
	paper: {
		padding: "8px 8px",
	},
	button: {
		margin: "10px 0px 10px 16px",
	},
}))

export default function _404(props) {
	const classes = useStyle()
	const history = useHistory()

	const handleBack = () => {
		history.goBack()
	}

	const handleHome = () => {
		history.push("/")
	}

    return (
        <Page title="404 - Page Not Found" shortTitle="Page Not Found">
            <Container className={classes.root}>
				<Card className={classes.card}>
					<Typography variant="h4">Cannot find the requested page</Typography>
					<br/>
					<Button variant="outlined" className={classes.button} onClick={handleBack}>Go Back</Button>
					<Button variant="outlined" className={classes.button} onClick={handleHome}>Go to Homepage</Button>
				</Card>
			</Container>
        </Page>
    )
}