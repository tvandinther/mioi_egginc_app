import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import Countdown from "../../Countdown"
import { convertEpoch, getExpireETA } from "../../../tools"

const useStyle = makeStyles(theme => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "2px solid",
		borderColor: theme.palette.success.main,
		borderRadius: 8,
	},
	collected: {
		
	},
	img: {
		position: "relative",
	},
	gift: {
		width: 80,
	},
	check: {
		position: "absolute",
		left: 5,
		top: 5,
		width: 36,
	}
}))


export default function DailyGiftCollection(props) {
	const classes = useStyle()
	const { collected } = props
	const theme = useTheme()
	let nextGiftCollection = new Date()
	nextGiftCollection.setUTCDate(((new Date()).getUTCDate() + 1))
	nextGiftCollection.setUTCHours(0)
	nextGiftCollection.setUTCMinutes(0)
	nextGiftCollection.setUTCSeconds(0)
	nextGiftCollection.setUTCMilliseconds(0)
	let GiftText = collected ? () => <Typography>Next Gift: {getExpireETA(nextGiftCollection / 1000, true)}</Typography> : () => <Typography>Collect your daily gift!</Typography>
	let collectedStyle = collected ? { borderColor: theme.palette.grey[400] } : null

	return (
		<div className={classes.root} style={collectedStyle}>
			<div className={classes.img}>
				<img className={classes.gift} src="images/icon_gift.png"/>
				{collected && <img className={classes.check} src="images/check_filled.png"/>}
			</div>
			<GiftText/>
		</div>
	)
}