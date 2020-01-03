import React from "react"

export default function FlexContainer(props) {
    const style = {
        display: "flex",
        justifyContent: "space-around",
    }
    
    return (
        <div {...props.style} style={style}>
            {props.children}
        </div>
    )
}