import { PartialType, PickType } from "@nestjs/swagger";

//Dtos
import { CreateAppDto, BodyCreateAppDto } from "@App/app/dto/create.dto";

export class UpdateAppDto extends PartialType(CreateAppDto) {}

export class BodyUpdateAppDto extends PartialType(PickType(BodyCreateAppDto, ["name"])) {}
