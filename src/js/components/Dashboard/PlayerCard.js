import React from "react"
import HeadedCard from "../HeadedCard"
import PlayerIDInput from "../appSettings/PlayerIDInput"
import { Typography } from "@material-ui/core"
import { useSelector } from "react-redux"
import { convertSymbol, getDayIndex } from "../../tools"
import Loading from "../Loading"
import FlexContainer from "../FlexContainer"
import ImageLabel from "../Decorator/ImageLabel"

export default function PlayerCard(props) {
	const playerData = useSelector(store => store.playerData)
	const fetched = playerData.fetched
	const fetching = playerData.fetching
	const userId = playerData.userId
	const giftCollected = fetched ? playerData.game.lastDailyGiftCollectedDay >= getDayIndex(new Date()) : undefined

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
		<div>
			<Typography>Daily Gift Collected: {giftCollected ? "Yes" : "No"}</Typography>
			<FlexContainer>
				<ImageLabel imageSrc={"/images/SOUL_EGGS.png"} label={convertSymbol(playerData.game.soulEggsD)} height={80} />
				<ImageLabel imageSrc={"/images/PROPHECY_EGGS.png"} label={convertSymbol(playerData.game.eggsOfProphecy)} height={80} />
			</FlexContainer>
			<Typography variant="caption">Latest game data: {new Date(playerData.approxTime * 1000).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                    hour12: true,
                })}</Typography>
		</div>
	)

	const cardTitle = playerData.userName ? `Hello, ${playerData.userName}` : "Welcome"

    return (
        <HeadedCard collapsable title={cardTitle}>
			{!fetched && <IDPrompt/>}
			{fetching && fetched && <Loading/>}
			{!fetching && userId && <PlayerDataDisplay/>}
        </HeadedCard>
    )
}