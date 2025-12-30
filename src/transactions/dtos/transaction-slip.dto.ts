// transactions/dtos/transaction-slip.dto.ts
export interface TransactionSlipRow {
  chq: string | '-';
  cash: number | '-';
  partyName: string;
  partyStatus: string;
  dueFrom: Date;
  upTo: Date;
  months: number;
  apStatus: 'A' | 'P';
  amount: number;
}

export interface TransactionSlipResponse {
  header: {
    clientName: string;
    date: string;
  };
  rows: TransactionSlipRow[];
  totals: {
    cash: number;
    amount: number;
  };
  generatedAt: string;
}