import React from "react"

export default function SidebarMenuItem(props) {
    return (
        <div className="SidebarMenuHeader gridCenter">
            <span>{props.text}</span>
        </div>
    )
}