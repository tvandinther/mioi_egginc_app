import React, { useState, useEffect } from "react"
import { Select, ListSubheader, MenuItem, Divider, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"

export type MenuMapItem = {
	title?: string,
	items: Array<{
		title: string,
		imageSrc: string,
		value: number,
	}>
}

export type MenuMap = Array<MenuMapItem>

const useStyle = makeStyles(theme => ({
    root: {
        margin: "auto",
        maxWidth: 400,
        padding: 10,
	},
	selector: {
		overflow: "hidden",

		".default&": {
			width: "100%",
		},
		".large&": {
		},

		"& >div>img": {
			transition: "transform ease 200ms",
		},

		"&:hover": {
			"& >div>img": {
				transform: "scale(1.1)",
			},
		},
	},
	selectorItem: {
		display: "grid",
		gridGap: 5,
		alignItems: "center",

		".default &": {
			gridTemplateColumns: "auto 1fr",
		},
		".large &": {
			gridTemplateRows: "80px 1fr",
			gridTemplateColumns: "100%",
			justifyItems: "center",
			justifyContent: "center",
			width: 120,
			flexGrow: 1,
			// padding: "0px 24px",
			overflow: "unset",
		},
		"& > img": {
			transition: "transform ease 200ms",
		},
		"&:hover": {
			"& > img": {
				transform: "scale(1.1)",
			},
		},
	},
	image: {
		width: "auto",

		".default &": {
			height: 36,
		},
		".large &": {
			height: "100%",
		},
	},
	text: {
		userSelect: "none",
	},
	listRoot: {
		".default&": {

		},
		".large&": {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			maxWidth: 600,
		},
	},
	divider: {
		".default &": {

		},
		".large &": {
			flexBasis: "100%",
		},
	},
	listSubheader: {
		userSelect: "none",
		
		".default &": {
			
		},
		".large &": {
			flexBasis: "100%",
		},
	},
}))

interface PropTypes {
	initialValue: number,
	dispatchFunc: Function,
	menuMap: MenuMap
	type?: "default" | "large"
}

export default function ImageDropdown(props: PropTypes) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const initialValue = props.initialValue
	const setValue = props.dispatchFunc
	const menuMap = props.menuMap
	const formFactor = props.type || "default"
	let [selected, setSelected] = useState(initialValue)
	let [open, setOpen] = useState(false)
	useEffect(() => setSelected(initialValue), [initialValue])

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		let value = evt.target.value
		if (value === undefined) {
			return
		}
        setSelected(Number(value))
        dispatch(setValue(value))
    }

	const handleOpen = (evt: React.ChangeEvent) => {
		setOpen(true)
	}

	const handleClose = (evt: React.ChangeEvent) => {
		if (evt.target.getAttribute("unselectable") === "true") {
			return
		}
		setOpen(false)
	}

	const parseMenuMap = (map: MenuMap) => {
		var elementArray = []
		var index = 0
		for (let section of map) {
			if (section.title) {
				elementArray.push(
					//@ts-ignore
					<ListSubheader
						key={index}
						unselectable="true" 
						className={classes.listSubheader}
					>
						{section.title}
					</ListSubheader>
				)
			}
			index++
			for (let item of section.items) {
				let { title, imageSrc, value } = item
				value = value == undefined ? index : value // if value is not supplied, the index is used instead
				elementArray.push(
					<MenuItem key={index} value={value} className={classes.selectorItem}>
						<img src={imageSrc} className={classes.image}/>
						<Typography className={classes.text}>{title}</Typography>
					</MenuItem>
				)
				index++
			}
			elementArray.push(
				//@ts-ignore
				<Divider
					key={index}
					unselectable="true"
					className={classes.divider}
				/>
			)
			index++
		}
		elementArray.pop() // remove the final divider
		return elementArray
	}

	var menuItems
	if (open) {
		menuItems = parseMenuMap(menuMap)
	}
	else {
		let newMap: MenuMap = menuMap
		for (let section of menuMap) {
			for (let item of section.items) {
				if (item.value == selected) {
					newMap = [{items: [item]}]
				}
			}
		}
		menuItems = parseMenuMap(newMap)
	}

	return (
		<Select
			value={selected} 
			open={open}
			onOpen={handleOpen} 
			onChange={handleChange} 
			onClose={handleClose}
			className={`${classes.selector} ${formFactor}`} 
			classes={{select: `${classes.selectorItem} ${formFactor}`}}
			MenuProps={{classes: {list: `${classes.listRoot} ${formFactor}`}}}
		>
			{menuItems}
		</Select>
	)
}