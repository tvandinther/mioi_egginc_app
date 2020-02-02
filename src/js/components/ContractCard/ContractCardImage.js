import React from "react"
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => createStyles({  
    ContractCardImage: {
        backgroundColor: theme.palette.grey["300"],
        gridArea: "image",
        height: "100%",
        width: "100%",
        borderBottomLeftRadius: "inherit",
        zIndex: 3,
        filter: "drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.3))",

        "& img": {
            maxHeight: "90%",
            maxWidth: "90%",
            display: "block",
            margin: "auto",
        }
    },
}))

export default function ContractCardImage(props) {
    const classes = useStyles()
    const style = {
        
    }

    return (
        <div className={[classes.ContractCardImage, classes.gridCenter].join(" ")}>
            <img src={props.src}></img>
        </div>
    )
}