import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import CoopCard from "./CoopCard"
import * as ContractActions from "../../actions/contractActions"
import { LocalDining } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        margin: "20px 0px",
        justifyContent: "space-evenly",
    }
}))

export default function Dashboard(props) {
    const dispatch = useDispatch()
    const classes = useStyle()
    const playerData = useSelector(store => store.playerData)
    const activeContracts = useSelector(store => store.contract.activeContracts)
    const coopIds = playerData.fetched ? playerData.contracts.contractsList : null

    useEffect(() => {
        if (playerData.fetched) {
            for (let item of coopIds) {
                let contractId = item.contract.identifier
                let coopId = item.coopIdentifier
                if (coopId) dispatch(ContractActions.getCoop(coopId, contractId, true))
            }
        }
    }, [])
    
    if (activeContracts.fetched && playerData.fetched) {
        const coopCards = coopIds.map((metaContract, index) => (
            <CoopCard key={index} metaContract={metaContract} contract={activeContracts.contracts[metaContract.contract.identifier]}/>
        ))
        return (
            <div className={classes.root}>
                {coopCards}
            </div>
        )
    }
    else {
        return (
            <div className={classes.root}>
                Loading...
            </div>
        )
    }
}