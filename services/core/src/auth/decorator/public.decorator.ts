import { SetMetadata } from "@nestjs/common";

export const AUTH_PUBLIC = "PublicEndpoint";
export const AuthPublic = () => SetMetadata(AUTH_PUBLIC, true);
