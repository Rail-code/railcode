declare module "*.png" {
	const value: any;
	export = value;
}
declare module "*.svg" {
	import type { FunctionComponent, SVGProps } from "react";

	export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>;
	const src: string;
	export default src;
}
declare module "*.jpg" {
	const value: any;
	export = value;
}
declare module "*.jpeg" {
	const value: any;
	export = value;
}
declare module "*.gif" {
	const value: any;
	export = value;
}
declare module "*.bmp" {
	const value: any;
	export = value;
}
declare module "*.json" {
	const value: any;
	export default value;
}
declare module "*.scss" {
	const content: { [className: string]: string };
	export default content;
}
