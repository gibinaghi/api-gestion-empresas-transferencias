import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { EmpresaRepository } from '../../domain/repositories/empresa.repository';
import { EmpresaDomain } from '../../domain/entities/empresa.entity';
import { CrearEmpresaDto } from '../dto/crear-empresa.dto';
import { EmpresaTipo } from '../../domain/value-objects/empresa-tipo.vo';

@Injectable()
export class EmpresaService {
  constructor(
    @Inject('EmpresaRepository') private readonly empresaRepository: EmpresaRepository
  ) {}

  async crearEmpresa(dto: CrearEmpresaDto): Promise<EmpresaDomain> {
    // Verificar que no existe una empresa con el mismo CUIT
    const empresaExistente = await this.empresaRepository.findByCuit(dto.cuit);
    if (empresaExistente) {
      throw new BadRequestException('Ya existe una empresa con este CUIT');
    }

    let empresa: EmpresaDomain;

    if (dto.tipo === EmpresaTipo.PYME) {
      empresa = EmpresaDomain.crearPyme(dto.nombre, dto.cuit);
    } else {
      empresa = EmpresaDomain.crearCorporativa(dto.nombre, dto.cuit);
    }

    return await this.empresaRepository.save(empresa);
  }

  async obtenerEmpresasAdheridasUltimoMes(): Promise<EmpresaDomain[]> {
    return await this.empresaRepository.findEmpresasAdheridasUltimoMes();
  }

  async obtenerEmpresasConTransferenciasUltimoMes(): Promise<EmpresaDomain[]> {
    return await this.empresaRepository.findEmpresasConTransferenciasUltimoMes();
  }

  async obtenerEmpresaPorId(id: string): Promise<EmpresaDomain> {
    const empresa = await this.empresaRepository.findById(id);
    if (!empresa) {
      throw new NotFoundException(`Empresa con ID ${id} no encontrada`);
    }
    return empresa;
  }

  async obtenerTodasLasEmpresas(): Promise<EmpresaDomain[]> {
    return await this.empresaRepository.findAll();
  }
}
