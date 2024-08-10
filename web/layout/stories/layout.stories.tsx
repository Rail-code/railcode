import { LayoutRail } from "../src";

export default {
	title: "Web/Layout",
};

export const Basic = {
	render: (props) => {
		return (
			<LayoutRail
				organization={{
					list: [],
					current: {
						uid: 1,
						name: "Jhon Doe's",
					},
					change: () => {},
				}}
				router={{
					navigate: () => {},
					current: "/apps",
					bottom: [
						{
							name: "Help",
							icon: "help",
							route: "/help",
						},
					],
					top: [
						{
							name: "Apps",
							icon: "dashboard",
							route: "/apps",
						},
						{
							name: "Members",
							icon: "members",
							route: "/members",
						},
						{
							name: "Settings",
							icon: "settings",
							route: "/settings",
						},
					],
				}}
			>
				<p>Content</p>
			</LayoutRail>
		);
	},
	name: "Basic",
	parameters: {
		controls: { expanded: true },
	},
	args: {},
	argTypes: {},
};
