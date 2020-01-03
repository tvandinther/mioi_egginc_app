import React, { useEffect, useState } from "react"
import { Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles"

export default function ContractCardProgressBar(props) {
    const theme = useTheme()

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

    function hexToRGB(h) {
        let r = 0, g = 0, b = 0;
        if (h.length == 4) {
          r = "0x" + h[1] + h[1];
          g = "0x" + h[2] + h[2];
          b = "0x" + h[3] + h[3];
        }
        else if (h.length == 7) {
          r = "0x" + h[1] + h[2];
          g = "0x" + h[3] + h[4];
          b = "0x" + h[5] + h[6];
        }
        return [r, g, b];
    }

    const altgradient = [
        hexToRGB(theme.palette.primary.main),
        hexToRGB(theme.palette.secondary.main),
    ]

    const pickColour = (colour1, colour2, weight) => {
        let w1 = weight
        let w2 = 1 - w1
        let rgb = [
            Math.round(colour1[0] * w1 + colour2[0] * w2),
            Math.round(colour1[1] * w1 + colour2[1] * w2),
            Math.round(colour1[2] * w1 + colour2[2] * w2),
        ]
        return rgb
    }

    const fillColour = pickColour(gradient[1], gradient[0], progress)
    const filledStyle = {
        width: `${progress * 100}%`,
        background: `rgb(${fillColour[0]},${fillColour[1]},${fillColour[2]})`,
    }
    const hoverText = hovered ? <Typography>{props.hoverText}</Typography> : null
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="ContractCardProgressBar" style={barStyle}>
            {hoverText}
            <div className="filled" style={filledStyle}></div>
        </div>
    )
}