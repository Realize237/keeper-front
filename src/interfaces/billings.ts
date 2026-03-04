export type BillingStatus = 'ACTIVE' | 'DUE_TODAY' | 'EXPIRED';

export interface BillingResult {
  date: Date | null;
  status: BillingStatus;
  daysRemaining: number | null;
  formattedTimeRemaining?: string; // e.g., "2 months 5 days", "15 days", "10 months"
}
