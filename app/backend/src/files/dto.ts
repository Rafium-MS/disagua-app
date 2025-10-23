import { IsOptional, IsString } from 'class-validator';
export class PresignDto {
  @IsString() filename: string;
  @IsString() contentType: string;
  @IsOptional() @IsString() uf?: string;
  @IsOptional() @IsString() municipio?: string;
  @IsOptional() @IsString() partnerId?: string;
  @IsOptional() @IsString() storeId?: string;
  @IsOptional() @IsString() y?: string;
  @IsOptional() @IsString() m?: string;
}
