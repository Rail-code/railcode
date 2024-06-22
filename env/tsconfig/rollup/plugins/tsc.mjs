import ts from "typescript";
import path from "path";

const DEFAULT_CONFIG = {
	dist: "./dist",
};

/**
 * Typescript plugin to generate types
 * @param {Object} opts
 * @param {string} opts.dist - Folder to export types
 * @returns
 */
export const tscGenerator = (opts = {}) => {
	return {
		name: "rollup-plugin-tsc-generator",
		buildStart() {
			const state = {
				config: { ...DEFAULT_CONFIG },
				typescript: {
					file: null,
					content: null,
					options: {
						emitDeclarationOnly: true,
						noEmit: false,
					},
					command: null,
				},
			};

			//Merge config
			Object.assign(state.config, opts);

			// Load the TypeScript config file (e.g., tsconfig.json)
			state.typescript.file = ts.findConfigFile("./", ts.sys.fileExists, "tsconfig.json");

			if (!state.typescript.file) {
				throw new Error('Could not find a valid "tsconfig.json".');
			}

			//Read configuration
			state.typescript.content = ts.readConfigFile(state.typescript.file, ts.sys.readFile).config;

			//Add dist folder
			Object.assign(state.typescript.options, {
				outDir: state.config.dist,
			});

			// console.log(state.typescript.file)

			// Parse JSON string content to compiler options
			state.typescript.command = ts.parseJsonConfigFileContent(
				state.typescript.content,
				ts.sys,
				path.dirname(state.typescript.file),
				state.typescript.options,
				state.typescript.file,
			);

			// console.log(state.typescript.command);
			// Create a program instance to compile files
			const tsProgram = ts.createProgram(state.typescript.command.fileNames, state.typescript.command.options);

			const tsProgramEmitResult = tsProgram.emit();

			// Check for and report any errors
			const diagnostics = ts.getPreEmitDiagnostics(tsProgram).concat(tsProgramEmitResult.diagnostics);

			/**
			 * Run diagnostics
			 */
			diagnostics.forEach((diagnostic) => {
				if (diagnostic.file) {
					const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);

					const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

					this.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
				} else {
					this.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
				}
			});

			// Check if there were any emit errors
			if (tsProgramEmitResult.emitSkipped) {
				this.error("TypeScript emit failed");
			} else {
				this.warn("TypeScript emit succeeded");
			}
		},
	};
};
