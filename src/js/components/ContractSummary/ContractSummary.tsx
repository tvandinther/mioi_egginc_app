import React, {useEffect} from "react"
import {RouteComponentProps, useHistory, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import CoopSearch from "./CoopSearch"
import {updateContractCoopSearchString} from "../../actions/contractActions"
import ContractIcons from "./ContractIcons"
import ContractSoloCalcPanel from "./ContractSoloCalcPanel"
import CoopSummary from "./CoopSummary"
import BackButton from "../BackButton"
import {Card, Typography,} from "@material-ui/core"
import useStyle from "./styles"
import {getEggDetails} from "../../tools";

export default function ContractSummary({match}: RouteComponentProps) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const history = useHistory()

	let {contractId} = useParams<{ contractId: string }>()
	const pathArray = window.location.pathname.split('/')
	let coopId = pathArray[pathArray.findIndex(item => item === contractId) + 1]

	const contract = useSelector(store => store.contract.activeContracts.contracts[contractId])
	const coop = useSelector(store => store.contract.coops[contractId])
	const fetched = useSelector(store => store.contract.activeContracts.fetched)

	useEffect(() => {
		if (coopId) dispatch(updateContractCoopSearchString(contractId, coopId))
	}, [fetched, coopId])

    const goBack = () => {
        history.push(match.url)
    }

	if (contract) {
		return (
			<Card className={classes.root}>
				<BackButton/>
				<img style={{gridArea: "image", maxWidth: "100%", maxHeight: "100px", margin: "auto"}}
					 src={`/images/egg${contract.egg}.png`} alt={getEggDetails(contract.egg).name}/>
				<Typography style={{gridArea: "title"}} variant="h4">{contract.title}</Typography>
				<Typography style={{gridArea: "description"}} variant="subtitle1">{contract.description}</Typography>
				<ContractIcons style={{gridArea: "icons"}} contract={contract} coop={coop}/>
				{contract.coopAllow &&
				<CoopSearch style={{gridArea: "search"}} initialSearch={coopId} {...contract.coopSearch}
							contractId={contractId}/>}
				<CoopSummary style={{gridArea: "coop"}} contract={contract}/>
				<ContractSoloCalcPanel style={{gridArea: "calc"}} contract={contract} coop={coop}/>
			</Card>
		)
	}
	return null
}