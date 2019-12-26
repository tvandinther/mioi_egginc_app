import React, { Component } from "react"

export default class ValidatedInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contractName: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handlePaste = this.handlePaste.bind(this)
    }

    validate(value) {
        if (typeof this.props.validatorFunction === "function") {
            value = this.props.validatorFunction(value)
        }
        return value
    }

    handleChange(event) {
        let { name, value } = event.target
        value = this.validate(value)
        this.setState({
            [name] : value
        })
    }

    handlePaste(event) {
        let { name, value, selectionStart, selectionEnd } = event.target
        let pastedValue = event.clipboardData.getData("text")
        let pre = value.substring(0, selectionStart)
        let post = value.substring(selectionEnd, value.length)
        value = (pre + pastedValue + post).trim()
        value = this.validate(value)
        event.preventDefault()
        this.setState({
            [name] : value
        })
    }

    render() {
        return (
            <input type="text" name="contractName" value={this.state.contractName} onChange={this.handleChange} onPaste={this.handlePaste}></input>
        )
    }
}