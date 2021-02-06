import {getCoop} from "../actions/contractActions"

export function getDayIndex(dateObject: Date): number {
	const baseDate = new Date("2000-01-01")
	return Math.floor((dateObject.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))
}

export function fetchPlayerCoops(coopIds: any, dispatch: any): void {
	for (let item of coopIds) {
		let contractId = item.contract.id
		let coopId = item.coopId
		if (coopId) dispatch(getCoop(coopId, contractId, true))
	}
}

export function copyToClipboard(str: string): void {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export function composeClassNames(...args: string[]): string {
	return Array.from(arguments).join(" ")
}