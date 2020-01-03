import React from "react"
import RewardsBar from "./RewardsBar"

export default function ContractRewards(props) {
    let progress = 0
    if (props.coop) {
        progress = props.coop.eggs / props.rewards[props.rewards.length - 1].goal
    }
    console.log("PROGRESS", progress)
    return (
        <div>
            <RewardsBar rewards={props.rewards} progress={progress}/>
        </div>
    )
}