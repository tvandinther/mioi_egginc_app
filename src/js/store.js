import { applyMiddleware, createStore } from "redux"

import promise from "redux-promise-middleware"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import reducer from "./reducers"

const persistConfig = {
    key: "appSettings",
    storage,
    whitelist: ['settings'],
}

const persistedReducer = persistReducer(persistConfig, reducer)


let store = createStore(
    persistedReducer,
    applyMiddleware(promise, logger, )
)

export default store
export let persistor = persistStore(store)