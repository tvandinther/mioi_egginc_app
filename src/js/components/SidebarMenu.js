import React, { useEffect, useRef } from "react"
import { useTheme } from "@material-ui/core/styles"

import { useClickAway } from "../customHooks/customHooks"

import SidebarMenuHeader from "./SidebarMenuHeader"
import SidebarMenuItem from "./SidebarMenuItem"

export default function SidebarMenu(props) {
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
    if (!props.sidebarIsVisible) {
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
        <div style={style} ref={ref} className={classNames.join(" ")}>
            <SidebarMenuHeader/>
            {sidebarMenuItemComponents}
        </div>
    )
}