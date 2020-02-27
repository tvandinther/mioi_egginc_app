import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CoopCard from "./CoopCard"
import * as ContractActions from "../../actions/contractActions"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import PlayerIDPromptCard from "./PlayerIDPromptCard"
import QuickLinkCard from "./QuickLinkCard"
import NewsCard from "./NewsCard"
import Loading from "../Loading"
import DashboardContentManager from "../../tools/DashboardContentManager"

const useStyle = makeStyles(theme => ({
    root: {
        gridGap: 20,
        padding: "20px 0px",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        "& >*": {
            margin: "10px 0px"
        },
    }
}))

export default function Dashboard(props) {
    const classes = useStyle()
    const dispatch = useDispatch()
    const playerData = useSelector(store => store.playerData)
    const activeContracts = useSelector(store => store.contract.activeContracts)
    const playerCoops = useSelector(store => store.contract.playerCoops)
    const playerId = useSelector(store => store.settings.playerId)
    const theme = useTheme()
    let [columnCount, setColumnCount] = useState(null)
    const coopIds = playerData.fetched ? playerData.contracts.contractsList : null

    function fetchPlayerCoops() {
        for (let item of coopIds) {
            let contractId = item.contract.identifier
            let coopId = item.coopIdentifier
            if (coopId) dispatch(ContractActions.getCoop(coopId, contractId, true))
        }
    }

    useEffect(() => {
        if (playerData.fetched && (Object.keys(playerCoops).length === 0 && playerCoops.constructor === Object)) {
            fetchPlayerCoops()
        }
    }, [playerData.userId]) 

    let dcm = new DashboardContentManager({
        rootClass: classes.root,
        columnClass: classes.column,
    })
    // NEWS
    dcm.addItem(
        <NewsCard priority={2} key="post"/>
    )
    // QUICK LINKS
    dcm.addItem(
        <QuickLinkCard key="contractLink" priority={3} link="/contract" title="Contracts" body="Click to see all of the current contracts!"/>
    )
    // PLAYER CONTRACTS
    if (activeContracts.fetched && playerData.fetched) {
        coopIds.forEach((metaContract, index) => dcm.addItem(
            <CoopCard key={index} priority={1} metaContract={metaContract} contract={activeContracts.contracts[metaContract.contract.identifier]}/>
        ))
    }
    // PLAYER ID PROMPT
    if (!playerId) {
        dcm.addItem(
            <PlayerIDPromptCard priority={0} key="idPrompt"/>
        )
    }
    useEffect(() => {
        if (window.innerWidth > theme.breakpoints.values.lg) setColumnCount(3)
        else if (window.innerWidth > theme.breakpoints.values.md) setColumnCount(2)
        else setColumnCount(1)
    }, [window.innerWidth])
    
    return (
            dcm.render(columnCount)
    )
}