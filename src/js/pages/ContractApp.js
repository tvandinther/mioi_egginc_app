// FRAMEWORK
import React, { useEffect } from "react"

import { Switch, Route } from "react-router-dom"
// ACTIONS

// RESOURCES

// COMPONENTS
import { Container } from "@material-ui/core"
import Page from "../Page"
import ContractList from "../components/ContractList"
import ContractSummary from "../components/ContractSummary/ContractSummary"

export default function ContractApp(props) {
	return (
		<Page title="Contracts" shortTitle="Contracts">
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
		</Page>
	)
}