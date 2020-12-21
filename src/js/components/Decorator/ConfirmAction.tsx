import React, { useState, useEffect } from "react"
import {Dialog, DialogTitle, DialogContentText, DialogActions, Button, Container} from "@material-ui/core"

type PropTypes = {
	open: boolean;
	decline: () => void;
	confirm: () => void;
	content: string;
}

export default function ConfirmAction(props: PropTypes) {
	let [openDialog, setOpenDialog] = useState(props.open)

	useEffect(() => {
		setOpenDialog(props.open)
	}, [props.open])

	const handleClose = () => {
		setOpenDialog(false)
		props.decline()
	}

	const handleConfirm = () => {
		setOpenDialog(false)
		props.confirm()
	}

	return (
		<Dialog
			open={openDialog}
		>
			<Container>
				<DialogTitle>
					Are you sure?
				</DialogTitle>
				<DialogContentText>
					{props.content}
				</DialogContentText>
				<DialogActions>
					<Button
						variant="outlined"
						autoFocus
						onClick={handleClose}
					>
						No
					</Button>
					<Button
						variant="outlined"
						onClick={handleConfirm}
					>
						Yes
					</Button>
				</DialogActions>
			</Container>
		</Dialog>
	)
}