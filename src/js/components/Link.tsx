import React from "react"
import {NavLink} from "react-router-dom"

type Props = {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
	onClick: () => void;
	external?: boolean;
	disabled?: boolean;
	to: string;
	exact: boolean;
	activeClassName: string;
}

export default function Link(props: Props) {
	const {disabled, external, children, style, className, to, exact, activeClassName, onClick} = props
	if (disabled) {
		return (
			<div style={style} className={className}>{children}</div>
		)
	} else if (external) {
		return (
			<a style={style} className={className} href={to} target="_blank">{children}</a>
		)
	} else {
		return (
			<NavLink style={style} className={className} to={to} exact={exact} onClick={onClick}
					 activeClassName={activeClassName}>{children}</NavLink>
		)
	}
}