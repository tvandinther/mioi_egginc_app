import { combineReducers } from "redux"

import UI from "./UIReducer"
import contract from "./contractReducer"

export default combineReducers({
    UI,
    contract,
})