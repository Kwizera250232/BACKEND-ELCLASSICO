import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  userId!: string;

  @IsDateString()
  reservationAt!: string;

  @IsInt()
  @Min(1)
  guests!: number;

  @IsOptional()
  @IsString()
  zone?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
