import { IsString, IsEnum, IsNotEmpty, Matches, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EmpresaTipo } from '../../domain/value-objects/empresa-tipo.vo';

export class CrearEmpresaDto {
  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'Tecnología Innovadora S.A.',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  nombre: string;

  @ApiProperty({
    description: 'CUIT de la empresa en formato XX-XXXXXXXX-X',
    example: '20-12345678-9',
    pattern: '^\\d{2}-\\d{8}-\\d{1}$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{2}-\d{8}-\d{1}$/, {
    message: 'CUIT debe tener el formato XX-XXXXXXXX-X',
  })
  cuit: string;

  @ApiProperty({
    description: 'Tipo de empresa',
    enum: EmpresaTipo,
    example: EmpresaTipo.PYME,
  })
  @IsEnum(EmpresaTipo)
  tipo: EmpresaTipo;
}