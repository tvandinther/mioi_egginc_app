import React, { useEffect } from "react"
import ErrorBoundary from "./components/ErrorBoundary"
import { useDispatch } from "react-redux"
import { setPage } from "./actions/UIActions"

export default function Page(props) {
	const dispatch = useDispatch()
	const pageDetails = {
		title: props.title || null,
		shortTitle: props.shortTitle || "",
	}

	useEffect(() => {
		const oldTitle = document.title
		let titleArray = [oldTitle]
		if (pageDetails.title) titleArray.push(pageDetails.title)
		document.title = titleArray.join(" | ")
		dispatch(setPage(pageDetails))
        return () => document.title = oldTitle
    }, [])

	return (
		<ErrorBoundary>
			{props.children}
		</ErrorBoundary>
	)
}