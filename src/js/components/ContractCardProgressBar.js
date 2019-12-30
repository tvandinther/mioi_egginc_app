import React from "react"

export default function ContractCardProgressBar(props) {
    const progress = Math.min(Math.max(0, props.progress), 1)
    const fillColour = `rgb(${progress * 255},${progress * 255},${progress * 255})`
    const filledStyle = {
        width: `${progress * 100}%`,
        background: fillColour,
    }

    return (
        <div className="ContractCardProgressBar">
            <div className="filled" style={filledStyle}></div>
        </div>
    )
}