import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsString()
  nomeCompleto: string;

  @ApiProperty()
  @IsString()
  contato: string;

  @ApiProperty()
  @IsString()
  observacoes: string;
}

export class ResponseClienteDto {
  @ApiProperty()
  nomeCompleto: string;

  @ApiProperty()
  contato: string;

  @ApiProperty()
  observacoes: string;
}

export class UpdateClienteDto {
  @ApiProperty({ required: false })
  @IsString()
  nomeCompleto: string;

  @ApiProperty({ required: false })
  @IsString()
  contato: string;

  @ApiProperty({ required: false })
  @IsString()
  observacoes: string;
}
