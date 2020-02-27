import React, { useState, useEffect } from "react"
import { Typography,Input, Slider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { setResearch } from "../../../actions/farmValueActions"

const useStyle = makeStyles(theme => ({
    root: {
        display: "grid",
        gridTemplateColumns: "72px auto auto 1fr",
        gridTemplateAreas: `
            "image name name description"
            "image input slider slider"
        `,
        alignItems: "center",
        justifyItems: "center",
        gridGap: 10,

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
        width: 72,
    },
    slider: {
        gridArea: "slider",
        maxWidth: 500,
    },
}))

export default function ResearchInput(props) {
    const classes = useStyle()
    const dispatch = useDispatch()
    const research = props.research
    const initialValue = useSelector(store => store.farmValue.farm.commonResearchList.find(element => element.id === research.id)).level
    // const initialValue = useSelector(store => {
    //     console.log(store)
    //     if (store.farmValue.farm) return store.farmValue.farm.commonResearchList.find(element => element.id === research.id)
    //     else return null
    // }).level
    let [value, setValue] = useState(initialValue)
    useEffect(() => setValue(initialValue), [initialValue])

    const handleInputChange = evt => {
        setValue(event.target.value === "" ? "" : Number(event.target.value))
        submitChange()
    }

    const handleBlur = evt => {
        if (value < 0 || value == "") {
            setValue(0)
        }
        else if (value > research.maxLevel) {
            setValue(research.maxLevel)
        }
    }

    const submitChange = () => {
        dispatch(setResearch(research.id, value))
    }

    return (
        <div className={classes.root}>
            <img className={classes.image} src={`/images/r_icon_${research.id}.png`}/>
            <Typography className={classes.name} variant="h6">{research.name}</Typography>
            <Typography className={classes.description} variant="subtitle2">{research.description}</Typography>
            <Input
                type="number"
                className={classes.input}
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
            />
            <Slider
                className={classes.slider}
                value={typeof value === "number" ? value : 0}
                onChange={(evt, newValue) => setValue(newValue)}
                onChangeCommitted={submitChange}
                marks={research.maxLevel <= 50 ? true : []}
                min={0}
                max={research.maxLevel}
                color="secondary"
            />
        </div>
    )
}