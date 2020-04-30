import React, { useState, useEffect } from "react"
import { Select, ListSubheader, MenuItem, Divider, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"

const useStyle = makeStyles(theme => ({
    root: {
        margin: "auto",
        maxWidth: 400,
        padding: 10,
    },
    selector: {
        // width: "100%",
		overflow: "hidden",

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
		gridTemplateRows: "80px 1fr",
		gridTemplateColumns: "100%",
        gridGap: 5,
		alignItems: "center",
		justifyItems: "center",
		justifyContent: "center",
		width: 120,
		flexGrow: 1,
		// padding: "0px 24px",
		overflow: "unset",

		"& > img": {
			transition: "transform ease 200ms",
		},

		"&:hover": {
			"& > img": {
				transform: "scale(1.1)",
			},
		},
	},
	listRoot: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		maxWidth: 600,
	},
    image: {
        height: "100%",
		width: "auto",
	},
	text: {
	},
	divider: {
		flexBasis: "100%",
	},
	listSubheader: {
		flexBasis: "100%",
	}
}))

export default function ImageDropdown(props) {
	const classes = useStyle()
	const dispatch = useDispatch()
	const initialValue = props.initialValue
	const setValue = props.dispatchFunc
	const menuMap = props.menuMap
	let [selected, setSelected] = useState(initialValue)
	let [open, setOpen] = useState(false)
	useEffect(() => setSelected(initialValue), [initialValue])

	const handleChange = evt => {
		let value = evt.target.value
		if (value === undefined) {
			return
		}
        setSelected(value)
        dispatch(setValue(value))
    }

	const handleOpen = evt => {
		setOpen(true)
	}

	const handleClose = evt => {
		if (evt.target.getAttribute("unselectable") === "true") {
			return
		}
		setOpen(false)
	}
	var menuItems
	if (open) {
		menuItems = parseMenuMap(menuMap, classes)
	}
	else {
		let newMap
		for (let section of menuMap) {
			for (let item of section.items) {
				if (item.value == selected) {
					newMap = [{items: [item]}]
				}
			}
		}
		menuItems = parseMenuMap(newMap, classes)
	}

	return (
		<Select
			value={selected} 
			open={open}
			onOpen={handleOpen} 
			onChange={handleChange} 
			onClose={handleClose}
			className={classes.selector} 
			classes={{select: classes.selectorItem}}
			MenuProps={{classes: {list: classes.listRoot}}}
		>
			{menuItems}
		</Select>
	)
}

function parseMenuMap(menuMap, classes) {
	var elementArray = []
	var index = 0
	for (let section of menuMap) {
		if (section.title) {
			elementArray.push(
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