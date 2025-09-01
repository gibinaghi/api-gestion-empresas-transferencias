import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CrearTransferenciaDto {
  @ApiProperty({
    description: 'ID de la empresa que realiza la transferencia',
    example: 'emp_abc123_1640995200000',
  })
  @IsString()
  empresaId: string;

  @ApiProperty({
    description: 'Monto de la transferencia',
    example: 50000.50,
    minimum: 0.01,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Max(999999999.99)
  monto: number;

  @ApiPropertyOptional({
    description: 'Descripción opcional de la transferencia',
    example: 'Pago de servicios mensuales',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @Max(500)
  descripcion?: string;
}