import type React from "react";

import { MantineProvider } from "@mantine/core";

//Config
import { ThemeCoreMantine } from "./config/theme";

/**
 * @description Main theme provider of rail-code
 */
export const ThemeMantineProvider = ({ children }: { children: React.ReactNode }) => {
	return <MantineProvider theme={ThemeCoreMantine} classNamesPrefix="railcode">{children}</MantineProvider>;
};
