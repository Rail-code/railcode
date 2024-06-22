import { PartialType } from "@nestjs/swagger";

//Dto
import { CreateAuthDto } from "./create.dto";

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
