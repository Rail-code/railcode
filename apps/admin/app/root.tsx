import type React from "react";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import { ColorSchemeScript } from "@mantine/core";

//Theme
import { ThemeMantineProvider } from "@localpkg/pkg.ui.core";

//Global Style
import "@mantine/core/styles.css";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<ColorSchemeScript />
			</head>
			<body>
				<ThemeMantineProvider>{children}</ThemeMantineProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

const App = () => {
	return <Outlet />;
};

export default App;
