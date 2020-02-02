import React from "react"
import { connect } from "react-redux"

function MultiColumn(props) {
    let columnSize = "100vw"
    if (props.sizeFormat == "large") {
        columnSize = "1fr"
    }
    const isSingleColumnView = props.sizeFormat === "small" || props.sizeFormat === "medium"
    let style = {
        display: "grid",
        gridTemplateColumns: Array.from({length: 2}, () => columnSize).join(" "),
        overflow: "visible",
        height: "calc(100vh - var(--header-height) - var(--footer-height))",
        transform: isSingleColumnView && props.scrolled ? "translateX(-100vw)" : null,
        transition: "transform 200ms ease"
    }
    return (
        <div className="MultiColumn" style={style}>
            {props.children}
        </div>
    )
}

const mapStateToProps = store => {
    const { UI: { sizeFormat } } = store
    return {
        sizeFormat,
    }
}

export default connect(mapStateToProps)(MultiColumn)