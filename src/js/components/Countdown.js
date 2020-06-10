import React, { useState, useEffect } from "react"
import { Typography } from "@material-ui/core"
import { getExpireETA } from "../tools"


// This component needs a bunch of work before usage
export default function Countdown(props) {
	const to = props.to
	
	const calculateText = (type) => {
		let now = new Date()
		let deltaMs = to - now
		let deltaS = deltaMs / 1000
		let d = Math.floor(deltaS / (3600*24));
		let h = Math.floor(deltaS % (3600*24) / 3600);
		let m = Math.floor(deltaS % 3600 / 60);
		let s = Math.floor(deltaS % 60);
		let stringValues = [d, h, m, s];
		let seperators = {
			word: {
				d: " days ",
				h: " hours ",
				m: " minutes ",
				s: " seconds "
			},
			char: {
				d: "d ",
				h: "h ",
				m: "m ",
				s: "s "
			},
			colon: {
				d: ":",
				h: ":",
				m: ":",
				s: ""
			}
		}

		// run through the array and format a suitable string
		let timeString = ''
		if (stringValues[0] > 0) {
			timeString += stringValues[0] + seperators[type]["d"];
		}
		if (stringValues[1] > 0) {
			timeString += stringValues[1] + seperators[type]["h"];
		}
		if (stringValues[2] > 0) {
			timeString += stringValues[2] + seperators[type]["m"];
		}
		if (stringValues[3] > 0) {
			timeString += stringValues[3] + seperators[type]["s"];
		}
		if (timeString == "") {
			return "0";
		}
		else {
			return timeString.slice(0, timeString.length - 1);
		}
	}

	let [text, setText] = useState(updateFunc)
	const updateFunc = () => setText(calculateText("char"))
	useEffect(() => {
		updateFunc()
	}, [])
	setInterval(updateFunc, 1000)

	return (
		<Typography>{text}</Typography>
	)
}