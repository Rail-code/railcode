import { defineConfig } from "rollup";

import svgr from "@svgr/rollup";
import swc from "rollup-plugin-swc3";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import commonjs from "@rollup/plugin-commonjs";
import cleanDir from "@rollup-extras/plugin-clean";
import preserveDirectives from "rollup-preserve-directives";
import { tscGenerator } from "rollup-plugin-tsc-generator";

const CONFIG = {
	root: "src",
	input: "src/index.tsx",
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
		postcss({
			extract: "styles.css",
			extensions: [".scss", ".css"],
			modules: true,
			minimize: true,
		}),
		svgr({ plugins: ["@svgr/plugin-jsx"] }), //allow svg files
		json(), //Allow using json
		commonjs(), //Allow commonjs
		swc({
			minify: true,
			jsc: {
				//Use typescript as default
				parser: {
					syntax: "typescript",
					tsx: true,
					decorators: true,
					dynamicImport: true,
				},
				target: "esnext",
				transform: {
					//Support reacts
					react: {
						runtime: "automatic",
					},
				},
			},
		}),
		preserveDirectives(), //Allow keeping directives on top like use client, etc.
		tscGenerator(),
	],
});
