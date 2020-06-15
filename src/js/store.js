import { applyMiddleware, createStore, compose } from "redux"

import promise from "redux-promise-middleware"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import reducer from "./reducers"

const persistConfig = {
    key: "appSettings",
    storage,
    whitelist: ['settings', 'app', 'playerData'], // Only persists stores under these names
}

const persistedReducer = persistReducer(persistConfig, reducer)

let middleware = [promise]
if (process.env.NODE_ENV !== "production") {
	middleware.push(logger)
	middleware.push()
}

const composeEnhancers = (typeof window !== 'undefined' && (process.env.NODE_ENV !== "production") && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

let store = createStore(
	persistedReducer,
	composeEnhancers(
		applyMiddleware(...middleware)
	)
)

export default store
export let persistor = persistStore(store)