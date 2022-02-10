export interface Debits {
  name: string;
  value: string;
  status: Status;
}

export enum Status {
  PAGO,
  AGENDADO,
  PENDENTE,
}
