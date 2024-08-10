//Styles
import Sty from "./style.module.scss";

//Assets
import { LogoRailCode } from "../../assets/logo";

export const Logo = () => {
	return (
		<div className={Sty.logo}>
			<LogoRailCode />
		</div>
	);
};
