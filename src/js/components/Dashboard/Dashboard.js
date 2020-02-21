import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CoopCard from "./CoopCard"
import * as ContractActions from "../../actions/contractActions"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import PlayerIDPromptCard from "./PlayerIDPromptCard"
import QuickLinkCard from "./QuickLinkCard"
import NewsCard from "./NewsCard"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: 20,
        padding: "20px 0px",
    }
}))

function dashboardContentManager(data) {
    const coopIds = data.playerData.fetched ? data.playerData.contracts.contractsList : null
    const dispatch = useDispatch()

    useEffect(() => {
        if (data.playerData.fetched) {
            for (let item of coopIds) {
                let contractId = item.contract.identifier
                let coopId = item.coopIdentifier
                if (coopId) dispatch(ContractActions.getCoop(coopId, contractId, true))
            }
        }
    }, [])

    let content = []
    // PLAYER CONTRACTS
    if (data.activeContracts.fetched && data.playerData.fetched) {
        coopIds.forEach((metaContract, index) => content.push(
            <CoopCard key={index} metaContract={metaContract} contract={data.activeContracts.contracts[metaContract.contract.identifier]}/>
        ))
    }
    // PLAYER ID PROMPT
    if (!data.playerData.fetched && !data.playerId) {
        content.push(
            <PlayerIDPromptCard/>
        )
    }
    // NEWS
    content.push(
        <NewsCard/>
    )
    // QUICK LINKS
    content.push(
        <QuickLinkCard key="contractLink" link="/contract" title="Contracts" body="Click to see all of the current contracts!"/>,
    )
    return (
        content || "Loading..."
    )
}

export default function Dashboard(props) {
    const classes = useStyle()
    const playerData = useSelector(store => store.playerData)
    const activeContracts = useSelector(store => store.contract.activeContracts)
    const playerId = useSelector(store => store.settings.playerId)
    const UI = useSelector(store => store.UI)

    const theme = useTheme()
    let [gridStyle, setGridStyle] = useState(null)
    useEffect(() => {
        if (window.innerWidth > theme.breakpoints.values.lg) setGridStyle({gridTemplateColumns: "1fr 1fr 1fr",})
        else if (window.innerWidth > theme.breakpoints.values.md) setGridStyle({gridTemplateColumns: "1fr 1fr",})
        else setGridStyle({gridTemplateColumns: "1fr",})
    }, UI.width)
    
    return (
        <div className={classes.root} style={gridStyle}>
            {dashboardContentManager({
                activeContracts,
                playerData,
                playerId,
            })}
        </div>
    )
}