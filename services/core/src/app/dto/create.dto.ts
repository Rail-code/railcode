import { IsInt, IsNotEmpty, IsString, IsEnum } from "class-validator";

import { OmitType } from "@nestjs/swagger";

//Custom validators
import { IsAppBundleId } from "@App/shared/validators/bundleId";

//Types
import { SystemMobileOsEnum, type SystemMobileOsType } from "@App/shared/constants/platform";

export class CreateAppDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	@IsAppBundleId()
	identifier: string;

	@IsString()
	@IsNotEmpty()
	@IsEnum(SystemMobileOsEnum)
	platform: SystemMobileOsType;

	@IsInt()
	@IsNotEmpty()
	organization_id: number;

	@IsInt()
	@IsNotEmpty()
	user_id: number;
}

export class BodyCreateAppDto extends OmitType(CreateAppDto, ["organization_id", "user_id"]) {}
