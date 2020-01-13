import React from "react"
import { useTheme } from "@material-ui/core/styles"

export default function ContractCardImage(props) {
    const theme = useTheme()
    const style = {
        backgroundColor: theme.palette.grey["300"]
    }

    return (
        <div style={style} className="ContractImageContainer gridCenter">
            <img src={props.src}></img>
        </div>
    )
}