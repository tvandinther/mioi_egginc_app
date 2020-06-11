import React, { useState, useEffect } from "react"
import { Typography,Input, Slider, InputLabel } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { setResearch } from "../../../actions/farmValueActions"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gridTemplateAreas: `
			"image name"
			"input slider"
			"description description"
        `,
        alignItems: "center",
        justifyItems: "center",
		gridGap: 10,
		padding: "0px 4px",

        "& >img": {
            width: "100%",
        }
    },
    image: {
        gridArea: "image",
    },
    name: {
        gridArea: "name",
        justifySelf: "left",
    },
    description: {
        gridArea: "description",
        justifySelf: "left",
    },
    input: {
        gridArea: "input",
		width: "100%",
		marginBottom: 20,
	},
	inputOverride: {
		textAlign: "center",
	},
    slider: {
        gridArea: "slider",
		maxWidth: 500,
		marginRight: 6,
	},
	sliderLabel: {
		gridArea: "slider",
		position: "relative",
		textAlign: "right",
		width: "100%",
		maxWidth: 500,
		top: 28,
	},
}))

export default function ResearchInput(props) {
    const classes = useStyle()
    const dispatch = useDispatch()
	const research = props.research
	var initialValue, type
	if (props.tier === "epic") {
		initialValue = useSelector(store => store.farmValue.game.epicResearch[research.id])
		type = "epic"
	}
	else {
		initialValue = useSelector(store => store.farmValue.farm.commonResearch[research.id])
		type = "common"
	}
	const dispatchAction = props.dispatchAction || ((value) => setResearch({[research.id]: value}, type))

    let [sliderValue, setSliderValue] = useState(initialValue)
	
	if (props.dispatchAction) dispatch(props.dispatchAction(initialValue))
	useEffect(() => setSliderValue(initialValue), [initialValue])

    const handleInputChange = (evt) => {
        setSliderValue(Number(evt.target.value) || 0)
        // submitChange() // causes rendering issues
	}
	
	// I'm having an issue where I want local state to update slider and input together and have the redux 
	// dispatch occur after local state has been updated (but not trigger a re-render).

    const handleBlur = (evt) => {
		let newValue = Number(evt.target.value) || 0
        if (newValue < 0) {
            newValue = 0
        }
        else if (newValue > research.maxLevel) {
            newValue = research.maxLevel
		}
		setSliderValue(newValue)
		submitChange(newValue)
    }

    const submitChange = value => {
        dispatch(dispatchAction(value))
	}
	
	const handleSliderCommit = (evt, newValue) => {
		submitChange(newValue)
	}

	// generate slider marks
	// THIS CREATES PERFORMANCE DROP
	// let sliderMarks = []
	// if (research.maxLevel <= 50) {
	// 	for (let i = 0; i < research.maxLevel; i++) {
	// 		sliderMarks.push({value: i})
	// 	}
	// }	
	// sliderMarks.push({value: research.maxLevel, label: research.maxLevel})

    return (
        <div className={classes.root}>
            <img className={classes.image} src={`/images/r_icon_${research.id}.png`}/>
            <Typography className={classes.name} variant="h6">{research.name}</Typography>
            <Typography className={classes.description} variant="subtitle2">{research.description}</Typography>
            <Input
				type="number"
				min={0}
				max={research.maxLevel}
				className={classes.input}
				classes={{input: classes.inputOverride}}
                value={sliderValue}
                onChange={handleInputChange}
				onBlur={handleBlur}
				aria-label={research.name}
            />
            <Slider
                className={classes.slider}
                value={Number(sliderValue) || 0}
                onChange={(evt, newValue) => setSliderValue(newValue)}
                onChangeCommitted={handleSliderCommit}
                // marks={true}
                min={0}
                max={research.maxLevel}
				color="secondary"
				aria-label={research.name}
            />
			<InputLabel className={classes.sliderLabel}>{research.maxLevel}</InputLabel>
        </div>
    )
}