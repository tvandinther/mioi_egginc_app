import { getCoop } from "../actions/contractActions"

export function getDayIndex(dateObject) {
	const baseDate = new Date("2000-01-01")
	return Math.floor((dateObject - baseDate) / (1000 * 60 * 60 * 24))
}

export function fetchPlayerCoops(coopIds, dispatch) {
	for (let item of coopIds) {
		let contractId = item.contract.identifier
		let coopId = item.coopIdentifier
		if (coopId) dispatch(getCoop(coopId, contractId, true))
	}
}

export function copyToClipboard(str) {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
  };