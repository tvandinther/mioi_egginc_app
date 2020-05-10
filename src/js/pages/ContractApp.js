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
        shortTitle: "Contracts",
    }
    useEffect(() => {
        const oldTitle = document.title
        document.title = [oldTitle, pageDetails.shortTitle].join(" | ")
        return () => document.title = oldTitle
    }, [])

    // // OLD HYBRID VIEW - COMPLEX AND BORKEN
    // return (
    //     <div className="Page">
    //         <Navbar title={pageDetails.shortTitle} />
    //         <MultiColumn scrolled={props.viewContract}>
    //             <ContractList match={props.match} />
    //             <Switch>
    //                 <Route exact path={`${props.match.path}`}>
    //                     <div>Select a contract to view more information</div>
    //                 </Route>
    //                 <Route path={`${props.match.path}/:contractId`}>
    //                     <Container disableGutters style={{overflowY: "auto"}}>
    //                         <ContractSummary match={props.match}/>
    //                     </Container>
    //                 </Route>
    //             </Switch>
    //         </MultiColumn>
    //     </div>
    // )


    // MOBILE VIEW - SIMPLE
    return (
        <div>
            <Navbar title={pageDetails.shortTitle} />
            <Switch>
                <Route exact path={`${props.match.path}`}>
                    <ContractList match={props.match} />
                </Route>
                <Route path={`${props.match.path}/view/:contractId`}>
                    <Container disableGutters style={{overflowY: "auto"}}>
                        <ContractSummary match={props.match}/>
                    </Container>
                </Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = store => {
    const { contract: { viewContract } } = store;
	return {
        viewContract,
	}
}

const mapDispatchToProps = {
	...contractActions
}

const connectedContractApp = connect(mapStateToProps, mapDispatchToProps)(ContractApp)

export default connectedContractApp