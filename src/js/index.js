import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import MyThemeProvider from "./MyThemeProvider"

import App from "./App.js"
import store from "./store"

ReactDOM.render(
    <MyThemeProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </MyThemeProvider>
    , document.getElementById("root")
)