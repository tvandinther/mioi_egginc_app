import React from "react"
import { Link, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { connect } from "react-redux"

const useStyle = makeStyles(theme => ({
    backButton: {
        width: "100px",
    }
}))

function BackButton(props) {
    const history = useHistory()
    const classes = useStyle()
    if (true || props.sizeFormat === "small" || props.sizeFormat === "medium") { // temporary true to disable check
        // return (
        //     <Link style={props.style} to={props.to}>
        //         <Button variant="outlined" onClick={props.onClick}>❮ Back</Button>
        //     </Link>
        // )
        return (
            <Button className={classes.backButton} variant="outlined" onClick={history.goBack}>❮ Back</Button>
        )
    }
    return null
}

const mapStateToProps = store => {
    const { UI: {sizeFormat} } = store
    return {
        sizeFormat
    }
}

export default connect(mapStateToProps)(BackButton)