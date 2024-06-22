import { PartialType } from "@nestjs/swagger";

//Dto
import { CreateDto } from "./create.dto";

export class UpdateDto extends PartialType(CreateDto) {}
