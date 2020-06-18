import { useEffect } from "react"
import { withRouter } from "react-router-dom"

function NoIndex(props) {
	const { location } = props

	const noIndexRules = [
		"/contract/view",
		"/settings",
	]

	function setNoIndex() {
		let noIndexTag = document.createElement('meta')
		noIndexTag.name = "robots"
		noIndexTag.content = "noindex"
		document.head.appendChild(noIndexTag)
		return noIndexTag
	}

	function removeNoIndex() {
		const noIndexNodes = document.head.querySelectorAll("meta[name=robots][content=noindex]")
		for (let node of noIndexNodes) {
			document.head.removeChild(node)
		}
	}

	useEffect(() => {
		for (let rule of noIndexRules) {
			if (location.pathname.startsWith(rule)) {
				setNoIndex()
				break
			}
		}
		return removeNoIndex
	}, [location.pathname])

	return null
}

export default withRouter(NoIndex)