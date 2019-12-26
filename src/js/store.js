import { applyMiddleware, createStore } from "redux"

import promise from "redux-promise-middleware"
import logger from "redux-logger"

import reducer from "./reducers"

export default createStore(
    reducer,
    applyMiddleware(promise, logger)
)