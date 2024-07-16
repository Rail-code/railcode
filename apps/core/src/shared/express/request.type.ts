import { type Request } from "express";

//Types
import { SessionRequestType } from "@App/auth/types/session.type";

export interface ReqSession extends Request {
	session: SessionRequestType;
}
