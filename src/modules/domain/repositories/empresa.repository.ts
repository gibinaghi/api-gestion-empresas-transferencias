import { EmpresaDomain } from '../entities/empresa.entity';

export interface EmpresaRepository {
  save(empresa: EmpresaDomain): Promise<EmpresaDomain>;
  findById(id: string): Promise<EmpresaDomain | null>;
  findByCuit(cuit: string): Promise<EmpresaDomain | null>;
  findEmpresasAdheridasUltimoMes(): Promise<EmpresaDomain[]>;
  findEmpresasConTransferenciasUltimoMes(): Promise<EmpresaDomain[]>;
  findAll(): Promise<EmpresaDomain[]>;
}