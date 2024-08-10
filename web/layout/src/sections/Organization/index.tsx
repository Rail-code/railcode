//Components
import { Menu } from "@mantine/core";

//Styles
import Sty from "./style.module.scss";

export const Organizations = () => {
	return (
		<Menu position="bottom" shadow="lg" width={180}>
			<Menu.Target>
				<div className={Sty.organization}>
					<div className={Sty.__selected}>
						<span>J</span>
						<p>John Doe's</p>
					</div>
				</div>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item>Organization 2</Menu.Item>
				<Menu.Divider />
				<Menu.Item color="green" >Create new</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
