import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaController } from './controllers/empresa.controller';
import { EmpresaService } from '../application/services/empresa.service';
import { TransferenciaService } from '../application/services/transferencia.service';
import { EmpresaPostgresRepository } from './repositories/empresa.postgres-repository';
import { TransferenciaPostgresRepository } from './repositories/transferencia.postgres-repository';
import { EmpresaEntity } from './database/entities/empresa.entity';
import { TransferenciaEntity } from './database/entities/transferencia.entity';
import { DatabaseConfigService } from '../shared/config/database.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmpresaEntity, TransferenciaEntity]),
  ],
  controllers: [EmpresaController],
  providers: [
    DatabaseConfigService,
    EmpresaService,
    TransferenciaService,
    {
      provide: 'EmpresaRepository',
      useClass: EmpresaPostgresRepository,
    },
    {
      provide: 'TransferenciaRepository',
      useClass: TransferenciaPostgresRepository,
    },
  ],
  exports: [EmpresaService, TransferenciaService],
})
export class EmpresaModule {}

