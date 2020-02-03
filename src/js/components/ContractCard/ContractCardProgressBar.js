import React, { useState } from "react"
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
    unfilled: {
        gridArea: "progressBar",
        backgroundColor: theme.palette.background.off,
        position: "relative",
        textAlign: "center",
        height: "100%",
        width: "100%",
        zIndex: 4,
        transition: "all 200ms ease",
        overflow: "hidden",

        "& *": {
            transition: "inherit",
        }
    },
    filled: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
    }
}))

export default function ContractCardProgressBar(props) {
    const theme = useTheme()
    const classes = useStyle()

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
        hexToRGB(theme.palette.primary.light),
        hexToRGB(theme.palette.secondary.light),
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

    const fillColour = pickColour(altgradient[1], altgradient[0], progress)
    const filledStyle = {
        width: `${progress * 100}%`,
        background: `rgb(${fillColour[0]},${fillColour[1]},${fillColour[2]})`,
    }
    const hoverText = hovered ? <Typography variant="subtitle2">{props.hoverText}</Typography> : null
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={classes.unfilled} style={barStyle}>
            {hoverText}
            <div className={classes.filled} style={filledStyle}></div>
        </div>
    )
}