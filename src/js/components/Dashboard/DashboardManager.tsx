import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import DashboardOptions, {CoopSummaryCardProps} from "../../../types/dashboard"
import Dashboard from "./Dashboard"
import {fetchPlayerCoops} from "../../tools"

export default function DashboardManager() {

	const playerData = useSelector(store => store.playerData)
	const newsPosts = useSelector(store => store.app.news.posts)
	const activeContracts = useSelector(store => store.contract.activeContracts)

	const dispatch = useDispatch()
	const playerCoops = useSelector(store => store.contract.playerCoops)
	// Not sure why this is necessary tbh
	useEffect(() => {
		if (playerData.fetched && coopIds && (Object.keys(playerCoops).length === 0 && playerCoops.constructor === Object)) {
			fetchPlayerCoops(coopIds, dispatch)
		}
	}, [playerData.eiUserId])

	const coopIds = playerData?.contracts?.contracts
	let contractCards: CoopSummaryCardProps[] = []

	if (activeContracts.fetched && coopIds) {
		coopIds.forEach((metaContract, index) => {
			let contract = activeContracts.contracts[metaContract.contract.id]
			if (contract !== undefined) {
				contractCards.push({
					show: true,
					key: String(index),
					priority: 1,
					metaContract: metaContract,
					contract: contract,
				})
			}
		})
	}

	let dashboardOptions: DashboardOptions = {
		cards: {
			player: {
				show: true,
				key: "player-card",
				priority: 0,
				playerData: playerData,
			},
			news: {
				show: true,
				key: "news-post",
				priority: 2,
				post: newsPosts[0] // latest
			},
			links: [
				{
					show: true,
					key: "contract-link",
					priority: 3,
					link: "/contract",
					title: "Contracts",
					body: "Click to see all of the current contracts!",
				}
			],
			contracts: contractCards,
		}
	}

	return (
		<Dashboard options={dashboardOptions}/>
	)
}