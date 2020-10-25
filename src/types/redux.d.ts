import { DefaultRootState } from "react-redux";
import AppRedux from "./app.redux";
import ContractRedux from "./contract.redux";
import FarmValueRedux from "./farmValue.redux";
import PlayerDataRedux from "./playerData.redux";
import SettingsRedux from "./settings.redux";
import UIRedux from "./ui.redux";

declare module "react-redux" {
	export interface DefaultRootState {
		UI: UIRedux,
		app: AppRedux,
		contract: ContractRedux,
		farmValue: FarmValueRedux,
		playerData: PlayerDataRedux,
		settings: SettingsRedux,
	}
}