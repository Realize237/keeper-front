import { useTranslation } from 'react-i18next';
import { ACCENTS } from '../../constants/subscription.constants';
import { cn } from '../../utils/cn';
import { Card } from '../ui/Card';

interface BaseProps {
  icon: React.ReactNode;
  title: string;
  badge?: string | number;
  accent?: 'default' | 'orange' | 'indigo';
}

interface StatVariant extends BaseProps {
  variant: 'stat';
  value: string | number;
}

interface ProgressVariant extends BaseProps {
  variant: 'progress';
  progress: number;
  value?: string | number;
}

interface StatusVariant extends BaseProps {
  variant: 'status';
  secondaryText: string;
  customContent?: React.ReactNode;
}

export type SubscriptionStatCardProps =
  | StatVariant
  | ProgressVariant
  | StatusVariant;

const SubscriptionStatCard = (props: SubscriptionStatCardProps) => {
  const { icon, title, badge, accent = 'default' } = props;
  const colors = ACCENTS[accent];
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col justify-between overflow-hidden p-4 sm:p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
        <div
          className={cn(
            'w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-200',
            colors.iconBg
          )}
        >
          <span className={cn(colors.iconText, 'text-lg sm:text-xl')}>
            {icon}
          </span>
        </div>

        {badge ? (
          <span className="text-xs sm:text-sm font-medium bg-white/10 px-3 py-1 rounded-full text-white/70 self-start sm:self-auto">
            {badge}
          </span>
        ) : props.variant === 'progress' ? (
          <div className="flex flex-col text-right">
            {props.value && (
              <p className="text-lg sm:text-xl font-semibold text-white">
                {props.value}
              </p>
            )}
            <p className="text-sm sm:text-base text-white/50">{title}</p>
          </div>
        ) : props.variant === 'status' ? (
          <p className="text-sm sm:text-base text-white/50 text-right">
            {title}
          </p>
        ) : null}
      </div>

      <div className="mt-4 sm:mt-6 relative">
        {props.variant === 'stat' && (
          <div>
            <p className="text-sm sm:text-base text-white/50">{title}</p>
            <p className="text-2xl sm:text-4xl font-semibold text-white mt-1">
              {props.value}
            </p>
          </div>
        )}

        {props.variant === 'progress' && (
          <div className="mt-3 sm:mt-4">
            <div className="flex justify-between text-xs sm:text-sm text-white/50 mb-1">
              <span className="capitalize">{t('subscriptions.progress')}</span>
              <span>{props.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-300',
                  colors.progress
                )}
                style={{ width: `${props.progress}%` }}
              />
            </div>
          </div>
        )}

        {props.variant === 'status' && (
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-sm sm:text-base text-white/50">
              {props.secondaryText}
            </p>
            {props.customContent && (
              <div className="mt-2 sm:mt-3 flex justify-center">
                {props.customContent}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionStatCard;
