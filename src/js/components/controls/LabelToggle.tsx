import React, { useRef, useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { ButtonBase } from "@material-ui/core"

const useStyle = makeStyles(theme => ({
	root: {
		width: "max-content",
		marginLeft: "auto",
		marginRight: "auto",

		cursor: "pointer",
		color: "white",
		backgroundColor: "#404040",
		border: "1px solid rgba(0, 0, 0, 0.23)",
		
		borderRadius: 400,
		textTransform: "uppercase",
		fontWeight: 500,
		fontSize: "0.875rem",
		transition: `
			background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
		`,

		"&:hover": {
			backgroundColor: "rgba(64, 64, 64, 0.92)"
		}
	},
	label: {
		padding: "5px 15px",
		borderRadius: "inherit",
		zIndex: 5,
		transition: "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
	},
	left: {
		float: "left",
	},
	right: {
		float: "right",
	},
	selector: {
		position: "absolute",
		height: "100%",
		width: "50%",
		backgroundColor: "#fff",
		borderRadius: "inherit",
		transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
		left: 0,
		zIndex: 3,
	}
}))

export default function LabelToggle(props: { state: boolean; labels: string[]; onChange: StateChangeHandler; onClick: StateChangeHandler }) {
	const classes = useStyle()
	const leftRef = useRef<HTMLElement>(null)
	const rightRef = useRef<HTMLElement>(null)
	const selectorRef = useRef<HTMLDivElement>(null)
	const { state, labels, onChange, onClick } = props
	
	const [toggleState, setToggleState] = useState(state)

	let activeStyle: React.CSSProperties = {
		color: "rgba(0, 0, 0, 0.87)",
	}

	const getWidth = (node: HTMLElement) => {
		return window.getComputedStyle(node).width
	}

	useEffect(() => {
		setToggleState(state)
	}, [state])

	useEffect(() => {
		let selectorNode = selectorRef.current
		let leftNode = leftRef.current
		let rightNode = rightRef.current

		if (selectorNode && leftNode && rightNode) {
			if (typeof onChange === "function") onChange(toggleState)
			let newWidth = toggleState ? getWidth(rightNode) : getWidth(leftNode)
			selectorNode.style.width = newWidth
			let transformString = `translateX(calc(${getWidth(selectorNode.parentNode as HTMLElement)} - ${newWidth} - 2px))`
			if (toggleState) selectorNode.style.transform = transformString
			else selectorNode.style.transform = ""
		}
	}, [toggleState])

	const handleClick = (evt: React.MouseEvent) => {
		setToggleState(!toggleState)
		if (typeof onClick === "function") onClick(!toggleState)
	}

	return (
		<ButtonBase className={classes.root} onClick={handleClick}>
			<div ref={selectorRef} className={classes.selector}/>
			<span ref={leftRef} className={`${classes.label} ${classes.left}`} style={toggleState ? undefined : activeStyle}>{labels[0]}</span>
			<span ref={rightRef} className={`${classes.label} ${classes.right}`} style={toggleState ? activeStyle : undefined}>{labels[1]}</span>
		</ButtonBase>

	)
}