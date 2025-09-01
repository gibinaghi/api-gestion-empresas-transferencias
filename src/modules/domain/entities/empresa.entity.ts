import { EmpresaTipo } from '../value-objects/empresa-tipo.vo';

export class EmpresaDomain {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly cuit: string,
    public readonly tipo: EmpresaTipo,
    public readonly fechaAdhesion: Date,
    public readonly activa: boolean = true,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.nombre || this.nombre.trim().length === 0) {
      throw new Error('El nombre de la empresa es requerido');
    }

    if (!this.cuit || !this.isValidCuit(this.cuit)) {
      throw new Error('CUIT inválido. Formato esperado: XX-XXXXXXXX-X');
    }
  }

  private isValidCuit(cuit: string): boolean {
    const cuitRegex = /^\d{2}-\d{8}-\d{1}$/;
    return cuitRegex.test(cuit);
  }

  static crearPyme(nombre: string, cuit: string): EmpresaDomain {
    return new EmpresaDomain(
      this.generateId(),
      nombre,
      cuit,
      EmpresaTipo.PYME,
      new Date(),
      true,
    );
  }

  static crearCorporativa(nombre: string, cuit: string): EmpresaDomain {
    return new EmpresaDomain(
      this.generateId(),
      nombre,
      cuit,
      EmpresaTipo.CORPORATIVA,
      new Date(),
      true,
    );
  }

  private static generateId(): string {
    return `emp_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  }

  seAdhirioEnUltimoMes(): boolean {
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    return this.fechaAdhesion >= unMesAtras;
  }

  desactivar(): EmpresaDomain {
    return new EmpresaDomain(
      this.id,
      this.nombre,
      this.cuit,
      this.tipo,
      this.fechaAdhesion,
      false,
    );
  }
}