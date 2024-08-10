import type React from "react";

//Type
import type { MenuIcons } from "../assets/icons";

export type MenuItems = {
	name: string;
	icon: (typeof MenuIcons)[number]["name"];
	route: string;
};

export type LayoutRailProps = {
	children: React.ReactNode;
	profile?: {
		name: string;
		change: (action: string) => void;
	};
	router: {
		top?: Array<MenuItems>;
		bottom?: Array<MenuItems>;
		navigate: (route: string) => void;
		current: string;
	};
};
