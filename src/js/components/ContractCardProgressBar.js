import React, { useEffect, useState } from "react"
import { relative } from "path";

export default function ContractCardProgressBar(props) {
    const progress = Math.min(Math.max(0, props.progress), 1)
    let [hovered, setHovered] = useState(false)

    let handleMouseEnter = evt => {
        setHovered(true);
    }
    let handleMouseLeave = evt => {
        setHovered(false);
    }

    const barStyle = {
        height: hovered ? `20px` : null,
    }

    const gradient = [
        [84, 152, 255],
        [255, 84, 84],
    ]

    const pickHex = (colour1, colour2, weight) => {
        let w1 = weight
        let w2 = 1 - w1
        let rgb = [
            Math.round(colour1[0] * w1 + colour2[0] * w2),
            Math.round(colour1[1] * w1 + colour2[1] * w2),
            Math.round(colour1[2] * w1 + colour2[2] * w2),
        ]
        return rgb
    }

    const fillColour = pickHex(gradient[1], gradient[0], progress)
    const filledStyle = {
        width: `${progress * 100}%`,
        background: `rgb(${fillColour[0]},${fillColour[1]},${fillColour[2]})`,
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="ContractCardProgressBar" style={barStyle}>
            {props.hoverText}
            <div className="filled" style={filledStyle}></div>
        </div>
    )
}