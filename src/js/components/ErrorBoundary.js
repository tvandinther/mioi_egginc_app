import React from "react"
import ErrorPage from "../pages/ErrorPage"

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			errorInfo: null,
		}
	}

	static getDerivedStateFromError(error) {
		return { error: error }
	}

	componentDidCatch() {
		// report error
	}

	render() {
		if (this.state.error) {
			return <ErrorPage error={this.state.error}/>
		}

		return this.props.children
	}
}