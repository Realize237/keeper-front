import { motion } from 'framer-motion';
import {
  FaAdjust,
  FaBell,
  FaCalendarAlt,
  FaChevronLeft,
  FaGlobe,
  FaMoon,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import type { IconType } from 'react-icons';
import { ReactNode } from 'react';
import { useUser } from '../hooks/useUsers';
import { useUpdateUser } from '../hooks/useUsers';
import toast from 'react-hot-toast';
import { FaSun } from 'react-icons/fa6';
import { Theme, useTheme } from '../hooks/useTheme';
import ReactCountryFlag from 'react-country-flag';
import { SettingsSelect } from '../components/settings/SettingsSelect';

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-2xl  bg-surface  shadow-sm overflow-visible">
    <div className="px-4 py-3 border-b  border-border">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground">
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
      <div className="w-9 h-9 rounded-full bg-muted-surface flex items-center justify-center">
        <Icon className="w-4 h-4 text-surface-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
    {action}
  </div>
);

export default function Settings() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useUser();
  const { mutate: updateUserLanguage, isPending: isChangingLanguage } =
    useUpdateUser();
  const { mutate: updateUserTheme, isPending: isChangingTheme } =
    useUpdateUser();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: 'system',
      label: t('settings.appearance.themes.system', 'System'),
      icon: <FaAdjust className="w-4 h-4" />,
    },
    {
      value: 'light',
      label: t('settings.appearance.themes.light', 'Light'),
      icon: <FaSun className="w-4 h-4" />,
    },
    {
      value: 'dark',
      label: t('settings.appearance.themes.dark', 'Dark'),
      icon: <FaMoon className="w-4 h-4" />,
    },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    updateUserLanguage(
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

  const handleChangeTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    if (!user?.id) return;

    updateUserTheme(
      { id: Number(user.id), user: { preferredTheme: newTheme } },
      {
        onSuccess: () => {
          toast.success(t('settings.appearance.success'));
        },
        onError: (error: Error) => {
          toast.error(
            error.message || t('settings.appearance.errors.update_failed')
          );
        },
      }
    );
  };

  return (
    <div className="px-4 py-6 ">
      <div className="flex items-center mb-6 text-foreground">
        <button
          onClick={() => navigate(-1)}
          className="p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-muted transition"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto  space-y-6 text-foreground"
      >
        <h3 className="text-xl font-bold mb-8 capitalize">
          {t('settings.title', 'Settings')}
        </h3>
        <Section title={t('settings.language.title')}>
          <Row
            icon={FaGlobe}
            label={t('settings.language.app')}
            description={t('settings.language.subtitle')}
            action={
              <SettingsSelect
                isLoading={isChangingLanguage}
                value={user?.language ?? ''}
                options={[
                  {
                    value: 'en',
                    label: 'English',
                    icon: (
                      <ReactCountryFlag
                        countryCode="US"
                        svg
                        style={{ width: '1.2em', height: '1.2em' }}
                      />
                    ),
                  },
                  {
                    value: 'fr',
                    label: 'Français',
                    icon: (
                      <ReactCountryFlag
                        countryCode="FR"
                        svg
                        style={{ width: '1.2em', height: '1.2em' }}
                      />
                    ),
                  },
                ]}
                onChange={(lang: string) => changeLanguage(lang)}
              />
            }
          />
        </Section>

        <Section title={t('settings.appearance.title')}>
          <Row
            icon={FaMoon}
            label={t('settings.appearance.theme', 'Theme')}
            description={t('settings.appearance.system')}
            action={
              <SettingsSelect
                isLoading={isChangingTheme}
                value={theme}
                options={themeOptions}
                onChange={(theme: string) => handleChangeTheme(theme as Theme)}
              />
            }
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
            action={<button className="text-sm text-primary">Connect</button>}
          />
        </Section>
      </motion.div>
    </div>
  );
}
