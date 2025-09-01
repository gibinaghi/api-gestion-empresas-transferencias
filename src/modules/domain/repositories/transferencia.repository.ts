import { TransferenciaDomain } from '../entities/transferencia.entity';

export interface TransferenciaRepository {
  save(transferencia: TransferenciaDomain): Promise<TransferenciaDomain>;
  findById(id: string): Promise<TransferenciaDomain | null>;
  findByEmpresaId(empresaId: string): Promise<TransferenciaDomain[]>;
  findTransferenciasUltimoMes(): Promise<TransferenciaDomain[]>;
  findAll(): Promise<TransferenciaDomain[]>;
}