import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmpresaRepository } from '../../domain/repositories/empresa.repository';
import { EmpresaDomain } from '../../domain/entities/empresa.entity';
import { EmpresaEntity } from '../database/entities/empresa.entity';

@Injectable()
export class EmpresaPostgresRepository implements EmpresaRepository {
  constructor(
    @InjectRepository(EmpresaEntity)
    private readonly empresaRepository: Repository<EmpresaEntity>,
  ) {}

  async save(empresa: EmpresaDomain): Promise<EmpresaDomain> {
    const empresaEntity = this.toEntity(empresa);
    const savedEntity = await this.empresaRepository.save(empresaEntity);
    return this.toDomain(savedEntity);
  }

  async findById(id: string): Promise<EmpresaDomain | null> {
    const empresaEntity = await this.empresaRepository.findOne({ where: { id } });
    return empresaEntity ? this.toDomain(empresaEntity) : null;
  }

  async findByCuit(cuit: string): Promise<EmpresaDomain | null> {
    const empresaEntity = await this.empresaRepository.findOne({ where: { cuit } });
    return empresaEntity ? this.toDomain(empresaEntity) : null;
  }

  async findEmpresasAdheridasUltimoMes(): Promise<EmpresaDomain[]> {
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);

    const empresas = await this.empresaRepository
      .createQueryBuilder('empresa')
      .where('empresa.fechaAdhesion >= :fecha', { fecha: unMesAtras })
      .andWhere('empresa.activa = :activa', { activa: true })
      .orderBy('empresa.fechaAdhesion', 'DESC')
      .getMany();

    return empresas.map(this.toDomain);
  }

  async findEmpresasConTransferenciasUltimoMes(): Promise<EmpresaDomain[]> {
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);

    const empresas = await this.empresaRepository
      .createQueryBuilder('empresa')
      .innerJoin('empresa.transferencias', 'transferencia')
      .where('transferencia.fecha >= :fecha', { fecha: unMesAtras })
      .andWhere('empresa.activa = :activa', { activa: true })
      .distinct(true)
      .orderBy('empresa.nombre', 'ASC')
      .getMany();

    return empresas.map(this.toDomain);
  }

  async findAll(): Promise<EmpresaDomain[]> {
    const empresas = await this.empresaRepository.find({
      where: { activa: true },
      order: { fechaAdhesion: 'DESC' },
    });
    return empresas.map(this.toDomain);
  }

  private toEntity(empresa: EmpresaDomain): EmpresaEntity {
    const entity = new EmpresaEntity();
    entity.id = empresa.id;
    entity.nombre = empresa.nombre;
    entity.cuit = empresa.cuit;
    entity.tipo = empresa.tipo;
    entity.fechaAdhesion = empresa.fechaAdhesion;
    entity.activa = empresa.activa;
    return entity;
  }

  private toDomain = (entity: EmpresaEntity): EmpresaDomain => {
    return new EmpresaDomain(
      entity.id,
      entity.nombre,
      entity.cuit,
      entity.tipo,
      entity.fechaAdhesion,
      entity.activa,
    );
  };
}
