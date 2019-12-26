import React, { useContext, useReducer } from "react"

export default function MenuButton(props) {
    const classNames = ["MenuButton"]
    if (props.sidebarIsVisible) {
        classNames.push("change")
    }
    if (props.menuOnLeft) {
        classNames.push("left")
    }
    return (
        <div onClick={props.onClick} className={classNames.join(" ")}>
            <div>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    )
}