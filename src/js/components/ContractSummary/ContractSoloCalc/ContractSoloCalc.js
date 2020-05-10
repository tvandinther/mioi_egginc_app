import React from "react"
import { Slider, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ResearchInput from "../../FarmValueContainer/FarmInputs/ResearchInput"
import Research from "../../../tools/research.json"
import GenericStatInput from "./GenericStatInput"
import { setContractCalcParameter } from "../../../actions/contractActions"
import { Copyright } from "@material-ui/icons"
import { calculateFarmStats, timeConvert, contractTimeSoloEstimate } from "../../../tools"
import { useSelector } from "react-redux"
import { SoloCalcResults } from "./SoloCalcResults"

const useStyle = makeStyles(theme => ({
	flex: {
		display: "flex",
		flexWrap: "wrap",
	},
	section: {
		margin: 10,
		padding: 10,
		borderWidth: 0,
		borderStyle: "solid",
		borderRadius: 8,
		borderColor: theme.palette.augmentColor(theme.palette.grey).main
	},
}))

export default function ContractSoloCalc(props) {
	const classes = useStyle()
	const contract = props.contract
	const coop = props.coop
	const playerContractFarm = useSelector(store => {
		if (store.playerData.fetched) {
			return store.playerData.farmsList.find(item => item.contractId === contract.name)
		}
	})
	const playerGameData = useSelector(store => {
		if (store.playerData.fetched) {
			return store.playerData.game
		}
	})

	const farmStats = (playerContractFarm && playerGameData) ? calculateFarmStats(playerContractFarm, playerGameData) : null

	function Section(props) {
		return (
			<div className={classes.section}>
				<Typography variant="h6">{props.title}</Typography>
				<Typography variant="subtitle2">{props.subtitle}</Typography>
				{props.children}
			</div>
		)
	}

	const valueData = {
		target: contract.goals.elite[contract.goals.elite.length - 1].goal,
		eggsLaid: coop ? coop.eggs : (playerContractFarm ? playerContractFarm.eggsLaid : 0),
		population: playerContractFarm ? playerContractFarm.numChickens : 0,
		maxPopulation: farmStats ? farmStats.maxHabCapacity : 0,
		shippingRate: farmStats ? farmStats.shippingCapacity : 0,
		layingRate: farmStats ? farmStats.layingRate : 0,
		hatchRate: farmStats ? farmStats.hatchRate : 0,
	}

	return (
		<div className={classes.root}>
			<Typography align="center" variant="subtitle1">Time remaining assuming solo progress using the variables below:</Typography>
			<SoloCalcResults/>
			<div className={classes.flex}>
				<Section title="Contract Target">
					<GenericStatInput name="target" value={valueData.target}/>
				</Section>
				<Section title="Eggs Laid">
					<GenericStatInput name="eggsLaid" value={valueData.eggsLaid}/>
				</Section>
				<Section title="Farm Population">
					<GenericStatInput name="population" value={valueData.population}/>
				</Section>
				<Section title="Max Hab Capacity">
					<GenericStatInput name="maxPopulation" value={valueData.maxPopulation}/>
				</Section>
				<Section title="Shipping Capacity">
					<GenericStatInput name="shippingRate" value={valueData.shippingRate}/>
				</Section>
				<Section title="Egg Laying Rate">
					<GenericStatInput name="layingRate" value={valueData.layingRate}/>
				</Section>
				<Section title="Int. Hatchery Rate">
					<GenericStatInput name="hatchRate" value={valueData.hatchRate}/>
				</Section>
				<Section>
					<ResearchInput tier={Research.epic.tier} research={Research.epic.research.find(item => item.id === "int_hatch_calm")} dispatchAction={(value) => setContractCalcParameter("hatchCalm", value)}/>
				</Section>
			</div>
		</div>
		
	)
}