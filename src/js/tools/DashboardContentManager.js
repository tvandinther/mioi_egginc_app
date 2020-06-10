import React from "react"

export default class DashboardContentManager {
    constructor(options = {}) {
        this.content = options.content || []
        this.orderedContent = null
        this.columnClass = options.columnClass || null
        this.rootClass = options.rootClass || null
    }
    addItem(item) {
        if (item instanceof Array) {
            this.content = this.content.concat(item)
        }
        else {
            this.content.push(item)
        }
    }
    orderContent() {
        this.orderedContent = this.content.slice(0)
        this.orderedContent.sort((a, b) => a.props.priority - b.props.priority)
        // this.orderedContent.sort((a, b) => a.props.order - b.props.order) // need to enable secondary sorting
    }
    render(columns) {
        this.orderContent()
        let columnElements = []
        for (let i = 0; i < columns; i++) {
            columnElements.push(<div key={`column${i+1}`} className={this.columnClass}>{this.orderedContent.filter((item, index) => index % columns === i)}</div>)
        }
        return (
			<div className={this.rootClass} style={{display: "grid", gridTemplateColumns: "1fr ".repeat(columns)}}>
				{columnElements}
			</div>
		)
    }
}