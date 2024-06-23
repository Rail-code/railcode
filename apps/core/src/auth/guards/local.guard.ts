import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Used to process sign in by passport
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
