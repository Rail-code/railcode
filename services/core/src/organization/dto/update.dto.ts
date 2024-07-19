import { PartialType } from "@nestjs/swagger";

//Dto
import { BodyCreateOrgDto, CreateOrgDto } from "./create.dto";

/**
 * Update body
 */
export class BodyUpdateOrgDto extends PartialType(BodyCreateOrgDto) {}

/**
 * Update model
 */
export class UpdateOrgDto extends PartialType(CreateOrgDto) {}
