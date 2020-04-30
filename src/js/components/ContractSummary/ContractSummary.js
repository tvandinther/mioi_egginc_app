import React, { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { useSwipeable } from "react-swipeable"
import CoopSearch from "./CoopSearch"
import { showContract, hideContract, updateContractCoopSearchString } from "../../actions/contractActions"
import ContractIcons from "./ContractIcons"
import ContractRewards from "./CoopSummary/CoopRewards"
import CoopSummary from "./CoopSummary"
import BackButton from "../BackButton"
import { Typography, Card } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
	root: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateAreas: `
            "back-button back-button back-button"
            "image title title"
            "description description description"
            "icons icons icons"
            "search search search"
            "coop coop coop"
        `,
        gridColumnGap: "10px",
		gridRowGap: "15px",
		alignItems: "center",
		margin: 25,
		padding: 25,
    }
}))

function ContractSummary(props) {
    const classes = useStyle()

    let { contractId } = useParams()
    useEffect(() => {
        props.showContract()
        return props.hideContract
    }, [])

    const history = useHistory()
    const goBack = () => {
        history.push(props.match.url)
        props.hideContract()
    }
    const swipeHandlers = useSwipeable({
        onSwipedRight: () => {
            if (!props.isSidebarVisible) goBack() // Ideally want to prevent additonal handlers from firing but this will do the trick
        },
        delta: 100,
    })

    const contract = props.activeContracts.contracts[contractId]
    const coop = props.coops[contractId]

    const pathArray = window.location.pathname.split('/')
    let coopId = pathArray[pathArray.findIndex(item => item === contractId) + 1]
    if (coopId && !coop && props.activeContracts.fetched) props.updateContractCoopSearchString(contractId, coopId)

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
            </Card>
        )
    }
    return null
}

const mapStateToProps = state => {
    const { UI: { isSidebarVisible }, contract: { activeContracts, coops }} = state
    return {
        isSidebarVisible,
        activeContracts,
        coops,
    }
}

const mapDispatchToProps = {
    showContract,
    hideContract,
    updateContractCoopSearchString,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractSummary)