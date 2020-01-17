import React from "react"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { indigo, deepOrange, deepPurple } from "@material-ui/core/colors"

const headLineFontFamily = [
    "Raleway",
    "Helvetica",
    "Arial",
    "sans-serif",
].join(",")

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: indigo,
        secondary: deepOrange,
    },
    status: {
        danger: 'red',
    },
    typography: {
        fontFamily: [
            "Open Sans",
            "Helvetica",
            "Arial",
            "sans-serif",
        ].join(","),
        h1: {
            fontFamily: headLineFontFamily,
        },
        h2: {
            fontFamily: headLineFontFamily,
        },
        h3: {
            fontFamily: headLineFontFamily,
        },
        h4: {
            fontFamily: headLineFontFamily,
        },
        h5: {
            fontFamily: headLineFontFamily,
        },
        h6: {
            fontFamily: headLineFontFamily,
        },
    }
})

export default function MyThemeProvider(props) {
    return (
        <ThemeProvider theme={lightTheme}>
            {props.children}
        </ThemeProvider>
    )
}