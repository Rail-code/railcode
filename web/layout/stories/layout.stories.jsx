import { LayoutRail } from "../src";

export default {
	title: "Web/Layout",
};

export const Basic = {
	render: (props) => {
		return (
			<LayoutRail>
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
