import React, { useEffect, useRef } from "react"
import { useTheme } from "@material-ui/core/styles"
import { connect } from "react-redux"

// ACTIONS
import * as UIActions from "../actions/UIActions"
import { useClickAway } from "../customHooks/customHooks"

import MenuButton from "./MenuButton"
import SidebarMenuHeader from "./SidebarMenuHeader"
import SidebarMenuItem from "./SidebarMenuItem"

function SidebarMenu(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: theme.palette.primary["200"]
    }
    const ref = useRef(null)
    useClickAway((evt) => {
        if(props.sidebarIsVisible) {
            evt.stopImmediatePropagation()
            props.hideSidebar()
        }
    }, ref)
    
    const classNames = ["SidebarMenu"]
    if (!props.isSidebarVisible) {
        classNames.push("hidden")
    }
    if (props.menuOnLeft) {
        classNames.push("left")
    }
    const menuItems = {
        "Home": "/",
        "Contract" : "/contract",
        "Game Guide" : "/guide"
    }
    const sidebarMenuItemComponents = Object.entries(menuItems).map(([text, path]) => {
        return <SidebarMenuItem text={text} href={path} key={path} onClick={props.hideSidebar}/>
    })
    return (
        <div>
            <MenuButton onClick={props.toggleSidebar} isSidebarVisible={props.isSidebarVisible} menuOnLeft={props.menuOnLeft}/>
            <div style={style} ref={ref} className={classNames.join(" ")}>
                <SidebarMenuHeader/>
                {sidebarMenuItemComponents}
            </div>
        </div>
    )
}

const mapStateToProps = store => {
    const {UI: {sizeFormat, isSidebarVisible, menuOnLeft} } = store;
	return {
        sizeFormat,
        isSidebarVisible,
        menuOnLeft,
	}
}

const mapDispatchToProps = {
	...UIActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)