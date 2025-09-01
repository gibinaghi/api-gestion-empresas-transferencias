export class TransferenciaDomain {
  constructor(
    public readonly id: string,
    public readonly empresaId: string,
    public readonly monto: number,
    public readonly fecha: Date,
    public readonly descripcion?: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.empresaId || this.empresaId.trim().length === 0) {
      throw new Error('ID de empresa es requerido');
    }

    if (!this.monto || this.monto <= 0) {
      throw new Error('El monto debe ser mayor a cero');
    }

    if (this.descripcion && this.descripcion.length > 500) {
      throw new Error('La descripción no puede exceder 500 caracteres');
    }
  }

  static crear(empresaId: string, monto: number, descripcion?: string): TransferenciaDomain {
    return new TransferenciaDomain(
      this.generateId(),
      empresaId,
      monto,
      new Date(),
      descripcion,
    );
  }

  private static generateId(): string {
    return `trans_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
  }

  fueRealizadaEnUltimoMes(): boolean {
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);
    return this.fecha >= unMesAtras;
  }
}