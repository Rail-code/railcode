import _ from "lodash";

import { $, type Options } from "execa";

/**
 * Shell command
 */
export const Shell = ({ commands, options }: { commands: Array<string>; options?: Options }) => {
	/**
	 * Create default options.
	 */
	const defaultOptions: Options = _.defaults(options, {
		env: { FORCE_COLOR: "true" },
		stdio: "inherit",
		shell: false,
	});

	try {
		//Create execute instance
		const context = $(defaultOptions)`${commands.join(" ")}`;

		/**
		 * Stream output response
		 */
		context.stdout?.pipe(process.stdout, {
			end: true,
		});

		/**
		 * Stream output error
		 */
		context.stderr?.pipe(process.stderr, {
			end: true,
		});

		return context;
	} catch (error) {
		console.error("Error Shell", error);
	}
};
