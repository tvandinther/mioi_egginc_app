import React, { useState } from "react"
import { Dialog, Button, Typography, Container } from "@material-ui/core"
import ReactMarkdown from "react-markdown"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	root: {
		padding: 20,
		display: "grid",
	},
	markdown: {
		whiteSpace: "pre-line",

		"& a": {
			color: theme.palette.info.main,

			"&:hover": {
				color: theme.palette.info.light,
			},
		}
	}
}))

export default function EntryPopup(props) {
	const classes = useStyle()
	const searchParams = new URLSearchParams(window.location.search)
	const redirected = searchParams.get('redirect')
	let [open, setOpen] = useState(true)

	const handleClick = event => {
		setOpen(false)
		window.history.replaceState({}, document.title, window.location.pathname)
	}

	const mdSource = `You have been redirected from the old mioi.io website to the new home of your favourite Egg, Inc. tools. This new site offers many new features such as:

- A new player dashboard: Enter your Player ID to easily track your contracts
- A new farm value calculator with the ability to load one of your current farms
- The option to install this website as an app for your mobile device to enable easy access
- An optional dark theme

To gain access to a lot of the great features, ensure that you enter your Player ID on the Dashboard or Settings page. Your Player ID can be found at the bottom of the Privacy & Data menu in-game.

If you would like to access the old calculators, these are still available here: [contract](https://mioi.io/legacy/contract), [farm value](https://mioi.io/legacy/farmvalue).

I hope that you enjoy the new site and make sure to bookmark the new URL: *egginc.mioi.io*`

	if (redirected) {
		return (
			<Dialog
				open={open}
			>
				<Container className={classes.root}>
					<Typography variant="h4">Welcome to the new website!</Typography>
					<ReactMarkdown className={classes.markdown} source={mdSource}/>
					<Button
						variant="outlined"
						onClick={handleClick}
					>
						Confirm
					</Button>
				</Container>
			</Dialog>
		)
	}
	else {
		return null
	}
}