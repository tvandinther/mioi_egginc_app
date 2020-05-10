export function getDayIndex(dateObject) {
	const baseDate = new Date("2000-01-01")
	return Math.floor((dateObject - baseDate) / (1000 * 60 * 60 * 24))
}