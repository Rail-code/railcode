import * as crypto from "node:crypto";

export const OrgSecretHelper = {
	create() {
		return crypto
			.createHash("sha256")
			.update(crypto.randomBytes(32)) // Ensure the input data for the hash
			.digest("hex")
			.slice(0, 30); // Truncate the result to 30 characters
	},
};
