import React from "react"
import { CircularProgress, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	root: {
		width: "100%",
		display: "grid",
		justifyItems: "center",
		alignItems: "center",
	}
}))

export default function Loading(props) {
	const classes = useStyle()
    return (
        <div style={{...props.style}} className={classes.root}>
            <CircularProgress

			/>
        </div>
    )
}