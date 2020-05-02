import { combineReducers } from "redux"

import UI from "./UIReducer"
import contract from "./contractReducer"
import farmValue from "./farmValueReducer"
import settings from "./settingsReducer"
import playerData from "./playerDataReducer"
import app from "./appReducer"

export default combineReducers({
	app,
	UI,
	settings,
	playerData,
    contract,
	farmValue,
})