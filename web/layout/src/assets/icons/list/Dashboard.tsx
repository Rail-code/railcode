import * as React from "react";

import type { SVGProps } from "react";

export const DashboardIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			role="graphics-symbol"
			xmlns="http://www.w3.org/2000/svg"
			width={24}
			height={24}
			fill="none"
			color="#fff"
			{...props}
		>
			<circle cx={17.75} cy={6.25} r={4.25} stroke="currentColor" strokeWidth={1.5} />
			<circle cx={6.25} cy={6.25} r={4.25} stroke="currentColor" strokeWidth={1.5} />
			<circle cx={17.75} cy={17.75} r={4.25} stroke="currentColor" strokeWidth={1.5} />
			<circle cx={6.25} cy={17.75} r={4.25} stroke="currentColor" strokeWidth={1.5} />
		</svg>
	);
};
