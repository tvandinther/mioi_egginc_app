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
import SidebarMenu from "./components/SidebarMenu"
import MenuButton from "./components/MenuButton"
import { useTheme } from "@material-ui/core/styles";

function App(props) {
	const theme = useTheme()
	const style = {
		backgroundColor: theme.palette.grey["200"],
	}
	
	useEffect(() => {
		window.addEventListener("resize", props.resizePage)
		return () => window.removeEventListener("resize", props.resizePage)
	}, [])

	return (
			<Swipeable style={style} className="App" onSwiped={props.pageSwipe}>
				<Router>
					<SidebarMenu />
					<Switch>
						<Route exact path="/" component={Pages.Home} />
						<Route path="/contract" component={Pages.ContractApp} />
						<Route path="/guide" component={Pages.GameGuide} />
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