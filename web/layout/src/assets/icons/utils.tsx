//Icons
import { MenuIcons } from ".";

/**
 *@description Get an icon if not return null
 */
export const GetNavIcon = (uid?: (typeof MenuIcons)[number]["name"]) => {
	const selected = MenuIcons.find((icon) => icon.name === uid);

	if (!selected?.icon) {
		return null;
	}

	const IconElement = selected.icon;

	return <IconElement />;
};
