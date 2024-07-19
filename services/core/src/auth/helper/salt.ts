import * as argon2 from "argon2";

export const SaltHelper = {
	async validate(password: string, salt: string) {
		return argon2.verify(salt, password);
	},
	async create(password: string) {
		return argon2.hash(password);
	},
};
