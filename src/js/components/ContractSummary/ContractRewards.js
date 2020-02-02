import React from "react"
import { useTheme } from "@material-ui/core/styles"
import "react-step-progress-bar/styles.css"
import { ProgressBar, Step } from "react-step-progress-bar"
import { percentString, getImageSrc } from "../../tools/eggincTools"
import { Paper, Tooltip } from "@material-ui/core"

export default function ContractRewards(props) {
    const theme = useTheme()
    const rewards = props.rewards
    let progress = 0
    let eggsLaid = 0
    const finalGoal = rewards[rewards.length - 1].goal
    if (props.coop) {
        eggsLaid = props.coop.eggs
        progress = Math.min(Math.max(0, eggsLaid / finalGoal * 100), 100)
    }
    const style = {
        ...props.style,
        borderRadius: 10,
    }
    
    // const fill = `linear-gradient(to right, #5498ff, #ff5454)`
    const fill =`linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`

    const steps = rewards.map((reward, index) => {
        return (
            <Step key={index} transition="scale">
                {({ accomplished, index }) => {
                    let greyFilter = accomplished ? null : "grayscale(0.7)"
                    let shadow = accomplished ? "drop-shadow(0px 0px 3px rgba(0, 200, 0, 0.8))" : null
                    const stepStyle = {
                        filter: ["drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4))", greyFilter].join(" "),
                        transform: accomplished ? "scale(1.2)" : null,
                        pointerEvents: "none",
                    }
                    
                    return (
                        <Tooltip 
                            title={`${percentString(eggsLaid / reward.goal, 0, true)} completed`} 
                            placement="top"
                            enterTouchDelay={400}
                        >
                            <div>
                                <img width={40} src={getImageSrc(reward).path} style={stepStyle}></img>
                            </div>
                        </Tooltip>
                    )
                }}
            </Step>
        )
    })

    return (
        <Paper elevation={4} style={style}>
            <ProgressBar 
                height={20}
                percent={progress} 
                unfilledBackground={theme.palette.grey[200]}
                filledBackground={fill}
                stepPositions={rewards.map(reward => reward.goal / finalGoal * 100)}
            >
                {steps}
            </ProgressBar>
        </Paper>
    )
}