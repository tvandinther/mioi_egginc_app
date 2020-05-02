// FRAMEWORK
import React, { useRef, useEffect } from "react";
import { Router as Router, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader";
import { Swipeable } from 'react-swipeable'
import { useDispatch, useSelector } from "react-redux"
import { createBrowserHistory } from "history"
import ReactGA from "react-ga"

// ACTIONS
import { fetchNews } from "./actions/appActions"
import { validatePlayerId } from "./actions/settingsActions"
import { getActiveContracts } from "./actions/contractActions"
// RESOURCES
import "../css/App.css";
import Pages from "./pages/pageRoutes"
import PageNotFound from "./pages/_404"
// COMPONENTS
import SidebarMenu from "./components/SidebarMenu/SidebarMenu"
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import EntryPopup from "./components/EntryPopup";

const history = createBrowserHistory()
console.log(history)

const trackingIDs = {
	"egginc.mioi.io": "UA-120158257-2",
	"cordless.cloud": "UA-120158257-1",
	"localhost:3000": "UA-120158257-1",
}
const trackingID = trackingIDs[window.location.host]
if (trackingID) {
	ReactGA.initialize(trackingID)
}

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
	useEffect(() => {dispatch(validatePlayerId(settings.playerId))}, [])
	useEffect(() => {dispatch(fetchNews(5))}, [])

	return (
			<Swipeable className={classes.root + " App"}>
				<CssBaseline/>
				<Router history={history}>
					<SidebarMenu />
					<div className={classes.toolbar}></div>
					<EntryPopup/>
					<Switch>
						<Route exact path="/" component={Pages.MyFarm} />
						<Route path="/contract" component={Pages.ContractApp} />
						<Route path="/farmvalue" component={Pages.FarmValue} />
						<Route path="/guide" component={Pages.GameGuide} />
						<Route path="/settings" component={Pages.Settings} />
						<Route path="/news" component={Pages.News} />
						<Route component={PageNotFound} />
					</Switch>
				</Router>
			</Swipeable>
	)
}

// export default hot(module)(App)
export default hot(module)(App);