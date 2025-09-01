import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { EmpresaEntity } from './empresa.entity';

@Entity('transferencias')
@Index('idx_transferencia_empresa_fecha', ['empresaId', 'fecha'])
@Index('idx_transferencia_fecha', ['fecha'])
export class TransferenciaEntity {
  @PrimaryColumn('varchar', { length: 50 })
  id: string;

  @Column('varchar', { length: 50, name: 'empresa_id' })
  empresaId: string;

  @Column('decimal', { precision: 12, scale: 2 })
  monto: number;

  @CreateDateColumn()
  fecha: Date;

  @Column('varchar', { length: 500, nullable: true })
  descripcion?: string;

  @ManyToOne(() => EmpresaEntity, (empresa) => empresa.transferencias)
  @JoinColumn({ name: 'empresa_id' })
  empresa: EmpresaEntity;
}