import * as crypto from "node:crypto";

export const AppKeyHelper = {
	validate(secret: string, appkey: string) {
		const [prefix, key] = appkey.split(".");

		//Re-compute
		const computed = crypto.createHmac("sha256", secret).update(prefix).digest("hex");

		return computed === key;
	},
	createPrefix() {
		return crypto
			.randomBytes(length)
			.toString("base64")
			.replace(/[^a-zA-Z0-9]/g, "")
			.substring(0, 7);
	},
	create(secret: string) {
		const prefix = this.createPrefix();
		const key = crypto.createHmac("sha256", secret).update(prefix).digest("hex");

		return `${prefix}.${key}`;
	},
};
