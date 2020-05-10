import React, { useState } from "react"
import { Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"
import { getActiveContracts } from "../../actions/contractActions"
import CoopRewards from "../ContractSummary/CoopSummary/CoopRewards"
import CoopExpiryEstimate from "../ContractSummary/CoopSummary/CoopExpiryEstimate"
import { NavLink } from "react-router-dom"
import HeadedCard from "../HeadedCard"
import ContractIcons from "../ContractSummary/ContractIcons"
import Loading from "../Loading"
import calculateFarmStats from "../../tools/farmStatTools"

const useStyle = makeStyles(theme => ({
    card: {
        display: "grid",
        gridTemplateColumns: "70px 1fr 1fr",
        gridTemplateAreas: `
            "image subtitle subtitle"
            "icons icons icons"
            "rewards rewards rewards"
            "estimate estimate estimate"
        `,
        gridGap: 10,
		alignItems: "center",
		wordBreak: "break-word",
    },
    image: {
        gridArea: "image",
            width: 80,
    }
}))

export default function CoopCard(props) {
    const classes = useStyle()
    const contract = props.contract
    const metaContract = props.metaContract
    const coopId = metaContract.coopIdentifier
    const coop = useSelector(store => store.contract.playerCoops[contract.name])
	const playerContractFarm = useSelector(store => store.playerData.farmsList.find(item => item.contractId === contract.name))
	const playerGameData = useSelector(store => store.playerData.game)
	const farmStats = calculateFarmStats(playerContractFarm, playerGameData)
	const league = metaContract.league === 0 ? "elite" : "standard"
	const coopRewards = contract.goals[league]
    let loadingCoop
    if (coop) loadingCoop = coop.fetching
    
    let link = "/contract/view"
    if (contract) link += "/" + contract.name
    if (coopId) link += "/" + coopId
    
    const loadingContent = [
                <Loading style={{gridArea: "rewards / estimate / rewards / estimate"}} key="loading" />,
	]
	
    const coopContent = [
        <Typography key="coop" style={{gridArea: "subtitle"}} align="center" variant="h4">{(coop && coop.coop) || "No Co-op"}</Typography>,
        <CoopRewards key="rewards" style={{gridArea: "rewards"}}  eggsLaid={(coop && coop.eggs) || playerContractFarm.eggsLaid} rewards={coopRewards} />,
        <CoopExpiryEstimate key="estimate" style={{gridArea: "estimate"}} rewards={coopRewards} data={(coop && {eggsLaid: coop.eggs, layingRate: coop.totalRate, timeLeft: coop.timeLeft} ) || {eggsLaid: playerContractFarm.eggsLaid, layingRate: farmStats.layingRate, timeLeft: metaContract.timeAccepted + metaContract.contract.lengthSeconds - (new Date() / 1000)}}/>,
    ]

    return (
		<HeadedCard hoverable collapsable title={`${contract.title}`} className={classes.root}>
			<NavLink className={classes.card} to={link}>
				<img key="image" className={classes.image} src={`/images/egg${contract.egg}.png`}/>
				<ContractIcons style={{gridArea: "icons"}} contract={contract} coop={coop} />
				{loadingCoop ? loadingContent : coopContent}
			</NavLink>
		</HeadedCard>
    )
}