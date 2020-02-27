import { combineReducers } from "redux"

import UI from "./UIReducer"
import contract from "./contractReducer"
import farmValue from "./farmValueReducer"
import settings from "./settingsReducer"
import playerData from "./playerDataReducer"

export default combineReducers({
    UI,
    contract,
    farmValue,
    settings,
    playerData,
})