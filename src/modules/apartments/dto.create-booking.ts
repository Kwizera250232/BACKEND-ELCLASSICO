import { IsDateString, IsNumber, IsString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  userId!: string;

  @IsString()
  roomId!: string;

  @IsDateString()
  checkInDate!: string;

  @IsDateString()
  checkOutDate!: string;

  @IsNumber()
  @Min(0)
  totalAmount!: number;
}
