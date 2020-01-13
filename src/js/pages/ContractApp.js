// FRAMEWORK
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Switch, Route } from "react-router-dom"
// ACTIONS
import * as contractActions from "../actions/contractActions"
// RESOURCES

// COMPONENTS
import { Container } from "@material-ui/core"
import Navbar from "../components/Navbar"
import MultiColumn from "../components/MultiColumn"
import ContractList from "../components/ContractList"
import ContractSummary from "../components/ContractSummary/ContractSummary"

function ContractApp(props) {
    const pageDetails = {
        title: "Welcome to Home",
        shortTitle: "Contract",
    }
    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, "Contracts"].join(" | ")
        return () => document.title = oldTitle
    }, [])

    useEffect(() => {props.getActiveContracts()}, [])
    return (
        <div className="Page">
            <Navbar title={pageDetails.shortTitle}/>
            
            <MultiColumn scrolled={props.contractApp.viewContract} sizeFormat={props.sizeFormat}>
                <ContractList {...props} activeContracts={props.contractApp.activeContracts.contracts}/>
                <Switch>
                    <Route exact path={`${props.match.path}`}>
                        <div>Select a contract to view more information</div>
                    </Route>
                    <Route path={`${props.match.path}/:contractId`}>
                        <Container style={{overflowY: "auto"}}>
                            <ContractSummary {...props}/>
                        </Container>
                    </Route>
                </Switch>
            </MultiColumn>
        </div>
    )
}

const mapStateToProps = store => {
    const { contract: contractApp, UI: {sizeFormat, isSidebarVisible} } = store;
	return {
        contractApp,
        sizeFormat,
        isSidebarVisible,
	}
}

const mapDispatchToProps = {
	...contractActions
}

const connectedContractApp = connect(mapStateToProps, mapDispatchToProps)(ContractApp)

export default connectedContractApp