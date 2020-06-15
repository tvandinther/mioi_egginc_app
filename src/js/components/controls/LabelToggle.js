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

export default function LabelToggle(props) {
	const classes = useStyle()
	const leftRef = useRef()
	const rightRef = useRef()
	const selectorRef = useRef()
	const { state, labels, onChange } = props
	
	const [toggleState, setToggleState] = useState(state)

	let activeStyle = {
		color: "rgba(0, 0, 0, 0.87)",
	}

	const getWidth = node => {
		return window.getComputedStyle(node).width
	}

	useEffect(() => {
		setToggleState(state)
	}, [state])

	useEffect(() => {
		if (typeof onChange === "function") onChange(toggleState)
		let newWidth = toggleState ? getWidth(rightRef.current) : getWidth(leftRef.current)
		selectorRef.current.style.width = newWidth
		let transformString = `translateX(calc(${getWidth(selectorRef.current.parentNode)} - ${newWidth} - 2px))`
		if (toggleState) selectorRef.current.style.transform = transformString
		else selectorRef.current.style.transform = ""
	}, [toggleState])

	const handleClick = evt => {
		setToggleState(!toggleState)
	}

	return (
		<ButtonBase className={classes.root} onClick={handleClick}>
			<div ref={selectorRef} className={classes.selector}></div>
			<span ref={leftRef} className={`${classes.label} ${classes.left}`} style={toggleState ? null : activeStyle}>{labels[0]}</span>
			<span ref={rightRef} className={`${classes.label} ${classes.right}`} style={toggleState ? activeStyle : null}>{labels[1]}</span>
		</ButtonBase>
		
	)
}