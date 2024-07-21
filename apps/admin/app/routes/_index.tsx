import { Button } from "@mantine/core";

//Packages
import { LayoutRail } from "@localpkg/web.layout";

//Styles
import "@localpkg/web.layout/dist/styles.css";

export default function Index() {
	return (
		<div className="font-sans p-4">
			<Button variant="filled">Button</Button>
			<LayoutRail />
		</div>
	);
}
