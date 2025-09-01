import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmpresaTipo } from '../../../domain/value-objects/empresa-tipo.vo';
import { TransferenciaEntity } from './transferencia.entity';

@Entity('empresas')
export class EmpresaEntity {
  @PrimaryColumn('varchar', { length: 50 })
  id: string;

  @Column('varchar', { length: 255 })
  nombre: string;

  @Column('varchar', { length: 13, unique: true })
  cuit: string;

  @Column({
    type: 'enum',
    enum: EmpresaTipo,
    default: EmpresaTipo.PYME,
  })
  tipo: EmpresaTipo;

  @CreateDateColumn({ name: 'fecha_adhesion' })
  fechaAdhesion: Date;

  @Column('boolean', { default: true })
  activa: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TransferenciaEntity, (transferencia) => transferencia.empresa)
  transferencias: TransferenciaEntity[];
}