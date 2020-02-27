import React, { useState } from "react"
import { Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"
import { getActiveContracts } from "../../actions/contractActions"
import ContractRewards from "../ContractSummary/ContractRewards"
import CoopExpiryEstimate from "../ContractSummary/CoopSummary/CoopExpiryEstimate"
import { NavLink } from "react-router-dom"
import HeadedCard from "../HeadedCard"
import ContractIcons from "../ContractSummary/ContractIcons"
import Loading from "../Loading"

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
    let loadingCoop
    if (coop) loadingCoop = coop.fetching
    
    let link = "/contract"
    if (contract) link += "/" + contract.name
    if (coopId) link += "/" + coopId
    
    const loadingContent = [
                <Loading style={{gridArea: "rewards / estimate / rewards / estimate"}} key="loading" />,
    ]
    
    const coopContent = [
        <Typography key="coop" style={{gridArea: "subtitle"}} align="center" variant="h4">{(coop && coop.coop) || "No Co-op"}</Typography>,
        <ContractRewards key="rewards" style={{gridArea: "rewards"}}  eggsLaid={(coop && coop.eggs) || playerContractFarm.eggsLaid} rewards={contract.rewards} />,
        <CoopExpiryEstimate key="estimate" style={{gridArea: "estimate"}} contract={contract} data={(coop && {eggsLaid: coop.eggs, layingRate: coop.totalRate, timeLeft: coop.timeLeft} ) || {eggsLaid: playerContractFarm.eggsLaid, layingRate: 1e12, timeLeft: metaContract.timeAccepted + metaContract.contract.lengthSeconds - (new Date() / 1000)}}/>,
    ]

    return (
        <NavLink className={classes.root} to={link}>
            <HeadedCard hoverable title={`${contract.title}`} className={classes.card}>
                <img key="image" className={classes.image} src={`/images/egg${contract.egg}.png`}/>
                <ContractIcons style={{gridArea: "icons"}} contract={contract} coop={coop} />
                {loadingCoop ? loadingContent : coopContent}
            </HeadedCard>
        </NavLink>
    )
}