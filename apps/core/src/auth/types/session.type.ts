export type JwtUserType = {
	sub: number; //user
};

export type SessionRequestType = {
	user: JwtUserType["sub"];
};
