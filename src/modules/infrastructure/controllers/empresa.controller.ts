import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EmpresaService } from '../../application/services/empresa.service';
import { TransferenciaService } from '../../application/services/transferencia.service';
import { CrearEmpresaDto } from '../../application/dto/crear-empresa.dto';
import { EmpresaResponseDto } from '../../application/dto/empresa-response.dto';
import { CrearTransferenciaDto } from '../../application/dto/crear-transferencia.dto';

@ApiTags('Empresas')
@Controller('empresas')
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly transferenciaService: TransferenciaService,
  ) {}

  @Get('transferencias-ultimo-mes')
  @ApiOperation({
    summary: 'Obtener empresas con transferencias en el último mes',
    description: 'Retorna todas las empresas que realizaron al menos una transferencia en los últimos 30 días',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas con transferencias del último mes',
    type: [EmpresaResponseDto],
  })
  async obtenerEmpresasConTransferenciasUltimoMes(): Promise<EmpresaResponseDto[]> {
    const empresas = await this.empresaService.obtenerEmpresasConTransferenciasUltimoMes();
    return empresas.map(empresa => new EmpresaResponseDto(empresa));
  }

  @Get('adheridas-ultimo-mes')
  @ApiOperation({
    summary: 'Obtener empresas adheridas en el último mes',
    description: 'Retorna todas las empresas que se adhirieron al sistema en los últimos 30 días',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas adheridas en el último mes',
    type: [EmpresaResponseDto],
  })
  async obtenerEmpresasAdheridasUltimoMes(): Promise<EmpresaResponseDto[]> {
    const empresas = await this.empresaService.obtenerEmpresasAdheridasUltimoMes();
    return empresas.map(empresa => new EmpresaResponseDto(empresa));
  }

  @Post('adhesion')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar adhesión de una nueva empresa',
    description: 'Permite registrar la adhesión de una nueva empresa al sistema (PYME o Corporativa)',
  })
  @ApiBody({
    type: CrearEmpresaDto,
    description: 'Datos de la empresa a registrar',
  })
  @ApiResponse({
    status: 201,
    description: 'Empresa registrada exitosamente',
    type: EmpresaResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o empresa ya existe',
  })
  async registrarAdhesion(
    @Body() crearEmpresaDto: CrearEmpresaDto,
  ): Promise<EmpresaResponseDto> {
    const empresa = await this.empresaService.crearEmpresa(crearEmpresaDto);
    return new EmpresaResponseDto(empresa);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener empresa por ID',
    description: 'Retorna los datos de una empresa específica',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único de la empresa',
    example: 'emp_abc123_1640995200000',
  })
  @ApiResponse({
    status: 200,
    description: 'Datos de la empresa',
    type: EmpresaResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async obtenerEmpresaPorId(@Param('id') id: string): Promise<EmpresaResponseDto> {
    const empresa = await this.empresaService.obtenerEmpresaPorId(id);
    return new EmpresaResponseDto(empresa);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las empresas',
    description: 'Retorna la lista de todas las empresas activas del sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las empresas',
    type: [EmpresaResponseDto],
  })
  async obtenerTodasLasEmpresas(): Promise<EmpresaResponseDto[]> {
    const empresas = await this.empresaService.obtenerTodasLasEmpresas();
    return empresas.map(empresa => new EmpresaResponseDto(empresa));
  }

  @Post(':id/transferencias')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear transferencia para una empresa',
    description: 'Permite registrar una nueva transferencia para una empresa específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la empresa que realizará la transferencia',
    example: 'emp_abc123_1640995200000',
  })
  @ApiBody({
    type: CrearTransferenciaDto,
    description: 'Datos de la transferencia',
  })
  @ApiResponse({
    status: 201,
    description: 'Transferencia creada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa no encontrada',
  })
  async crearTransferencia(
    @Param('id') empresaId: string,
    @Body() dto: Omit<CrearTransferenciaDto, 'empresaId'>,
  ) {
    const transferencia = await this.transferenciaService.crearTransferencia({
      ...dto,
      empresaId,
    });
    return {
      id: transferencia.id,
      empresaId: transferencia.empresaId,
      monto: transferencia.monto,
      fecha: transferencia.fecha,
      descripcion: transferencia.descripcion,
    };
  }
}