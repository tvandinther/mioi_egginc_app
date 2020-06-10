import React from "react"
import { Typography, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { convertSymbol } from "../../../tools"
import { useSelector, useDispatch } from "react-redux"

const useStyle = makeStyles(theme => ({
    root: {
		flexGrow: 2,
		flexBasis: "100%",
    },
}))

export default function FarmValueStat(props) {
	const { farmValue } = props
	const classes = useStyle()

	return (
		<Paper elevation={4} className={classes.root}>
			<Typography align="center" variant="h5">Farm Value: {convertSymbol(farmValue)}</Typography>
            <Typography align="center" variant="subtitle1">({(Math.log(farmValue) / Math.LN10).toFixed(2)} OoM)</Typography>
		</Paper>
	)
}