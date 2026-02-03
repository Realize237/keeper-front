export const AVATAR_SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-lg',
  '3xl': 'w-24 h-24 text-lg',
} as const;

export type AvatarSize = keyof typeof AVATAR_SIZES;
