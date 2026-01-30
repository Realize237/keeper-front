import { BillingStatus } from '../interfaces/billings';

const ACCENTS = {
  default: {
    iconBg: 'bg-white/10',
    iconText: 'text-white',
    progress: 'bg-white',
  },
  orange: {
    iconBg: 'bg-orange-500/20',
    iconText: 'text-orange-400',
    progress: 'bg-orange-400',
  },
  indigo: {
    iconBg: 'bg-indigo-500/20',
    iconText: 'text-indigo-400',
    progress: 'bg-indigo-400',
  },
};
export { ACCENTS };

export const billingStatusTextClass: Record<BillingStatus, string> = {
  ACTIVE: 'text-white',
  DUE_TODAY: 'text-yellow-400',
  EXPIRED: 'text-red-400',
};
