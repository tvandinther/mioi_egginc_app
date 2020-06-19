import React, { useState } from "react"
import { IconButton, Snackbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ShareIcon from "@material-ui/icons/Share"
import { copyToClipboard } from "../../../tools"
import ReactGA from "react-ga"

const useStyle = makeStyles(theme => ({
	root: {
		marginLeft: 8,
	}
}))

export default function ShareCoop(props) {
	const classes = useStyle()
	const { coop } = props
	let [openSnackbar, setOpenSnackbar] = useState(false)
	let [snackbarText, setSnackbarText] = useState("")

	const shareData = {
		title: `${coop.coop} - ${coop.contractLink.title} | egginc.mioi.io`,
		text: `Check the progress of ${coop.coop} on ${coop.contractLink.title} at egginc.mioi.io!\n\n`,
		url: window.location.href,
	}

	const handleOpenSnackbar = () => {
		setOpenSnackbar(true)
		setTimeout(() => setOpenSnackbar(false), 3000)
	}

	const handleClick = async (evt) => {
		let shareType
		if (navigator.share) {
			await navigator.share(shareData)
			setSnackbarText("Co-op Shared Successfully")
			handleOpenSnackbar()
			shareType = "Navigator"
		}
		else {
			copyToClipboard(shareData.url)
			setSnackbarText("Co-op Link Copied To Clipboard")
			handleOpenSnackbar()
			shareType = "Clipboard"
		}
		ReactGA.event({
			category: "Interaction",
			action: "Share",
			label: shareType,
		})
	}

	return (
		<IconButton color="inherit" className={classes.root} onClick={handleClick}>
			<ShareIcon/>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={openSnackbar}
				message={snackbarText}
			/>
		</IconButton>
	)
}