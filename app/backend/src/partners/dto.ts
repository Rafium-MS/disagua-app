import { IsOptional, IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsString() parceiro!: string;
  @IsString() cidade!: string;
  @IsString() estado!: string;
  @IsOptional() @IsString() distribuidora?: string;
  @IsOptional() @IsString() cnpjCpf?: string;
  @IsOptional() @IsString() telefone?: string;
  @IsOptional() @IsString() email?: string;
}
