import React from "react"
import { useTheme, makeStyles, createStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => createStyles({  
    ContractCardImage: {
        backgroundColor: theme.palette.background.off,
        gridArea: "image",
		width: "100%",
		maxWidth: 150,
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        borderBottomLeftRadius: "inherit",
        zIndex: 3,
        filter: "drop-shadow(2px 0px 2px rgba(0, 0, 0, 0.3))",

        "& img": {
            maxHeight: "90%",
            maxWidth: "90%",
        }
    },
}))

export default function ContractCardImage(props) {
    const classes = useStyles()
    const style = {
        
    }

    return (
        <div className={classes.ContractCardImage}>
            <img src={props.src}></img>
        </div>
    )
}