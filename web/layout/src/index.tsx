import Sty from "./styles/layout.module.scss";

//Sections
import { Logo } from "./sections/Logo";
import { NavTop } from "./sections/Nav/Top";
import { Profile } from "./sections/Profile";
import { NavBottom } from "./sections/Nav/Bottom";
import { Organizations } from "./sections/Organization";

//Types
import { type LayoutRailProps } from "./types";

/**
 * @description Layout app
 */
export const LayoutRail = (props: LayoutRailProps) => {
	return (
		<main className={Sty.main}>
			<aside className={Sty.aside_container}>
				<div className={Sty.aside_content}>
					<div className={Sty.aside_top}>
						<Logo />
						<Organizations
							list={props.organization?.list}
							change={props.organization?.change}
							current={props.organization?.current}
							create={props.organization?.create}
						/>
						<NavTop list={props.router.top} navigate={props.router.navigate} />
					</div>
					<div className={Sty.aside_bottom}>
						<NavBottom list={props.router.bottom} navigate={props.router.navigate} />
						<Profile />
					</div>
				</div>
			</aside>

			<div className={Sty.content}>{props.children}</div>
		</main>
	);
};
