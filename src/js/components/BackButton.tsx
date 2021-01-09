import React from "react"
import {useHistory} from "react-router-dom"
import {Button} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

const useStyle = makeStyles(theme => ({
    backButton: {
        width: "100px",
    }
}))

export default function BackButton() {
    const history = useHistory()
    const classes = useStyle()

    return (
        <Button className={classes.backButton} variant="outlined" onClick={history.goBack}>❮ Back</Button>
    )
}