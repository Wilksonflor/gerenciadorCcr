import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsString()
  nomeCompleto: string;

  @ApiProperty()
  @IsString()
  contato: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class ResponseUsuarioDto {
  @ApiProperty()
  nomeCompleto: string;

  @ApiProperty()
  contato: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class UpdateUsuarioDto {
  @ApiProperty()
  @IsString()
  nomeCompleto: string;

  @ApiProperty()
  @IsString()
  contato: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class deleteUsuarioDto {
  @ApiProperty()
  id: string;
}
