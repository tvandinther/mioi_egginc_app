// FRAMEWORK
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Switch, Route } from "react-router-dom"
// ACTIONS
import * as contractActions from "../actions/contractActions"
// RESOURCES
import siteMetaData from "../siteMetadata.json"
// COMPONENTS
import Navbar from "../components/Navbar"
import MultiColumn from "../components/MultiColumn"
import ContractList from "../components/ContractList"
import ContractSummary from "../components/ContractSummary"

function ContractApp(props) {
    const pageDetails = {
        title: "Welcome to Home",
        shortTitle: "Contract",
    }
    useEffect(() => {
        document.title = [siteMetaData.siteTitle, "Contracts"].join(" | ")
        return () => document.title = siteMetaData.siteTitle
    }, [])

    useEffect(() => {props.getActiveContracts()}, [])
    return (
        <div className="Page">
            
            <MultiColumn scrolled={props.contractApp.viewContract} sizeFormat={props.UI.sizeFormat}>
                <ContractList {...props} activeContracts={props.contractApp.activeContracts.contractsList}/>
                <Switch>
                    <Route exact path={`${props.match.path}`}>
                        <div>Select a contract to view more information</div>
                    </Route>
                    <Route path={`${props.match.path}/:contractId`}>
                        <ContractSummary {...props} showContract={props.showContract} activeContracts={props.contractApp.activeContracts.contractsList}/>
                    </Route>
                </Switch>
            </MultiColumn>
        </div>
    )
}

const mapStateToProps = store => {
	return {
        contractApp: store.contract,
        UI: store.UI,
	}
}

const mapDispatchToProps = {
	...contractActions
}

const connectedContractApp = connect(mapStateToProps, mapDispatchToProps)(ContractApp)

export default connectedContractApp