import _ from "lodash";

import { swc } from "rollup-plugin-swc3";
import { cleandir } from "rollup-plugin-cleandir";
import preserveDirectives from "rollup-preserve-directives";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import css from "rollup-plugin-import-css";
import svgr from "@svgr/rollup";

//Custom plugins
import { tscGenerator } from "./rollup/plugins/tsc.mjs";

const createBundle = () => {
	const config = {
		build: {
			folder: "src",
			output: "dist",
			rootFile: "index.tsx",
		},
		builds: {
			cjs: {
				extension: "js",
				options: { exports: "named" },
			},
			esm: {
				extension: "mjs",
				options: { exports: "named" },
			},
		},
		rollup: {
			treeshake: true,
			external: ["react"],
			plugins: [
				css(),
				svgr({ plugins: ["@svgr/plugin-jsx"] }), //allow svg files
				json(), //Allow to use json
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
							//Support react
							react: {
								runtime: "automatic",
							},
						},
					},
				}),
				preserveDirectives(), //Allow to keep directives on top like use client, etc..
				tscGenerator(),
			],
		},
	};

	const entity = {
		exports: [],
	};

	_.forEach(config.builds, (value, format) => {
		const step = {
			input: `${config.build.folder}/${config.build.rootFile}`,
			output: {
				file: `${config.build.output}/index.${value.extension}`,
				format,
				...value.options,
			},
			//Keep base config without plugins
			..._.omit(config.rollup, "plugins"),
			plugins: [],
		};

		/**
		 * First build will contain a script to clean up "output" folder
		 */
		if (_.isEmpty(entity.exports)) {
			step.plugins.push(cleandir(`./${config.build.output}`));
		}

		//Push other plugins
		step.plugins.push(...config.rollup.plugins);

		//Add build step
		entity.exports.push(step);
	});

	return entity.exports;
};

/**
 * Execute build config
 */
const buildSetup = createBundle();

export default buildSetup;
