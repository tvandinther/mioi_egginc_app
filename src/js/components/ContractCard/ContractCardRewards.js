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
    const style = {
        display: "grid",
        gridTemplateColumns: "28px 1fr",
    }
    const imgStyle = {
        width: "100%",
        height: "auto",
    }
    const [imageName, text] = (reward => {
        switch (reward.type) {
            case "BOOST": {
                return ["b_icon_" + reward.subtype, `+${reward.quantity}`]
            }
            case "RESEARCH":
            case "PIGGY_LEVEL": {
                return [reward.subtype, `+${reward.quantity}`]
            }
            case "PIGGY_MULTIPLY": {
                return [reward.type, `x${reward.quantity}`]
            }
            case "PIGGY_BANK":
            default: {
                return [reward.type, eiTools.convertSymbol(reward.quantity)]
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