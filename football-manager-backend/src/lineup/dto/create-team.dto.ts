import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class MemberDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  skill: number;

  @IsString()
  @IsOptional()
  position?: string;
}

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsArray()
  members: MemberDto[];

  @IsNumber()
  numberOfTeams: number;

  @IsOptional()
  @IsArray()
  teamNames?: string[];
}
