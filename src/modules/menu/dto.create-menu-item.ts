import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  categoryId!: string;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(0)
  basePrice!: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  spiceLevel?: number;

  @IsOptional()
  @IsString()
  pairingHint?: string;
}
