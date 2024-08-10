//Components
import { Menu } from "@mantine/core";

//Styles
import Sty from "./style.module.scss";

//Icons
import { AccountIcon } from "../../assets/icons/list/Account";

export const Profile = () => {
	return (
		<Menu position="top" shadow="lg" width={180}>
			<Menu.Target>
				<div className={Sty.profile}>
					<span>
						<AccountIcon />
					</span>
					<p>John Doe</p>
				</div>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item>Profile</Menu.Item>
				<Menu.Divider />
				<Menu.Item color="red">Logout</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
