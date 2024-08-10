import { AccountIcon } from "./list/Account";
import { DashboardIcon } from "./list/Dashboard";
import { MembersIcon } from "./list/Members";
import { SettingsIcon } from "./list/Settings";
import { HelpIcon } from "./list/Help";

export const MenuIcons = [
	{
		name: "account",
		icon: AccountIcon,
	},
	{
		name: "dashboard",
		icon: DashboardIcon,
	},
	{
		name: "members",
		icon: MembersIcon,
	},
	{
		name: "settings",
		icon: SettingsIcon,
	},
	{
		name: "help",
		icon: HelpIcon,
	},
] as const;
