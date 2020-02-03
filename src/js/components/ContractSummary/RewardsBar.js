import React from "react"
import { useTheme } from "@material-ui/core/styles"
import "react-step-progress-bar/styles.css"
import { ProgressBar, Step } from "react-step-progress-bar"

export default function RewardsBar(props) {
    const theme = useTheme()
    
    const rewards = props.rewards
    const value = props.progress * 100
    // const fill = `linear-gradient(to right, #5498ff, #ff5454)`
    const fill =`linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`

    const steps = rewards.map

    return (
        <ProgressBar 
            percent={value} 
            unfilledBackground={theme.palette.background.off}
            filledBackground={fill}
        >
            {steps}
        </ProgressBar>

        
    )
}