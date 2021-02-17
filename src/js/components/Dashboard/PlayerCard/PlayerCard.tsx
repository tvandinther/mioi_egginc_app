import React from "react"
import HeadedCard from "../../HeadedCard"
import PlayerIDInput from "../../appSettings/PlayerIDInput"
import {Typography} from "@material-ui/core"
import {convertSymbol, getDayIndex} from "../../../tools"
import Loading from "../../Loading"
import FlexContainer from "../../FlexContainer"
import ImageLabel from "../../Decorator/ImageLabel"
import DailyGiftCollection from "./DailyGiftCollection"
import {PlayerCardProps} from "../../../../types/dashboard"
import useStyle from "./styles"
import {Alert} from "@material-ui/lab";

export default function PlayerCard({playerData}: PlayerCardProps) {
	const classes = useStyle()

	// const farmStats = calculateFarmStats(farm, game)
	const fetched = playerData.fetched
	const fetching = playerData.fetching
	const userId = playerData.eiUserId
	const giftCollected = fetched ? playerData.game.lastDailyGiftCollectedDay >= getDayIndex(new Date()) : false


	const IDPrompt = () => (
		<div>
			<Typography variant="h5">
				Welcome to mioi.io's Egg, Inc. companion app
			</Typography>
			<br/>
			<Typography variant="body1">
                The dashboard shows you all of the information you need at a glance. To get you the tailored information you're after, enter your PlayerID below. 
            </Typography>
            <br/>
            <Typography variant="body2">
                The PlayerID will be saved on the device you're viewing this on.
            </Typography>
            <PlayerIDInput/>
		</div>
	)

	const PlayerDataDisplay = () => (
		<div className={classes.root}>
			<DailyGiftCollection collected={giftCollected}/>
			<FlexContainer className={classes.meEggs}>
				<ImageLabel imageSrc={"/images/SOUL_EGGS.png"} label={convertSymbol(playerData.game.soulEggs)}
							height={80}/>
				<ImageLabel imageSrc={"/images/PROPHECY_EGGS.png"} label={convertSymbol(playerData.game.prophecyEggs)}
							height={80}/>
			</FlexContainer>
			<Typography variant="caption">Latest game
				data: {new Date(playerData.approxTime * 1000).toLocaleString(undefined, {
					//@ts-ignore // waiting for TypeScript to add dateStyle and timeStyle into type def
					dateStyle: "medium",
					timeStyle: "short",
					hour12: true,
				})}</Typography>
		</div>
	)

	const cardTitle = playerData.userName ? `Hello, ${playerData.userName}` : "Welcome"

	// @ts-ignore
	if (!PLAYER_DATA_ENABLED) {
		return (
			<HeadedCard cardID="player" collapsable title="Welcome">
				<Alert severity="info">
					Player data service is currently down. We apologise for the inconvenience.
				</Alert>
			</HeadedCard>
		)
	}

	return (
        <HeadedCard cardID="player" collapsable title={cardTitle}>
			{!fetched && <IDPrompt/>}
			{fetching && fetched && <Loading/>}
			{!fetching && userId && <PlayerDataDisplay/>}
        </HeadedCard>
    )
}