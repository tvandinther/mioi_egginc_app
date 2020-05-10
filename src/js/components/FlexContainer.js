import React from "react"

export default function FlexContainer(props) {
    const style = {
        ...props.style,
        display: "flex",
		justifyContent: "space-around",
		flexDirection: props.column ? "column" : "row",
    }
    
    return (
        <div style={style} className={props.className}>
            {props.children}
        </div>
    )
}