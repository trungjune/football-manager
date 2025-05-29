import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "user@example.com", description: "Email address" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "John Doe", description: "Full name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "password123", description: "Password" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
