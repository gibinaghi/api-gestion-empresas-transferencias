import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from '../../application/services/empresa.service';
import { TransferenciaService } from '../../application/services/transferencia.service';
import { CrearEmpresaDto } from '../../application/dto/crear-empresa.dto';
import { EmpresaResponseDto } from '../../application/dto/empresa-response.dto';
import { CrearTransferenciaDto } from '../../application/dto/crear-transferencia.dto';
import { EmpresaDomain } from '@/modules/domain/entities/empresa.entity';
import { EmpresaTipo } from '@/modules/domain/value-objects/empresa-tipo.vo';
import { TransferenciaDomain } from '@/modules/domain/entities/transferencia.entity';

describe('EmpresaController', () => {
  let controller: EmpresaController;
  let empresaService: jest.Mocked<EmpresaService>;
  let transferenciaService: jest.Mocked<TransferenciaService>;

  // Mock data
  const mockEmpresa = new EmpresaDomain(
    'emp_abc123_1640995200000',
    'Test Company',
    '20-12345678-9',
    EmpresaTipo.PYME,
    new Date('2024-01-01'),
    true
  );

  const mockCrearEmpresaDto: CrearEmpresaDto = {
    nombre: 'Nueva Empresa',
    tipo: EmpresaTipo.CORPORATIVA,
    cuit: '20-12345678-9',
  };

  const mockCrearTransferenciaDto: Omit<CrearTransferenciaDto, 'empresaId'> = {
    monto: 1500,
    descripcion: 'Nueva transferencia',
  };

  beforeEach(async () => {
    const mockEmpresaService = {
      obtenerEmpresasConTransferenciasUltimoMes: jest.fn(),
      obtenerEmpresasAdheridasUltimoMes: jest.fn(),
      crearEmpresa: jest.fn(),
      obtenerEmpresaPorId: jest.fn(),
      obtenerTodasLasEmpresas: jest.fn(),
    };

    const mockTransferenciaService = {
      crearTransferencia: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        {
          provide: EmpresaService,
          useValue: mockEmpresaService,
        },
        {
          provide: TransferenciaService,
          useValue: mockTransferenciaService,
        },
      ],
    }).compile();

    controller = module.get<EmpresaController>(EmpresaController);
    empresaService = module.get(EmpresaService);
    transferenciaService = module.get(TransferenciaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('obtenerEmpresasConTransferenciasUltimoMes', () => {
    it('should return empresas with transfers from last month', async () => {
      const mockEmpresas = [mockEmpresa];
      empresaService.obtenerEmpresasConTransferenciasUltimoMes.mockResolvedValue(mockEmpresas);

      const result = await controller.obtenerEmpresasConTransferenciasUltimoMes();

      expect(empresaService.obtenerEmpresasConTransferenciasUltimoMes).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(EmpresaResponseDto);
      expect(result[0].id).toBe(mockEmpresa.id);
    });
  });


  describe('registrarAdhesion', () => {
    it('should create a new empresa successfully', async () => {
        // DTO de entrada
        const dto = mockCrearEmpresaDto;

        // Mock de salida que simula la entidad creada
        const createdEmpresa = mockEmpresa;

        // Mockeamos la respuesta del service
        empresaService.crearEmpresa.mockResolvedValue(createdEmpresa);

        // Ejecutamos el método del controller
        const result = await controller.registrarAdhesion(dto);

        // Verificamos que el servicio fue llamado con el dto correcto
        expect(empresaService.crearEmpresa).toHaveBeenCalledWith(dto);

        // Verificamos que el resultado sea el esperado
        expect(result).toEqual(createdEmpresa);
    });
    });


  describe('crearTransferencia', () => {
    it('should create transfer for empresa successfully', async () => {
        const expectedTransferencia = TransferenciaDomain.crear(
            mockEmpresa.id,
            mockCrearTransferenciaDto.monto,
            mockCrearTransferenciaDto.descripcion
        );

        transferenciaService.crearTransferencia.mockResolvedValue(expectedTransferencia);

        const result = await controller.crearTransferencia(mockEmpresa.id, mockCrearTransferenciaDto);

        expect(transferenciaService.crearTransferencia).toHaveBeenCalledWith({
        ...mockCrearTransferenciaDto,
        empresaId: mockEmpresa.id,
        });

        expect(result).toEqual({
        id: expectedTransferencia.id,
        empresaId: expectedTransferencia.empresaId,
        monto: expectedTransferencia.monto,
        fecha: expectedTransferencia.fecha,
        descripcion: expectedTransferencia.descripcion,
        });
    });
});
});
