import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateAgendamentoDto {
  @IsString()
  nomeCompleto: string;

  @IsDate()
  date: Date;

  @IsString()
  horaInicio: string;

  @IsString()
  horaTermino: string;

  @IsNumber()
  valor: number;


}
