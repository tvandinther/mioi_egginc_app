import React, { useState } from "react"
import { setPlayerId, validatePlayerId } from "../../actions/settingsActions"
import { TextField } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"

// MY ID FOR TESTING
// 105311171997915647553

export default function PlayerIDInput(props) {
    const dispatch = useDispatch()
    const playerId = useSelector(store => store.settings.playerId)
    const error = useSelector(store => store.playerData.error)
    let [value, setValue] = useState(playerId || "")

    const handleChange = event => {
        setValue(event.target.value)
    }
    const handleBlur = event => {
        if (value !== playerId) {
            dispatch(validatePlayerId(value))
            dispatch(setPlayerId(value))
        }
    }

    return (
        <TextField 
            value={value}
            fullWidth
            error={error}
            helperText="Found at the bottom of the 'Privacy & Data' in-game menu"
            label="Player ID"
            onBlur={handleBlur}
            onChange={handleChange}
        />
    )
}