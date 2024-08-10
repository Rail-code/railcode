//Components
import { Menu } from "@mantine/core";

//Styles
import Sty from "./style.module.scss";

//Types
import { OrganizationLayout } from "../../types";

export type OrganizationsProps = Partial<OrganizationLayout>;

export const Organizations = (props: OrganizationsProps) => {
	return (
		<Menu position="bottom" shadow="lg" width={180}>
			<Menu.Target>
				<div className={Sty.organization}>
					{props.current && (
						<div className={Sty.__selected}>
							<span>{props.current?.name.split("")[0]}</span>
							<p>{props.current?.name}</p>
						</div>
					)}
				</div>
			</Menu.Target>

			<Menu.Dropdown>
				{props.list?.map((item) => (
					<Menu.Item key={item.uid}>{item.name}</Menu.Item>
				))}

				{Boolean(props.list?.length) && <Menu.Divider />}

				<Menu.Item
					color="green"
					onClick={() => {
						if (props.create) {
							props.create();
						}
					}}
				>
					Create new
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};
