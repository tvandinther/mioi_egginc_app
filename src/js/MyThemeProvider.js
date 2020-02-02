import React from "react"
import { StylesProvider, ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles"
import { indigo, deepOrange } from "@material-ui/core/colors"
import { create } from "jss"

const jss = create()
jss.createStyleSheet({
    gridCenter: {
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplate: "1fr / 1fr",
    }
})

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
        <StylesProvider>
            <ThemeProvider theme={lightTheme}>
                {props.children}
            </ThemeProvider>
        </StylesProvider>
    )
}