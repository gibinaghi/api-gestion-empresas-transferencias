import { EmpresaEntity } from '@/modules/infrastructure/database/entities/empresa.entity';
import { TransferenciaEntity } from '@/modules/infrastructure/database/entities/transferencia.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USERNAME', 'postgres'),
      password: this.configService.get<string>('DB_PASSWORD', 'postgres'),
      database: this.configService.get<string>('DB_NAME', 'gestion_empresa'),
      entities: [EmpresaEntity, TransferenciaEntity],
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: false,
      migrationsRun: false,
    };
  }
}