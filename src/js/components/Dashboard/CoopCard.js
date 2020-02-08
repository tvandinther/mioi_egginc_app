import React, { useState } from "react"
import { Card, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"
import { getActiveContracts } from "../../actions/contractActions"
import ContractRewards from "../ContractSummary/ContractRewards"
import CoopExpiryEstimate from "../ContractSummary/CoopSummary/CoopExpiryEstimate"
import { NavLink } from "react-router-dom"

const useStyle = makeStyles(theme => ({
    root: {
        maxWidth: 550,
        margin: 10,
        flexGrow: 1,
    },
    card: {
        display: "grid",
        padding: 10,
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateAreas: `
            "image title title"
            "image subtitle subtitle"
            "rewards rewards rewards"
            "estimate estimate estimate"
        `,
        gridGap: 10,
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
    const coop = useSelector(store => store.contract.playerCoops[contract.name])
    const playerContractFarm = useSelector(store => store.playerData.farmsList.find(item => item.contractId === contract.name))
    
    let link = "/contract"
    if (contract) link += "/" + contract.name
    if (coop) link += "/" + coop.coop

    let [raised, setRaised] = useState(false)
    const toggleRaised = () => {
        setRaised(!raised)
    }
    
    return (
        <NavLink className={classes.root} to={link}>
            <Card raised={raised} onMouseOver={toggleRaised} onMouseOut={toggleRaised} className={classes.card}>
                <Typography style={{gridArea: "image / image / title / title"}} align="center" variant="h4">{(coop && coop.title) || contract.title}</Typography>
                <Typography style={{gridArea: "subtitle / image / subtitle / subtitle"}} align="center" variant="h6">Co-op: {(coop && coop.coop) || "None"}</Typography>
                <img className={classes.image} src={`/images/egg${contract.egg}.png`}/>
                <ContractRewards style={{gridArea: "rewards"}}  eggsLaid={(coop && coop.eggsLaid) || playerContractFarm.eggsLaid} rewards={contract.rewards} />
                <CoopExpiryEstimate style={{gridArea: "estimate"}} contract={contract} data={{eggsLaid: playerContractFarm.eggsLaid, layingRate: 1e12, timeLeft: metaContract.timeAccepted + metaContract.contract.lengthSeconds - (new Date() / 1000)}}/>
            </Card>
        </NavLink>
    )
}