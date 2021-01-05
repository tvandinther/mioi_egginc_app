import React from "react"
import useStyles from "./styles"

export default function ContractCardImage({ src }: { src: string }) {
    const classes = useStyles()

    return (
        <div className={classes.image}>
            <img src={src}></img>
        </div>
    )
}