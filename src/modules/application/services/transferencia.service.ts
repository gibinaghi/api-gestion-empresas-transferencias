import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TransferenciaRepository } from '../../domain/repositories/transferencia.repository';
import { EmpresaRepository } from '../../domain/repositories/empresa.repository';
import { TransferenciaDomain } from '../../domain/entities/transferencia.entity';
import { CrearTransferenciaDto } from '../dto/crear-transferencia.dto';

@Injectable()
export class TransferenciaService {
  constructor(
    @Inject('EmpresaRepository') private readonly empresaRepository: EmpresaRepository,
    @Inject('TransferenciaRepository') private readonly transferenciaRepository: TransferenciaRepository
  ) {}

  async crearTransferencia(dto: CrearTransferenciaDto): Promise<TransferenciaDomain> {
    // Verificar que la empresa existe
    const empresa = await this.empresaRepository.findById(dto.empresaId);
    if (!empresa) {
      throw new NotFoundException(`Empresa con ID ${dto.empresaId} no encontrada`);
    }

    const transferencia = TransferenciaDomain.crear(
      dto.empresaId,
      dto.monto,
      dto.descripcion,
    );

    return await this.transferenciaRepository.save(transferencia);
  }

  async obtenerTransferenciasPorEmpresa(empresaId: string): Promise<TransferenciaDomain[]> {
    return await this.transferenciaRepository.findByEmpresaId(empresaId);
  }

  async obtenerTransferenciasUltimoMes(): Promise<TransferenciaDomain[]> {
    return await this.transferenciaRepository.findTransferenciasUltimoMes();
  }
}