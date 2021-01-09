import { TypeBackground } from "@material-ui/core/styles/createPalette"
import { Theme, ThemeOptions } from "@material-ui/core/styles"

declare module "@material-ui/core/styles" {
	interface Theme {
		status: {
			danger: string,
		}
	}

	interface ThemeOptions {
		status?: {
			danger?: string,
		}
	}
}

declare module "@material-ui/core/styles/createPalette" {
	interface TypeBackground {
            card: string,
            off: string,
            offOverlay: string,
	}
}