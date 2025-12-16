export type BillingStatus = 'ACTIVE' | 'DUE TODAY' | 'EXPIRED';

export interface BillingResult {
  date: Date | null;
  status: BillingStatus;
  daysRemaining: number | null;
}
