import { Credits } from "./credits.model";
import { Debits } from "./debits.model";

export interface PaymentCycle {
  name: string;
  month: number;
  year: number;
  credits: Credits[];
  debits: Debits[];
}
