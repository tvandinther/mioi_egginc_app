import React, { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import CoopSearch from "./CoopSearch"
import { showContract, hideContract, updateContractCoopSearchString } from "../../actions/contractActions"
import ContractIcons from "./ContractIcons"
import ContractSoloCalcPanel from "./ContractSoloCalcPanel"
import CoopSummary from "./CoopSummary"
import BackButton from "../BackButton"
import { Typography, Card, } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	root: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateAreas: `
            "back-button back-button back-button"
			"image image image"
			"title title title"
            "description description description"
            "icons icons icons"
            "search search search"
			"coop coop coop"
			"calc calc calc"
        `,
        gridColumnGap: "10px",
		gridRowGap: "15px",
		alignItems: "center",
		margin: 25,
		padding: 25,

		"@media (max-width: 840px)": {
			margin: "16px 8px",
			paddingLeft: 16,
			paddingRight: 16,
		}
    }
}))

export default function ContractSummary(props) {
    const classes = useStyle()
    const dispatch = useDispatch()

    let { contractId } = useParams()
    useEffect(() => {
        dispatch(showContract())
        return () => dispatch(hideContract())
	}, [])
	
    const history = useHistory()
    const goBack = () => {
        history.push(props.match.url)
        dispatch(hideContract())
    }

    const contract = useSelector(store => store.contract.activeContracts.contracts[contractId])
    const coop = useSelector(store => store.contract.coops[contractId])
    const fetched = useSelector(store => store.contract.activeContracts.fetched)

    const pathArray = window.location.pathname.split('/')
    let coopId = pathArray[pathArray.findIndex(item => item === contractId) + 1]
    if (coopId && !coop && fetched) dispatch(updateContractCoopSearchString(contractId, coopId))

    if (contract) {
        return (
            <Card className={classes.root}>
                <BackButton style={{gridArea: "back-button"}} onClick={goBack} to={props.match.url} />
                <img style={{gridArea: "image", maxWidth: "100%", maxHeight: "100px", margin: "auto"}} src={`/images/egg${contract.egg}.png`}></img>
                <Typography style={{gridArea: "title"}} variant="h4">{contract.title}</Typography>
                <Typography style={{gridArea: "description"}} variant="subtitle1">{contract.description}</Typography>
                <ContractIcons contract={contract} coop={coop}/>
                {contract.coopAllow && <CoopSearch style={{gridArea: "search"}} {...contract.coopSearch} contractId={contractId}/>}
                <CoopSummary style={{gridArea: "coop"}} contract={contract}/>
				<ContractSoloCalcPanel style={{gridArea: "calc"}} contract={contract} coop={coop}/>
            </Card>
        )
    }
    return null
}