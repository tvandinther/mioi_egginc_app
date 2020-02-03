import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
import { connect } from "react-redux"

function BackButton(props) {
    if (true || props.sizeFormat === "small" || props.sizeFormat === "medium") { // temporary true to disable check
        return (
            <Link style={props.style} to={props.to}>
                <Button variant="outlined" onClick={props.onClick}>❮ Back</Button>
            </Link>
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