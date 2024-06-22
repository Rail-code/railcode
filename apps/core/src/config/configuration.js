"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
var config_1 = require("@nestjs/config");
/**
 * Common app config
 */
exports.AppConfig = (0, config_1.registerAs)("app", function () {
	return {
		port: process.env.PORT || 4000,
	};
});
