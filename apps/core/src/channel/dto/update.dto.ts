import { PartialType, PickType } from "@nestjs/swagger";

//Dtos
import { CreateAppChannelDto, BodyCreateAppChannelDto } from "./create.dto";

export class UpdateAppChannelDto extends PartialType(CreateAppChannelDto) {}

export class BodyUpdateAppChannelDto extends PartialType(BodyCreateAppChannelDto) {}
