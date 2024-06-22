#! /usr/bin/env node

import figlet from "figlet";
import chalk from "chalk";
import { Command, type OptionValues } from "commander";

//Version
import PackageJson from "../package.json";

//Features

/**
 * Create instance
 */
const CLI = new Command();

/**
 * Print name
 */
console.log(chalk.cyanBright(figlet.textSync("Railcode CLI", { horizontalLayout: "full" })));

/**
 * Create CLI
 */
CLI.version(PackageJson.version).description("CLI to manage updates");

/**
 * Save options to shared
 */
let state: { options: OptionValues } = {
	options: {},
};

state.options = CLI.opts();

/**
 * Parse arguments and start CLI
 */
CLI.parse(process.argv);
