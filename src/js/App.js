// FRAMEWORK
import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader";
import { useSwipeable, Swipeable } from 'react-swipeable'
import { connect, useSelector } from "react-redux"

import { useClickAway } from "./customHooks/customHooks"
// ACTIONS
import actions from "./actions"
// RESOURCES
import "../css/App.css";
import Pages from "./pages/pageRoutes"
import PageNotFound from "./pages/_404"
// COMPONENTS
import SidebarMenu from "./components/SidebarMenu/SidebarMenu"
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const useStyle = makeStyles(theme => ({
	root: {
		backgroundColor: null, //theme.palette.background.base,
	},
	toolbar: theme.mixins.toolbar,
}))

function App(props) {
	const classes = useStyle()
	const theme = useTheme()
	const settings = useSelector(state => state.settings)
	useEffect(() => {
		let metaThemeColor = document.querySelector("meta[name=theme-color]")
    	metaThemeColor.setAttribute("content", theme.palette.primary.main)
	}, [theme.palette.primary.main])
	
	useEffect(() => {
		window.addEventListener("resize", props.resizePage)
		return () => window.removeEventListener("resize", props.resizePage)
	}, [])

	useEffect(() => {props.getActiveContracts()}, [])
	useEffect(() => {props.validatePlayerId(settings.playerId)}, [])

	return (
			<Swipeable className={classes.root + " App"}>
				<CssBaseline/>
				<Router>
					<SidebarMenu />
					<div className={classes.toolbar}></div>
					<Switch>
						<Route exact path="/" component={Pages.MyFarm} />
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
	...actions
}

const connectedApp = connect(null, mapDispatchToProps)(App)

// export default hot(module)(App)
export default hot(module)(connectedApp);