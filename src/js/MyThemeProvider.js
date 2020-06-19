import React from "react"
import { StylesProvider, ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { indigo, deepOrange, deepPurple } from "@material-ui/core/colors"
import { useSelector } from "react-redux"

const headLineFontFamily = [
    "Raleway",
    "Helvetica",
    "Arial",
    "sans-serif",
].join(",")

const commonThemeOverrides= {
	MuiCssBaseline: {
		"@global": {
			a: {
				textDecoration: "none",
				color: "inherit",
			},
		},
	},
	MuiSlider: {
		rail: {
			height: 10,
		},
		track: {
			height: 10,
		},
		mark: {
			width: 4,
			borderRadius: 2,
			height: 10,
		},
		markLabel: {
			top: 32,
		},
		thumb: {
			width: 18,
			height: 24,
			marginLeft: 18 / -2,
			marginTop: (24 / -2) + (10 / 2), // half the negative thumb height + half the track height
			borderWidth: 2,
			borderRadius: 9,
			borderStyle: "solid",
			borderColor: "white",
		}
	},
	MuiContainer: {
		root: {
			paddingLeft: 8,
			paddingRight: 8,
		}
	},
}

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
	overrides: Object.assign({
		//
	}, commonThemeOverrides),
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
    overrides: Object.assign({
		MuiCard: {
			root: {
				backgroundColor: "#222"
			}
		},
	}, commonThemeOverrides),
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
    return (
        <StylesProvider>
            <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
                {props.children}
            </ThemeProvider>
        </StylesProvider>
    )
}