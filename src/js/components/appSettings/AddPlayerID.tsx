import React, { useState } from "react"
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core"
import PlayerIDInput from "./PlayerIDInput"

export default function AddPlayerID() {
	let [openDialog, setOpenDialog] = useState(false)
	

	const handleButtonClick = () => {
		setOpenDialog(true)
	}

	const handleDialogClose = () => {
		setOpenDialog(false)
	}

	return (
		<div>
			<Button
				onClick={handleButtonClick}
				variant="outlined"
				color="primary"
			>
				Add New Player ID
			</Button>
			<Dialog
				open={openDialog}
				onClose={handleDialogClose}
			>
				<DialogTitle>
					Add Player ID
				</DialogTitle>
				<DialogContent>
					<PlayerIDInput/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDialogClose}
						variant="outlined"
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}