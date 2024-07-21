import Sty from "./styles/layout.module.scss";

//Types
import { type LayoutRailProps } from "./types";

/**
 * @description Layout app
 */
export const LayoutRail = (props: LayoutRailProps) => {
	return (
		<main className={Sty.main}>
			<aside className={Sty.aside_container}>
				<div className={Sty.aside_content}></div>
			</aside>

			<div className={Sty.content}></div>
		</main>
	);
};
