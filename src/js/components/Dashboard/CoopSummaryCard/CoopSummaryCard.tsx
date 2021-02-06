import React from "react"
import {Typography} from "@material-ui/core"
import {useSelector} from "react-redux"
import CoopRewards from "../../ContractSummary/CoopSummary/CoopRewards"
import CoopExpiryEstimate from "../../ContractSummary/CoopSummary/CoopExpiryEstimate"
import {NavLink} from "react-router-dom"
import path from "path"
import HeadedCard from "../../HeadedCard"
import ContractIcons from "../../ContractSummary/ContractIcons"
import Loading from "../../Loading"
import calculateFarmStats from "../../../tools/farmStatTools"
import {CoopSummaryCardProps} from "../../../../types/dashboard"
import useStyle from "./styles"
import {isContractGoals} from "../../../../types/typeGuards"
import {ContractGoals} from "../../../../types/contract"

export default function CoopCard(props: CoopSummaryCardProps) {
	const classes = useStyle()
	const contract = props.contract
	const metaContract = props.metaContract
	const coopId = metaContract.coopId
	const coop = useSelector(store => store.contract.playerCoops[contract.name])
	const playerContractFarm = useSelector(store => store.playerData.farms.find(item => item.contractId === contract.name))
	const playerGameData = useSelector(store => store.playerData.game)
	const league = ["elite", "standard"][metaContract.league]
	const coopRewardSet = isContractGoals(contract.goals) ? (contract.goals[league as keyof ContractGoals]) : contract.rewards

	let loadingCoop
	if (coop) loadingCoop = coop.fetching

	let link = path.join("contract", "view", (contract ? contract.name : ""), (coopId ? coopId : ""))

	const loadingContent = [
		<Loading style={{gridArea: "rewards / estimate / rewards / estimate"}} key="loading" />,
	]
	
	let coopData
	let title
	if (coop) {
		coopData = {
			eggsLaid: coop.eggs,
			layingRate: coop.totalRate,
			timeLeft: coop.timeLeft
		}
		title = coop.coop
	}
	else {
		const farmStats = calculateFarmStats(playerContractFarm, playerGameData)
		coopData = {
			eggsLaid: playerContractFarm.eggsLaid,
			layingRate: farmStats.layingRate / 60,
			timeLeft: metaContract.timeAccepted + metaContract.contract.lengthSeconds - (new Date().getTime() / 1000)
		}
		title = "No Co-op"
	}

    const coopContent = [
        <CoopRewards key="rewards" style={{gridArea: "rewards"}} eggsLaid={(coop && coop.eggs) || playerContractFarm.eggsLaid} rewards={coopRewardSet} />,
        <CoopExpiryEstimate key="estimate" style={{gridArea: "estimate"}} rewards={coopRewardSet} data={coopData}/>,
    ]

	if (!title) title = <Loading/>

    return (
		<HeadedCard hoverable collapsable cardID={"contract_" + contract.name} title={`${contract.title}`}>
			<NavLink className={classes.card} to={link}>
				<img key="image" className={classes.image} src={`/images/egg${contract.egg}.png`}/>
				<Typography key="coop" style={{gridArea: "subtitle"}} align="center" variant="h4">{title}</Typography>
				<ContractIcons style={{gridArea: "icons"}} contract={contract} coop={coop} />
				{loadingCoop ? loadingContent : coopContent}
			</NavLink>
		</HeadedCard>
    )
}