import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import CoopCard from "./CoopCard"
import * as ContractActions from "../../actions/contractActions"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import PlayerCard from "./PlayerCard"
import QuickLinkCard from "./QuickLinkCard"
import NewsCard from "./NewsCard"
import Loading from "../Loading"
import DashboardContentManager from "../../tools/DashboardContentManager"
import { Container } from "@material-ui/core"
import { fetchPlayerCoops } from "../../tools"

const useStyle = makeStyles(theme => ({
    root: {
        gridGap: 20,
        padding: "10px 0px",
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
	const news = useSelector(store => store.app.news)
    const theme = useTheme()
    let [columnCount, setColumnCount] = useState(null)
    let coopIds = null
	if (playerData.fetched && playerData.contracts) coopIds = playerData.contracts.contractsList


    // function fetchPlayerCoops() {
    //     for (let item of coopIds) {
    //         let contractId = item.contract.identifier
    //         let coopId = item.coopIdentifier
    //         if (coopId) dispatch(ContractActions.getCoop(coopId, contractId, true))
    //     }
    // }

    useEffect(() => {
        if (playerData.fetched && coopIds && (Object.keys(playerCoops).length === 0 && playerCoops.constructor === Object)) {
            fetchPlayerCoops(coopIds, dispatch)
        }
    }, [playerData.userId]) 

    let dcm = new DashboardContentManager({
        rootClass: classes.root,
        columnClass: classes.column,
    })
	// NEWS
	if (news.fetched && news.posts) {
		dcm.addItem(
			<NewsCard post={news.posts[0]} priority={2} key="post"/>
		)
	}
    // QUICK LINKS
    dcm.addItem(
        <QuickLinkCard key="contractLink" priority={3} link="/contract" title="Contracts" body="Click to see all of the current contracts!"/>
    )
    // PLAYER CONTRACTS
    if (activeContracts.fetched && coopIds) {
        coopIds.forEach((metaContract, index) => {
			let contract = activeContracts.contracts[metaContract.contract.identifier]
			if (contract !== undefined) dcm.addItem(
				<CoopCard key={index} priority={1} metaContract={metaContract} contract={contract}/>
			)
		})
    }
	
	dcm.addItem(<PlayerCard key="playerCard" priority={0}/>)

    useEffect(() => {
        if (window.innerWidth > theme.breakpoints.values.lg) setColumnCount(3)
        else if (window.innerWidth > theme.breakpoints.values.md) setColumnCount(2)
        else setColumnCount(1)
    }, [window.innerWidth])
    
    return (
		<Container>
            {dcm.render(columnCount)}
		</Container>
    )
}