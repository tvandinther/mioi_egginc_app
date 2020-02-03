// FRAMEWORK
import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader";
import { useSwipeable, Swipeable } from 'react-swipeable'
import { connect } from "react-redux"

import { useClickAway } from "./customHooks/customHooks"
// ACTIONS
import * as UIActions from "./actions/UIActions"
// RESOURCES
import "../css/App.css";
import Pages from "./pages/pageRoutes"
import PageNotFound from "./pages/_404"
// COMPONENTS
import SidebarMenu from "./components/SidebarMenu/SidebarMenu"
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
	root: {
		backgroundColor: theme.palette.grey["200"],
	},
	toolbar: theme.mixins.toolbar,
}))

function App(props) {
	const classes = useStyle()
	
	useEffect(() => {
		window.addEventListener("resize", props.resizePage)
		return () => window.removeEventListener("resize", props.resizePage)
	}, [])

	return (
			<Swipeable className={classes.root + " App"}>
				<Router>
					<SidebarMenu />
					<div className={classes.toolbar}></div>
					<Switch>
						<Route exact path="/" component={Pages.Home} />
						<Route path="/contract" component={Pages.ContractApp} />
						<Route path="/guide" component={Pages.GameGuide} />
						<Route path="/settings" component={Pages.Settings} />
						<Route component={PageNotFound} />
					</Switch>
				</Router>
			</Swipeable>
	)
}

const mapDispatchToProps = {
	...UIActions
}

const connectedApp = connect(null, mapDispatchToProps)(App)

// export default hot(module)(App)
export default hot(module)(connectedApp);