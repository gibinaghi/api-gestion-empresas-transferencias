import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferenciaRepository } from '../../domain/repositories/transferencia.repository';
import { TransferenciaDomain } from '../../domain/entities/transferencia.entity';
import { TransferenciaEntity } from '../database/entities/transferencia.entity';

@Injectable()
export class TransferenciaPostgresRepository implements TransferenciaRepository {
  constructor(
    @InjectRepository(TransferenciaEntity)
    private readonly transferenciaRepository: Repository<TransferenciaEntity>,
  ) {}

  async save(transferencia: TransferenciaDomain): Promise<TransferenciaDomain> {
    const entity = this.toEntity(transferencia);
    const savedEntity = await this.transferenciaRepository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findById(id: string): Promise<TransferenciaDomain | null> {
    const entity = await this.transferenciaRepository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByEmpresaId(empresaId: string): Promise<TransferenciaDomain[]> {
    const entities = await this.transferenciaRepository.find({
      where: { empresaId },
      order: { fecha: 'DESC' },
    });
    return entities.map(this.toDomain);
  }

  async findTransferenciasUltimoMes(): Promise<TransferenciaDomain[]> {
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);

    const entities = await this.transferenciaRepository
      .createQueryBuilder('transferencia')
      .where('transferencia.fecha >= :fecha', { fecha: unMesAtras })
      .orderBy('transferencia.fecha', 'DESC')
      .getMany();

    return entities.map(this.toDomain);
  }

  async findAll(): Promise<TransferenciaDomain[]> {
    const entities = await this.transferenciaRepository.find({
      order: { fecha: 'DESC' },
    });
    return entities.map(this.toDomain);
  }

  private toEntity(transferencia: TransferenciaDomain): TransferenciaEntity {
    const entity = new TransferenciaEntity();
    entity.id = transferencia.id;
    entity.empresaId = transferencia.empresaId;
    entity.monto = transferencia.monto;
    entity.fecha = transferencia.fecha;
    entity.descripcion = transferencia.descripcion;
    return entity;
  }

  private toDomain = (entity: TransferenciaEntity): TransferenciaDomain => {
    return new TransferenciaDomain(
      entity.id,
      entity.empresaId,
      entity.monto,
      entity.fecha,
      entity.descripcion,
    );
  };
}