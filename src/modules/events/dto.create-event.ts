import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;

  @IsOptional()
  @IsString()
  coverImageUrl?: string;
}
