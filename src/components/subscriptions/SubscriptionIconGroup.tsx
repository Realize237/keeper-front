import { Subscription } from '../../interfaces/subscription';

interface SubscriptionIconGroupProps {
  subscriptions: Subscription[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function SubscriptionIconGroup({
  subscriptions,
  maxVisible = 3,
  size = 'md',
}: SubscriptionIconGroupProps) {
  const visibleSubscriptions = subscriptions.slice(0, maxVisible);
  const remainingCount = subscriptions.length - maxVisible;

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const offsetClasses = {
    sm: '-ml-1',
    md: '-ml-2',
    lg: '-ml-3',
  };

  return (
    <div className="flex items-center">
      {visibleSubscriptions.map((subscription, index) => (
        <div
          key={subscription.id}
          className={`${sizeClasses[size]} rounded-full border-2 border-gray-800 overflow-hidden ${
            index > 0 ? offsetClasses[size] : ''
          }`}
          style={{ zIndex: maxVisible - index }}
        >
          <img
            src={subscription.details.iconUrl}
            alt={subscription.details.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className={`${sizeClasses[size]} ${offsetClasses[size]} rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center`}
          style={{ zIndex: 0 }}
        >
          <span className="text-white font-medium">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}
