import { createTheme, type MantineThemeOverride } from "@mantine/core";

export const themeCoreMantine: MantineThemeOverride = createTheme({
	colors: {
		primary: [
			"#f3f3f7",
			"#e4e3e7",
			"#c6c4d1",
			"#a7a2ba",
			"#5E5684",
			"#504970",
			"#423D5D",
			"#343049",
			"#262336",
			"#181622",
		], // Defines the primary color
	},
	primaryColor: "primary", // Use the 'primary' color
});
