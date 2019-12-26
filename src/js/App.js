// FRAMEWORK
import React, { useRef } from "react";
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
import PageNotFound from "./pages/404"
// COMPONENTS
import SidebarMenu from "./components/SidebarMenu"
import MenuButton from "./components/MenuButton"

function App(props) {
	window.addEventListener("resize", props.resizePage)

	const handleSwipe = event => {
		if (event.absX > 100) {
			if (event.dir === "Left") {
				if (!props.UI.menuOnLeft && !props.UI.isSidebarVisible) { // menu on right and sidebar not visible
					props.showSidebar()
				}
				else if (props.UI.menuOnLeft && props.UI.isSidebarVisible) { // menu on left and sidebar visible
					props.hideSidebar()
				}
			}
			else if (event.dir === "Right") {
				if (props.UI.menuOnLeft && !props.UI.isSidebarVisible) { // menu on left and sidebar not visible
					props.showSidebar()
				}
				else if (!props.UI.menuOnLeft && props.UI.isSidebarVisible) { // menu on right and sidebar visible
					props.hideSidebar()
				}
			}
		}
	}

	return (
		<Swipeable className="App" onSwiped={handleSwipe}>
			<Router>
				<MenuButton onClick={props.toggleSidebar} sidebarIsVisible={props.UI.isSidebarVisible} menuOnLeft={props.UI.menuOnLeft}/>
				<SidebarMenu sidebarIsVisible={props.UI.isSidebarVisible} menuOnLeft={props.UI.menuOnLeft} hideSidebar={props.hideSidebar}/>
				<Switch>
					<Route exact path="/" component={Pages.Home} />
					<Route path="/contract" component={Pages.ContractApp} />
					<Route component={PageNotFound} />
				</Switch>
			</Router>
		</Swipeable>
	)
}

const mapStateToProps = store => {
	return {
		UI: store.UI
	}
}

const mapDispatchToProps = {
	...UIActions
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default hot(module)(connectedApp);