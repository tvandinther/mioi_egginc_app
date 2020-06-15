import React from "react"
import { ProgressBar, Step } from "react-step-progress-bar"
import "react-step-progress-bar/styles.css"
import eggTypes from "../../../tools/eggTypes.json"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { Tooltip, Typography, Paper } from "@material-ui/core"
import { useSelector } from "react-redux"
import { convertSymbol } from "../../../tools"
import HelpTooltip from "../../Decorator/HelpTooltip"

const useStyle = makeStyles(theme => ({
	root: {
		padding: 8,
		flexGrow: 2,
		flexBasis: "100%",
	}
}))

export default function NextEgg(props) {
	const theme = useTheme()
	const classes = useStyle()
	const currentEggType = useSelector(store => store.farmValue.farm.eggType)
	const { farmValue } = props
	const currentEgg = eggTypes[currentEggType]
	const currentEggIndex = Number(currentEggType) - 1
	const eggTypeArray = Object.values(eggTypes).filter(egg => typeof egg.unlock === "number")
	const contractEgg = !(typeof currentEgg.unlock === "number")
	let progress, steps, stepPositions, title
	if (!contractEgg) {
		let eggIndex = currentEggIndex
		for (let i = currentEggIndex + 1; i < eggTypeArray.length; i++) {
			let egg = eggTypeArray[i]
			eggIndex = i
			if (farmValue < egg.unlock) {
				break
			}
		}
		
		
		const slicedEggArray = eggTypeArray.slice(currentEggIndex, eggIndex + 1)
		const nextEgg = slicedEggArray[slicedEggArray.length - 1]
		const calculatePosition = value => {
			let ratioBase = 0 // currentEgg.unlock
			let ratio = (value - ratioBase) / nextEgg.unlock
			let logRatio = Math.pow(ratio, 1 / 4)
			return Math.min(Math.max(0, logRatio), 1) * 100
		}
		progress = calculatePosition(farmValue)
		steps = generateSteps(slicedEggArray)
		stepPositions = slicedEggArray.map(egg => calculatePosition(egg.unlock))
		title = `${convertSymbol(farmValue)}/${convertSymbol(nextEgg.unlock)}`
	}
	else {
		progress = 100
		steps = generateSteps([currentEgg])
		stepPositions = [100]
		title = "Contract Egg"
	}
	

	function generateSteps(eggArray) {
		return eggArray.map((egg, eggIndex) => {
			return (
				<Step key={eggIndex} transition="scale">
					{({ accomplished, index}) => {
						const stepStyle = {
							filter: ["drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.4))"].join(" "),
							transform: accomplished ? "scale(0.8)" : null,
							opacity: accomplished ? 0.8 : 1,
							pointerEvents: "none",
						}
						return (
							<Tooltip
								title={egg.name}
								placement="top"
							>
								<div>
									<img width={40} src={`/images/egg${egg.id}.png`} style={stepStyle}></img>
								</div>
							</Tooltip>
						)
					}}
				</Step>
			)
		})
	}
	
	const fill =`linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`

	return (
		<Paper elevation={4} className={classes.root}>
			<Typography align="center">
				Next Egg: {title} <HelpTooltip helpText="This bar shows magnitude-adjusted progression to the next available egg."/>
			</Typography>
			<br/>
			<ProgressBar
				height={20}
				percent={progress}
				filledBackground={fill}
				unfilledBackground={theme.palette.background.off}
				stepPositions={stepPositions}
			>
				{steps}
			</ProgressBar>
		</Paper>
	)
}