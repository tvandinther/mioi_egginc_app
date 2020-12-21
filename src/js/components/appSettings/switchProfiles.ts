import actions from "../../actions"

export interface SwitchProfiles {
	[key: string]: SwitchProfile;
}

export interface SwitchProfile {
	store: string;
	action: keyof typeof actions;
	label: string;
	metrics: {
		category: string;
		true: string;
		false: string;
		label: string | undefined;
	}
}

const profiles: SwitchProfiles = {
	"darkTheme": {
		"store": "settings.darkTheme",
		"action": "setDarkTheme",
		"label": "Dark Theme",
		"metrics": {
			"category": "Appearance",
			"true": "Dark Theme Enabled",
			"false": "Light Theme Enabled",
			"label": undefined
		}
	},
	"hideTooltips": {
		"store": "settings.hideTooltips",
		"action": "hideTooltips",
		"label": "Hide Tooltips",
		"metrics": {
			"category": "Appearance",
			"true": "Tooltips Hidden",
			"false": "Tooltips Shown",
			"label": undefined
		}
	},
	"detailedRewardsBar": {
		"store": "settings.detailedRewardsBar",
		"action": "detailedRewardsBar",
		"label": "Detailed Rewards Bar",
		"metrics": {
			"category": "Appearance",
			"true": "Detailed Rewards Bar",
			"false": "Simple Rewards Bar",
			"label": undefined
		}
	},
	"hourlyEggLayingRate": {
		"store": "settings.hourlyEggLayingRate",
		"action": "hourlyEggLayingRate",
		"label": "Show Laying Rate Per Hour",
		"metrics": {
			"category": "Units",
			"true": "Hourly Egg Laying Rate",
			"false": "Seconds Egg Laying Rate",
			"label": undefined
		}
	},
	"groupCalc": {
		"store": "contract.contractCalc.groupCalc",
		"action": "groupCalc",
		"label": "Group Calculation",
		"metrics": {
			"category": "Contract",
			"true": "Group Calculation",
			"false": "Solo Calculation",
			"label": undefined
		}
	}
}

export default profiles