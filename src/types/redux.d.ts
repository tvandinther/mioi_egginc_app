import { DefaultRootState } from "react-redux";

declare module "react-redux" {
	export interface DefaultRootState {
		settings: {
			darkTheme: boolean,
		},
	}
}