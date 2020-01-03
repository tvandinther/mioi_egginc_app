import React from "react"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import * as eiTools from "../../tools/eggincTools"

export default function ContractCardRewards(props) {
    const theme = useTheme()
    const style = {
        display: "grid",
        flex: "1 1 0px",
    }
    const rewards = props.rewards.map((reward, index) => <RewardItem key={index} reward={reward}/>)
    return (
        <div style={style}>
            {rewards}
        </div>
    )
}

function RewardItem(props) {
    const text = eiTools.convertSymbol(props.reward.quantity)
    const style = {
        display: "grid",
        gridTemplateColumns: "28px 1fr",
    }
    const imgStyle = {
        width: "100%",
        height: "auto",
    }
    const imageName = (reward => {
        switch (reward.type) {
            case "BOOST": {
                return "b_icon_" + reward.subtype
            }
            case "RESEARCH": {
                return reward.subtype
            }
            default: {
                return reward.type
            }
        }
    })(props.reward)
    return (
        <div style={style}>
            <img style={imgStyle} src={`/images/${imageName}.png`}></img>
            <Typography>{text}</Typography>
        </div>
    )
}