import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import MyThemeProvider from "./MyThemeProvider"

import App from "./App.js"
import store, { persistor } from "./store"

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js', {scope: "/", updateViaCache: 'none'}).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MyThemeProvider>
                <App/>
            </MyThemeProvider>
        </PersistGate>
    </Provider>
    , document.getElementById("root")
)