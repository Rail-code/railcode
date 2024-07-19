import { defineConfig } from "rollup";

import svgr from "@svgr/rollup";
import swc from "@rollup/plugin-swc";
import json from "@rollup/plugin-json";
import css from "rollup-plugin-import-css";
import commonjs from "@rollup/plugin-commonjs";
import cleanDir from "@rollup-extras/plugin-clean";
import preserveDirectives from "rollup-preserve-directives";
import typescript from "@rollup/plugin-typescript";

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
		css(),
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
		typescript({
			outDir: CONFIG.output,
			rootDir: CONFIG.root,
			noEmitOnError: true,
			noForceEmit: true,
		}),
	],
});
