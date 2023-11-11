import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

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
export class updateAgendamentoDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nomeCompleto?: string;

  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  horaInicio?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  horaTermino?: string;

  // @ApiProperty({ required: false })
  // @IsNumber()
  // @IsOptional()
  // valor?: number;

  // @ApiProperty({ required: false })
  // @IsString()
  // @IsOptional()
  // clientId?: string;
}
export class DeleteAgendamentoDto {
  @ApiProperty()
  @IsString()
  agendamentoId: string;
}
