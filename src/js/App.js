// FRAMEWORK
import React, { useEffect, Suspense, lazy } from "react";
import { Router as Router, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader";
import { useDispatch, useSelector } from "react-redux"
import { createBrowserHistory } from "history"
import ReactGA from "react-ga"

// ACTIONS
import { fetchNews } from "./actions/appActions"
import { validatePlayerId } from "./actions/settingsActions"
import { getActiveContracts } from "./actions/contractActions"

import PageNotFound from "./pages/_404"
// COMPONENTS
import SidebarMenu from "./components/SidebarMenu/SidebarMenu"
import Header from "./components/Header"
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import EntryPopup from "./components/EntryPopup";
import Loading from "./components/Loading"

const history = createBrowserHistory()

let trackingID

if (process.env.NODE_ENV !== "production") {
	const trackingIDs = {
		"egginc.mioi.io": "UA-120158257-2",
		"cordless.cloud": "UA-120158257-1",
		"localhost:3000": "UA-120158257-1",
	}
	trackingID = trackingIDs[window.location.host] || null
}
if (process.env.NODE_ENV === "production") {
	trackingID = TRACKING_ID
}

ReactGA.initialize(trackingID)

ReactGA.pageview(history.location.pathname) // immediate pageview is recorded

history.listen(location => {
	ReactGA.pageview(location.pathname)
})

window.addEventListener('load', event => {
	const timing = window.performance.timing
	const totalLoadTime = timing.loadEventStart - timing.fetchStart
	
	ReactGA.timing({
		category: "Site",
		variable: "Load",
		value: totalLoadTime,
	})
})

const useStyle = makeStyles(theme => ({
	root: {
		backgroundColor: null, //theme.palette.background.base,
	},
	toolbar: theme.mixins.toolbar,
}))

function App(props) {
	const classes = useStyle()
	const theme = useTheme()
	const dispatch = useDispatch()
	const settings = useSelector(state => state.settings)
	useEffect(() => {
		let metaThemeColor = document.querySelector("meta[name=theme-color]")
    	metaThemeColor.setAttribute("content", theme.palette.primary.main)
	}, [theme.palette.primary.main])
	
	useEffect(() => {
		window.addEventListener("resize", props.resizePage)
		return () => window.removeEventListener("resize", props.resizePage)
	}, [])

	useEffect(() => {dispatch(getActiveContracts())}, [])
	useEffect(() => {
		if (settings.playerId) dispatch(validatePlayerId(settings.playerId))
	}, [])
	useEffect(() => {dispatch(fetchNews(5))}, [])

	const Home = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home"))
	const ContractApp = lazy(() => import(/* webpackChunkName: "contract" */ "./pages/ContractApp"))
	const FarmValue = lazy(() => import(/* webpackChunkName: "farmvalue" */ "./pages/FarmValue"))
	const Settings = lazy(() => import(/* webpackChunkName: "settings" */ "./pages/AppSettings"))
	const News = lazy(() => import(/* webpackChunkName: "news" */ "./pages/News"))

	return (
		<div>
			<CssBaseline/>
			<Router history={history}>
				<SidebarMenu />
				<div className={classes.toolbar}></div>
				<EntryPopup/>
				<Header/>
				<Suspense fallback={<Loading/>}>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/contract" component={ContractApp} />
						<Route path="/farmvalue" component={FarmValue} />
						<Route path="/settings" component={Settings} />
						<Route path="/news" component={News} />
						<Route component={PageNotFound} />
					</Switch>
				</Suspense>
			</Router>
		</div>
	)
}

export default hot(module)(App)