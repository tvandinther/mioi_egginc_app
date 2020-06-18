import React from "react"
import { Slider, Typography, Divider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ResearchInput from "../../FarmValueContainer/FarmInputs/ResearchInput"
import Research from "../../../tools/research.json"
import GenericStatInput from "./GenericStatInput"
import { setContractCalcParameter } from "../../../actions/contractActions"
import { Copyright, Settings } from "@material-ui/icons"
import { calculateFarmStats, timeConvert, contractTimeSoloEstimate } from "../../../tools"
import { useSelector } from "react-redux"
import { SoloCalcResults } from "./SoloCalcResults"
import ContractTargetInput from "./ContractTargetInput"
import SettingsSwitch from "../../appSettings/SettingsSwitch"
import switchProfiles from "../../appSettings/switchProfiles.json"
import HelpTooltip from "../../Decorator/HelpTooltip"

const useStyle = makeStyles(theme => ({
	flex: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	section: {
		flexGrow: 1,
		margin: 10,
		padding: 10,
		borderWidth: 1,
		borderStyle: "solid",
		borderRadius: 8,
		borderColor: theme.palette.augmentColor(theme.palette.grey).main
	},
}))

export default function ContractSoloCalc(props) {
	const classes = useStyle()
	const { contract, coop } = props
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
				<Typography align="center" variant="h6">{props.title}</Typography>
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
			<SettingsSwitch {...switchProfiles.groupCalc} style={{margin: "auto"}}>
				<HelpTooltip helpText="Multiplies all values by the current number of members in your co-op during calculation (or max members if you are not in one)."/>
			</SettingsSwitch>
			<SoloCalcResults/>
			<Divider/>
			<div className={classes.flex}>
				<Section title="Contract Target">
					<ContractTargetInput contract={contract}/>
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
					<ResearchInput
						tier={Research.epic.tier}
						research={Research.epic.research.find(item => item.id === "int_hatch_calm")}
						dispatchAction={(value) => setContractCalcParameter("hatchCalm", value)}
					/>
				</Section>
			</div>
		</div>
		
	)
}