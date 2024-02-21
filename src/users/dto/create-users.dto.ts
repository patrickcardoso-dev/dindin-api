import { IsEmail, IsString, Min,  } from "@nestjs/class-validator";

export class CreateUsersDto {
    @IsString()
    @Min(3)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
