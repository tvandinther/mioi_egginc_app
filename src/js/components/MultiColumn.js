import React from "react"

export default function MultiColumn(props) {
    let columnSize = "100vw"
    if (props.sizeFormat == "large" || props.sizeFormat == "medium") {
        columnSize = "1fr"
    }
    const isSingleColumnView = props.sizeFormat === "small"
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