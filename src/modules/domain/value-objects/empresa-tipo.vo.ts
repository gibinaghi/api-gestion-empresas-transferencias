export enum EmpresaTipo {
  PYME = 'PYME',
  CORPORATIVA = 'CORPORATIVA',
}

export class EmpresaTipoVO {
  constructor(private readonly value: EmpresaTipo) {
    this.validate();
  }

  private validate(): void {
    if (!Object.values(EmpresaTipo).includes(this.value)) {
      throw new Error('Tipo de empresa inválido');
    }
  }

  getValue(): EmpresaTipo {
    return this.value;
  }

  equals(other: EmpresaTipoVO): boolean {
    return this.value === other.getValue();
  }

  static fromString(value: string): EmpresaTipoVO {
    return new EmpresaTipoVO(value as EmpresaTipo);
  }

  toString(): string {
    return this.value;
  }
}
