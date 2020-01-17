import React from "react"
import { Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/core/styles"
import { getImageSrc } from "../../tools/eggincTools"

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
    const { path, quantity } = getImageSrc(props.reward)
    return (
        <div style={style}>
            <img style={imgStyle} src={path}></img>
            <Typography>{quantity}</Typography>
        </div>
    )
}