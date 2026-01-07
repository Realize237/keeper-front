export type BillingStatus = 'ACTIVE' | 'DUE_TODAY' | 'EXPIRED';

export interface BillingResult {
  date: Date | null;
  status: BillingStatus;
  daysRemaining: number | null;
}
