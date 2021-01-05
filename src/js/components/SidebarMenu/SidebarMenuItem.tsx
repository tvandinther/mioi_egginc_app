import React from "react"
import { ListItem, ListItemText, ListItemIcon, SvgIcon } from "@material-ui/core"
import Link from "../Link"
import {SidebarItem} from "./sidebarMap";
import useStyle from "./styles"

interface Props extends SidebarItem {
	text?: string;
	onClick?: () => void;
}

export default function SidebarMenuItem(props: Props) {
    const classes = useStyle()
	const { icon, text, disabled, external, path, onClick } = props

	const handleClick = () => {
		if (disabled) {
			return
		}
		else {
			if (onClick) onClick()
		}
	}

    return (
		<Link
			onClick={handleClick}
			external={external}
			disabled={disabled}
			to={path}
			exact={path === "/"}
			activeClassName={classes.itemActive}
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