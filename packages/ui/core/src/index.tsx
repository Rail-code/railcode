import type React from "react";

import { MantineProvider } from "@mantine/core";
import { MantineEmotionProvider } from "@mantine/emotion";
import styled from "@emotion/styled";

//Config
import { themeCoreMantine } from "./config/theme";

//Utils
import { createThemeCache } from "./utils/cache";

/**
 * @description Main theme provider of rail-code
 */
export const ThemeMantineProvider = ({ children }: { children: React.ReactNode }) => {
	const cache = createThemeCache({});

	return (
		<MantineProvider theme={themeCoreMantine} classNamesPrefix="railcode">
			<MantineEmotionProvider cache={cache}>{children}</MantineEmotionProvider>
		</MantineProvider>
	);
};

export { themeCoreMantine } from "./config/theme";

export { styled };
