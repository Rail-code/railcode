import type React from "react";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
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
