import React, { useEffect, useRef } from "react"
import { useTheme } from "@material-ui/core/styles"

export default function RewardsBar(props) {
    const theme = useTheme()
    
    const canvasRef = useRef(null)
    let ctx = null
    useEffect(() => {
        ctx = canvasRef.current.getContext("2d")
        update(props.progress)
    }, [props.progress, props.rewards])

    const style = {
        width: "100%",
        height: "20px"
    }

    const canvasStyle = {
        bgColour: theme.palette.grey["300"],
        colour: theme.palette.secondary["A400"],
        fullColour: theme.palette.secondary["A700"],
        strokeColour: theme.palette.primary.main,
    }

    const draw = {
        clear: () => {
            ctx.clearRect(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height);
        },
        verticalLine: options => {
            ctx.strokeStyle = options.colour || canvasStyle.strokeColour;
            ctx.lineWidth = options.width || 5;
            ctx.beginPath();
            ctx.moveTo(ctx.canvas.width * options.percent, 0);
            ctx.lineTo(ctx.canvas.width * options.percent, ctx.canvas.height);
            ctx.stroke();
        },
        fillTo: options => {
            ctx.fillStyle = options.colour || canvasStyle.bgColour;
            ctx.fillRect(0, 0, ctx.canvas.width * options.percent, ctx.canvas.height);
        }
    }

    const update = progress => {
        draw.clear()
        // draw background
        draw.fillTo({
            percent: 100,
        })
        // draw foreground
        draw.fillTo({
            percent: progress,
            colour: progress >= 1 ? canvasStyle.fullColour : canvasStyle.colour,
        })
        // vertical line at edge
        // if (progress < 1) {
        //     draw.verticalLine({
        //         percent: progress,
        //     })
        // }
        // draw markers at goals
        let finalGoal = props.rewards[props.rewards.length - 1].goal
        for (let i = 0; i < props.rewards.length - 1; i++) {
            let percent = props.rewards[i].goal / finalGoal
            draw.verticalLine({
                percent: percent
            })
        }
    }

    return (
        <canvas style={style} width="1000px" height="20px" ref={canvasRef}></canvas>
    )
}