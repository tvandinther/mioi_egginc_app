import React from "react"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { blueGrey, deepOrange } from "@material-ui/core/colors"

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: blueGrey,
        secondary: deepOrange,
    },
    status: {
        danger: 'red',
    }
})

export default function MyThemeProvider(props) {
    return (
        <ThemeProvider theme={lightTheme}>
            {props.children}
        </ThemeProvider>
    )
}