import { IsOptional, IsString } from 'class-validator';
export class CreateStoreDto {
  @IsString() brandId: string;
  @IsString() name: string;
  @IsString() municipio: string;
  @IsString() uf: string;
  @IsOptional() @IsString() localEntrega?: string;
  @IsOptional() @IsString() endereco?: string;
  @IsOptional() valor20l?: any;
  @IsOptional() valor10l?: any;
  @IsOptional() valor1500ml?: any;
  @IsOptional() valorCxCopo?: any;
  @IsOptional() valorVasilhame?: any;
}
