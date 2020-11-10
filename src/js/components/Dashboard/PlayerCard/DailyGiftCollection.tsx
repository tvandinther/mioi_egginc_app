import React, { CSSProperties } from "react"
import { useTheme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import { getExpireETA } from "../../../tools"
import useStyle from "./styles"

export default function DailyGiftCollection({ collected }: { collected: boolean }) {
	const classes = useStyle()
	const theme = useTheme()
	let nextGiftCollection = new Date()
	nextGiftCollection.setUTCDate(((new Date()).getUTCDate() + 1))
	nextGiftCollection.setUTCHours(0)
	nextGiftCollection.setUTCMinutes(0)
	nextGiftCollection.setUTCSeconds(0)
	nextGiftCollection.setUTCMilliseconds(0)
	let GiftText = collected ? () => <Typography>Next Gift: {getExpireETA(nextGiftCollection.getTime() / 1000, true)}</Typography> : () => <Typography>Collect your daily gift!</Typography>
	let collectedStyle: CSSProperties = collected ? { borderColor: theme.palette.grey[400] } : { borderColor: undefined }

	return (
		<div className={classes.dailyCollection} style={collectedStyle}>
			<div className={classes.img}>
				<img className={classes.gift} src="images/icon_gift.png"/>
				{collected && <img className={classes.check} src="images/check_filled.png"/>}
			</div>
			<GiftText/>
		</div>
	)
}