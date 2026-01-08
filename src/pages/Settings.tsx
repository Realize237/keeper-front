import { motion } from 'framer-motion';
import {
  FaBell,
  FaCalendarAlt,
  FaChevronLeft,
  FaGlobe,
  FaMoon,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SettingsSelect } from '../components/Settings/SettingsSelect';
import type { IconType } from 'react-icons';
import { ReactNode } from 'react';
import { useUser } from '../context/UserContext';
import { useUpdateUser } from '../hooks/useUsers';
import toast from 'react-hot-toast';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl  bg-white/5  shadow-sm overflow-visible">
    <div className="px-4 py-3 border-b  border-white/10">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-white/50">
        {title}
      </h4>
    </div>
    <div className="divide-y divide-white/10">{children}</div>
  </div>
);

const Row = ({
  icon: Icon,
  label,
  description,
  action,
}: {
  icon: IconType;
  label: string;
  description?: string;
  action: ReactNode;
}) => (
  <div className="flex items-center justify-between px-4 py-3">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-white/70" />
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-white/40">{description}</p>}
      </div>
    </div>
    {action}
  </div>
);

export default function Settings() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { mutate: updateLanguage, isPending: isChangingLanguage } =
    useUpdateUser();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    updateLanguage(
      { user: { language: lng }, id: Number(user?.id) },
      {
        onSuccess: () => toast.success(t('settings.language.success')),
        onError: (error: Error) => {
          toast.error(
            error.message || t('settings.language.errors.update_failed')
          );
        },
      }
    );
  };

  return (
    <div className="px-4 py-6 ">
      <div className="flex items-center mb-6 text-white">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-white/10 transition"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-bold ml-4 capitalize">
          {t('settings.title', 'Settings')}
        </h3>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto  space-y-6 text-white"
      >
        <Section title={t('settings.language.title')}>
          <Row
            icon={FaGlobe}
            label={t('settings.language.app')}
            description={t('settings.language.subtitle')}
            action={
              <SettingsSelect
                isChangingLanguage={isChangingLanguage}
                value={user?.language ?? ''}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'fr', label: 'Français' },
                ]}
                onChange={(lang) => changeLanguage(lang)}
              />
            }
          />
        </Section>

        <Section title={t('settings.appearance.title')}>
          <Row
            icon={FaMoon}
            label={t('settings.appearance.theme', 'Theme')}
            description={t('settings.appearance.system')}
            action={<span className="text-xs text-black/40">Auto</span>}
          />
        </Section>

        <Section title={t('settings.notifications.title')}>
          <Row
            icon={FaBell}
            label={t('settings.notifications.push')}
            action={<input type="checkbox" className="toggle" />}
          />
        </Section>

        <Section title={t('settings.integrations.title')}>
          <Row
            icon={FaCalendarAlt}
            label="Google Calendar"
            description={t('settings.integrations.google.description')}
            action={<button className="text-sm text-[#CDFF00]">Connect</button>}
          />
        </Section>
      </motion.div>
    </div>
  );
}
