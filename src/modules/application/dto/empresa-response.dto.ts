import { ApiProperty } from '@nestjs/swagger';
import { EmpresaTipo } from '../../domain/value-objects/empresa-tipo.vo';
import { EmpresaDomain } from '../../domain/entities/empresa.entity';

export class EmpresaResponseDto {
  @ApiProperty({
    description: 'Identificador único de la empresa',
    example: 'emp_abc123_1640995200000',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'Tecnología Innovadora S.A.',
  })
  nombre: string;

  @ApiProperty({
    description: 'CUIT de la empresa',
    example: '20-12345678-9',
  })
  cuit: string;

  @ApiProperty({
    description: 'Tipo de empresa',
    enum: EmpresaTipo,
    example: EmpresaTipo.PYME,
  })
  tipo: EmpresaTipo;

  @ApiProperty({
    description: 'Fecha de adhesión',
    example: '2023-12-31T23:59:59.000Z',
  })
  fechaAdhesion: Date;

  @ApiProperty({
    description: 'Estado de la empresa',
    example: true,
  })
  activa: boolean;

  constructor(empresa: EmpresaDomain) {
    this.id = empresa.id;
    this.nombre = empresa.nombre;
    this.cuit = empresa.cuit;
    this.tipo = empresa.tipo;
    this.fechaAdhesion = empresa.fechaAdhesion;
    this.activa = empresa.activa;
  }
}