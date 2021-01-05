import React from "react"
import ErrorPage from "../pages/ErrorPage"

export interface State {
	error: Error | null;
	errorInfo: null;
}

export default class ErrorBoundary extends React.Component<React.ComponentProps<any>, State> {
	constructor(props: React.ComponentProps<any>) {
		super(props)
		this.state = {
			error: null,
			errorInfo: null,
		}
	}

	static getDerivedStateFromError(error: Error) {
		return {error: error}
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