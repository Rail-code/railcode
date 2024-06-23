import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Main guard for app.
 * - Based on JWT
 */
@Injectable()
export class AppAuthGuard extends AuthGuard("jwt") {}
