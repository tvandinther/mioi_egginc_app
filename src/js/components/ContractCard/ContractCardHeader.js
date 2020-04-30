import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	root: {
		gridArea: "title",
		backgroundColor: theme.palette.primary.main,
		height: "100%",
		// borderTopLeftRadius: "inherit",
	},
	text: {
		margin: 10,
		fontSize: 20,
		color: "white",
	}
}))

export default function ContractCardHeader(props) {
    const classes = useStyle()
    

    return (
        <div className={classes.root}>
            <Typography className={classes.text} variant="h2">{props.text}</Typography>
        </div>
    )
}