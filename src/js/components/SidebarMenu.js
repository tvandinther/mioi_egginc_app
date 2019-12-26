import React, { useEffect, useRef } from "react"

import { useClickAway } from "../customHooks/customHooks"

import SidebarMenuHeader from "./SidebarMenuHeader"
import SidebarMenuItem from "./SidebarMenuItem"

export default function SidebarMenu(props) {
    const ref = useRef(null)
    useClickAway((evt) => {
        if(props.sidebarIsVisible) {
            evt.stopImmediatePropagation()
            console.log(evt, "STOP")
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
        "Contract" : "/contract"
    }
    const sidebarMenuItemComponents = Object.entries(menuItems).map(([text, path]) => {
        return <SidebarMenuItem text={text} href={path} key={path} onClick={props.hideSidebar}/>
    })
    return (
        <div ref={ref} className={classNames.join(" ")}>
            <SidebarMenuHeader text="Menu" />
            {sidebarMenuItemComponents}
        </div>
    )
}