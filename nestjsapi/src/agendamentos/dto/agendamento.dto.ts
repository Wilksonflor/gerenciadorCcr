import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateAgendamentoDto {
  @ApiProperty()
  @IsString()
  nomeCompleto: string;
  @ApiProperty()
  @IsDate()
  date: Date;
  @ApiProperty()
  @IsString()
  horaInicio: string;
  @ApiProperty()
  @IsString()
  horaTermino: string;
  @ApiProperty()
  @IsNumber()
  valor: number;
  @ApiProperty()
  @IsString()
  clientId: string;
}

export class ResponseHorariosDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  horaInicio: string;
  @ApiProperty()
  horaTermino: string;
  @ApiProperty()
  valor: number;
  @ApiProperty()
  client: string;
  @ApiProperty()
  __v: number;
}
