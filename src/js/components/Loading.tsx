import React from "react"
import {CircularProgress} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	root: {
		width: "100%",
		display: "grid",
		justifyItems: "center",
		alignItems: "center",
	}
}))

export default function Loading(props: { style?: React.CSSProperties }) {
	const classes = useStyle()
	return (
		<div style={{...props.style}} className={classes.root}>
			<CircularProgress/>
		</div>
	)
}