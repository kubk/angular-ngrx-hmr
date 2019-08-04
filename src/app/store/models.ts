export interface Transaction {
  value: number;
  type: 'withdraw' | 'deposit';
}
