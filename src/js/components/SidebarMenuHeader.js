import React, { Component } from "react"

export default class SidebarMenuItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text
        }
    }

    render() {
        return (
            <div className="SidebarMenuHeader gridCenter">
                <span>{this.state.text}</span>
            </div>
        )
    }
}