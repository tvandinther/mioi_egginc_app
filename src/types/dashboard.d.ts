import { NewsPost } from "./app.redux";
import { Contract, MetaContract } from "./contract";
import PlayerDataRedux from "./playerData.redux";

export default interface DashboardOptions {
	cards: {
		player?: PlayerCardProps,
		news?: NewsCardProps,
		contracts?: CoopSummaryCardProps[]
		links?: QuickLinkCardProps[]
	}
	// cards: DashboardCard[],
}

export type DashboardCardType = "player" | "news" | "coopSummary" | "quickLink"

export interface DashboardCard {
	show: boolean,
	type?: DashboardCardType,
	key: string,
	priority: number,
}

export interface PlayerCardProps extends DashboardCard {
	playerData: PlayerDataRedux,
}

export interface NewsCardProps extends DashboardCard {
	post: NewsPost,
}

export interface CoopSummaryCardProps extends DashboardCard {
	contract: Contract,
	metaContract: MetaContract,
}

export interface QuickLinkCardProps extends DashboardCard {
	link: string,
	title: string,
	body: string,
	imgSrc?: string
}