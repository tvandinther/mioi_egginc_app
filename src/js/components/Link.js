import React from "react"
import { NavLink } from "react-router-dom"

export default function Link(props) {
	const { disabled, external, children, style, className, to, exact, activeClassName, onClick } = props
	if (disabled) {
		return (
			<div style={style} className={className}>{children}</div>
		)
	}
	else if (external) {
		return (
			<a style={style} className={className} href={to} target="_blank">{children}</a>
		)
	}
	else {
		return (
			<NavLink style={style} className={className} to={to} exact={exact} onClick={onClick} activeClassName={activeClassName}>{children}</NavLink>
		)
	}
}