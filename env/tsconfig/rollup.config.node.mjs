import { defineConfig } from "rollup";

import swc from "rollup-plugin-swc3";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import cleanDir from "@rollup-extras/plugin-clean";
import { tscGenerator } from "rollup-plugin-tsc-generator";

const CONFIG = {
	root: "src",
	input: "src/index.ts",
	output: "dist",
};

/**
 * Execute build config
 */
export default defineConfig({
	input: CONFIG.input,
	output: [
		{ file: "dist/index.js", format: "cjs" },
		{ file: "dist/index.mjs", format: "esm" },
	],
	plugins: [
		cleanDir({
			targets: CONFIG.output,
			deleteOnce: true,
			outputPlugin: true,
			verbose: true,
		}),
		json(), //Allow using json
		commonjs(), //Allow commonjs
		swc({
			minify: true,
			jsc: {
				//Use typescript as default
				parser: {
					syntax: "typescript",
					decorators: true,
					dynamicImport: true,
				},
				target: "esnext",
				transform: {},
			},
		}),
		tscGenerator(),
	],
});
