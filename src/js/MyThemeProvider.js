import React, { useEffect } from "react"
import { StylesProvider, ThemeProvider, createMuiTheme, makeStyles } from "@material-ui/core/styles"
import { indigo, deepOrange, deepPurple } from "@material-ui/core/colors"
import { create } from "jss"
import { useSelector } from "react-redux"
import ReactGA from "react-ga"

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
        background: {
            card: "#eee",
            off: "#e0e0e0",
            offOverlay: "rgba(255, 255, 255, 0.8)",
        }
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

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: deepPurple,
        secondary: deepOrange,
        background: {
            card: "#222",
            off: "#383838",
            offOverlay: "rgba(56, 56, 56, 0.8)",
        }
    },
    status: {
        danger: 'red',
    },
    overrides: {
        MuiCard: {
            root: {
                backgroundColor: "#222"
            }
        }
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
	const isDarkTheme = useSelector(store => store.settings.darkTheme)
	useEffect(() => {
		ReactGA.event({
			category: "Theme",
			action: isDarkTheme ? "Dark Theme Enabled" : "Light Theme Enabled",
		})
	}, [isDarkTheme])
    return (
        <StylesProvider>
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                {props.children}
            </ThemeProvider>
        </StylesProvider>
    )
}