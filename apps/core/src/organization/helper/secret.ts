import * as crypto from "node:crypto";

export const OrgSecretHelper = {
	create() {
		return crypto
			.createHash("sha256", {
				outputLength: 15,
			})
			.digest("hex");
	},
};
