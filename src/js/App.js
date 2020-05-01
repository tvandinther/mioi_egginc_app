// FRAMEWORK
import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader";
import { Swipeable } from 'react-swipeable'
import { useDispatch, useSelector } from "react-redux"

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
				<Router>
					<SidebarMenu />
					<div className={classes.toolbar}></div>
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