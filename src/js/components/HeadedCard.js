import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Card, Typography } from "@material-ui/core"

const useStyle = makeStyles(theme => ({
    card: {
        
    },
    header: {
        backgroundColor: theme.palette.primary.main,
        height: 32,
    },
    cardBody: {
        padding: 10,
    }
}))

export default function DashboardCard(props) {
    const classes = useStyle()
    const hoverable = props.hoverable || false
    let [raised, setRaised] = useState(false)
    const toggleRaised = hoverable ? () => {
        setRaised(!raised)
    } : null

    return (
        <Card style={props.style} raised={hoverable && raised} onMouseOver={toggleRaised} onMouseOut={toggleRaised} className={`${classes.card}`}>
            <div className={classes.header}>
                <Typography variant="h5" align="center" style={{color: "white"}}>{props.title}</Typography>
            </div>
            <div className={`${props.className} ${classes.cardBody}`}>
                {props.children}
            </div>
        </Card>
    )
}