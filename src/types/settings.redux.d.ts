export default interface SettingsRedux {
	darkTheme: boolean,
	detailedRewardsBar: boolean,
	hourlyEggLayingRate: boolean,
	hideTooltips: boolean,
	playerId: string,
	savedIds: {[key: string]: string},
}