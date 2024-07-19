import { PartialType } from "@nestjs/swagger";

//Dto
import { CreateUserDto } from "./create.dto";

export class UpdateDto extends PartialType(CreateUserDto) {}
