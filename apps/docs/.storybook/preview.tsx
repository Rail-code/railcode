import type { Preview } from "@storybook/react";

import "@storybook/addon-console";

//Providers
import { ThemeMantineProvider } from "@localpkg/pkg.ui.core";

//Theme
import Theme from "./theme";

//Styles
import "../global/app.scss";

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on.*" },
		docs: {
			theme: Theme,
		},
	},
	decorators: [
		(Story) => (
			<ThemeMantineProvider>
				<Story />
			</ThemeMantineProvider>
		),
	],
};

export default preview;
