import { combineReducers } from "redux"

import UI from "./UIReducer"
import contract from "./contractReducer"
import settings from "./settingsReducer"

export default combineReducers({
    UI,
    contract,
    settings,
})