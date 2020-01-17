import React from "react"

export default function FlexContainer(props) {
    const style = {
        ...props.style,
        display: "flex",
        justifyContent: "space-around",
    }
    
    return (
        <div style={style}>
            {props.children}
        </div>
    )
}