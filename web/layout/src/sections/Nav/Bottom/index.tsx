//Styles
import Sty from "./style.module.scss";

//Utils
import { GetNavIcon } from "../../../assets/icons/utils";

//Types
import { LayoutRailProps } from "../../../types";

export const NavBottom = (props: {
	list: LayoutRailProps["router"]["bottom"];
	navigate: LayoutRailProps["router"]["navigate"];
}) => {
	if (!props.list?.length) {
		return null;
	}

	return (
		<ul className={Sty.nav_bottom}>
			{props.list.map((item) => (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <not required>
				<li key={item.route} onClick={() => props.navigate(item.route)}>
					<span>{GetNavIcon(item.icon)}</span>
					<p>{item.name}</p>
				</li>
			))}
		</ul>
	);
};
