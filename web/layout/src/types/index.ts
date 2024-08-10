import type React from "react";

//Type
import type { MenuIcons } from "../assets/icons";

export type MenuItems = {
	name: string;
	icon: (typeof MenuIcons)[number]["name"];
	route: string;
};

export type OrgItems = {
	name: string;
	uid: number;
};

export type OrganizationLayout = {
	list: Array<OrgItems>;
	current?: OrgItems;
	change: (uid: OrgItems["uid"]) => void;
	create?: () => void;
};

export type LayoutRailProps = {
	children: React.ReactNode;
	profile?: {
		name: string;
		action: (action: string) => void;
	};
	organization?: OrganizationLayout;
	router: {
		top?: Array<MenuItems>;
		bottom?: Array<MenuItems>;
		navigate: (route: string) => void;
		current: string;
	};
};
