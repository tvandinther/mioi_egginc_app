export default interface SettingsRedux {
	darkTheme: boolean,
	detailedRewardsBar: boolean,
	hourlyEggLayingRate: boolean,
	playerId: string,
	savedIds: {[key: string]: string},
}