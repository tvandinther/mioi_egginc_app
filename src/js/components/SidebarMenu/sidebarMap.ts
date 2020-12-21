import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SettingsIcon from "@material-ui/icons/Settings";
import NotesIcon from "@material-ui/icons/Notes";
import LinkIcon from "@material-ui/icons/Link";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core";

const sidebarMap: SidebarMap = [
    {
        "Dashboard" : {
            path: "/",
            icon: HomeIcon,
            disabled: false,
        },
        "Contracts" : {
            path: "/contract",
            icon: ReceiptIcon,
            disabled: false,
        },
        "Farm Value" : {
            path: "/farmvalue",
            icon: AttachMoneyIcon,
            disabled: false,
        },
    },
    // Other
    {
        "App Settings": {
            path: "/settings",
            icon: SettingsIcon,
            disabled: false,
        },
        "News": {
            path: "/news",
            icon: NotesIcon,
        },
        "Feedback": {
            path: "https://forms.gle/CQqQ21XJfsm1GgECA",
            icon: LinkIcon,
            external: true,
        },
        "Get Egg, Inc.": {
            path: "http://www.auxbrain.com/",
            icon: LinkIcon,
            external: true,
        }
    },
]

export default sidebarMap

export type SidebarMap = SidebarItemSet[]
export type SidebarItemSet = {[key: string]: SidebarItem}
export interface SidebarItem {
    path: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    disabled?: boolean;
    external?: boolean;
}