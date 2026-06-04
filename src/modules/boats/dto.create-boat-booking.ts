import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBoatBookingDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  boatId!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  fullName!: string;

  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  phone?: string;

  @IsDateString()
  tripDate!: string;

  @IsInt()
  @Min(1)
  @Max(50)
  guests!: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @IsNumber()
  @Min(0)
  totalAmount!: number;
}
