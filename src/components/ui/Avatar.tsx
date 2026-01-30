import { getAvatarInitials } from '../../utils';
import { AVATAR_SIZES, AvatarSize } from '../../constants/avatar.constants';
import { cn } from '../../utils/cn';

interface AvatarProps {
  name?: string | null;
  text?: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

export const Avatar = ({
  name,
  text,
  src,
  size = 'md',
  className,
}: AvatarProps) => {
  const initials = text ?? getAvatarInitials(name);

  return (
    <div
      role="img"
      aria-label={name ?? 'User avatar'}
      className={cn(
        'flex items-center justify-center rounded-full font-semibold select-none shrink-0',
        'bg-deep-teal text-white',
        AVATAR_SIZES[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name ?? 'Avatar'}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <span className="uppercase leading-none">{initials}</span>
      )}
    </div>
  );
};
