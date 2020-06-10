import React from "react"
import { Container, Card, Typography, Paper, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"

const useStyle = makeStyles(theme => ({
	root: {
		marginTop: "8px",
	},
	card: {
		padding: 8,
	},
	paper: {
		padding: "8px 8px",
	},
	button: {
		margin: "10px 0px 10px 16px",
	},
}))

export default function ErrorPage(props) {
	const classes = useStyle()
	const history = useHistory()

	const handleBack = () => {
		history.goBack()
	}

	const handleEmptyCache = () => {
		window.localStorage.removeItem("persist:appSettings")
		window.location.href = window.location.origin
	}

	const handleSendReport = () => {
		const errorStack = props.error.stack
	}

	return (
		<Container className={classes.root}>
			<Card className={classes.card}>
				<Typography align="center" variant="h4">Something went wrong =/</Typography>
				<br/>
				<Typography variant="h5">What do I do now?</Typography>
				<Paper className={classes.paper}>
					<ol className={classes.list}>
						<li>
							Go back to the previous page and pretend like we never saw each other.
							<br/>
							<Button variant="outlined" className={classes.button} onClick={handleBack}>Go Back</Button>
						</li>
						<li>
							If you came back here, try to reset the bad data by emptying the app's cache.
							<br/>
							<Button variant="outlined" className={classes.button} onClick={handleEmptyCache}>Empty Cache</Button>
						</li>
						<li>
							If you are still here, send me a report.
							<br/>
							<Button variant="outlined" className={classes.button} onClick={handleSendReport}>Send Report</Button>
						</li>
					</ol>
				</Paper>
			</Card>
		</Container>
	)
}