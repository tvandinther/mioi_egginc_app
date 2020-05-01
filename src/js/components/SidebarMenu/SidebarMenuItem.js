import React from "react"
import { NavLink } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { ListItem, ListItemText, ListItemIcon, SvgIcon } from "@material-ui/core"
import Link from "../Link"

const useStyle = makeStyles(theme => ({
	active: {
		"&> div": {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	disabled: {
		cursor: "initial",
	}
}))

export default function SidebarMenuItem(props) {
    const classes = useStyle()
	const { icon, text, disabled, external, href, onClick } = props

	const handleClick = () => {
		if (disabled) {
			return
		}
		else {
			onClick()
		}
	}

    return (
		<Link
			onClick={handleClick}
			external={external}
			disabled={disabled}
			to={href}
			exact={props.href === "/"}
			//className={!disabled || classes.disabled}
			activeClassName={classes.active}
		>
            <ListItem disabled={disabled || false} button>
                <ListItemIcon>
                    <SvgIcon component={icon}/>
                </ListItemIcon>
                <ListItemText primary={text} primaryTypographyProps={{variant: "h5"}}/>
            </ListItem>
        </Link>
    )
}