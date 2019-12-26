import React, { Component } from "react"

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            pageTitle: "404 - Page Not Found"
        }
    }

    render() {
        return (
            <div>
                <p>
                    Cannot find the requested page
                </p>
            </div>
        )
    }
}