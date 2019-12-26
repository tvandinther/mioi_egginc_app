import React from "react"

export default function Navbar(props) {
    return (
        <div style={{backgroundColor: props.colour || null}} className="Navbar gridCenter">
            <span className="NavbarText">{props.title}</span>
        </div>
    )
}