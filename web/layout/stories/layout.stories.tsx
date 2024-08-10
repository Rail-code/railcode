import { LayoutRail } from "../src";

export default {
	title: "Web/Layout",
};

export const Basic = {
	render: (props) => {
		return (
			<LayoutRail
				router={{
					change: () => {},
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
