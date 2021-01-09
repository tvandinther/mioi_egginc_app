import React, { useState, useEffect, CSSProperties } from "react"
import { Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles"
import useStyle from "./styles"

export default function ContractCardProgressBar(props: {progress: number, hoverText: string}) {
    const theme = useTheme()
	const classes = useStyle()
	const noDeviceHover = useMediaQuery("(pointer: none), (hover: none)")

    const progress = Math.min(Math.max(0, props.progress), 1)
    let [hovered, setHovered] = useState(false)

	useEffect(() => {
		setHovered(noDeviceHover)
	}, [noDeviceHover])

    let handleMouseEnter = () => {
        setHovered(noDeviceHover || true);
    }
    let handleMouseLeave = () => {
        setHovered(noDeviceHover || false);
    }

    const barStyle: CSSProperties = {
		height: hovered ? 20 : undefined,
		marginTop: noDeviceHover ? 10 : undefined
    }

    const gradient = [
        [84, 152, 255],
        [255, 84, 84],
    ]

    function hexToRGB(h: string): number[] {
        let r = 0, g = 0, b = 0;
        if (h.length == 4) {
          r = Number("0x" + h[1] + h[1]);
          g = Number("0x" + h[2] + h[2]);
          b = Number("0x" + h[3] + h[3]);
        }
        else if (h.length == 7) {
          r = Number("0x" + h[1] + h[2]);
          g = Number("0x" + h[3] + h[4]);
          b = Number("0x" + h[5] + h[6]);
        }
        return [r, g, b];
    }

    const altgradient: number[][] = [
        hexToRGB(theme.palette.primary.light),
        hexToRGB(theme.palette.secondary.light),
    ]

    const pickColour = (colour1: number[], colour2: number[], weight: number) => {
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
    const hoverText = hovered ? <Typography variant="overline" className={classes.expiryText}>{props.hoverText}</Typography> : null
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={classes.unfilled} style={barStyle}>
            {hoverText}
            <div className={classes.filled} style={filledStyle}></div>
        </div>
    )
}