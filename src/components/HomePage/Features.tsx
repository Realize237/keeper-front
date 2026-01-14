import { useTranslation } from 'react-i18next';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { ImageWithFallback } from './ImageWithFallback';
import {
  FaArrowRight,
  FaBell,
  FaCalendar,
  FaCreditCard,
  FaLock,
} from 'react-icons/fa';
import { IoPieChartOutline, IoThunderstormSharp } from 'react-icons/io5';

const features = [
  {
    icon: FaBell,
    titleKey: 'features.smart_notifications',
    descKey: 'features.smart_notifications_desc',
    gradient: 'from-[#990800] to-[#C41E14]',
    image:
      'https://images.unsplash.com/photo-1610270197941-925ce9015c40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMG5vdGlmaWNhdGlvbiUyMGFsZXJ0fGVufDF8fHx8MTc2NjM1ODM4NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: FaCalendar,
    titleKey: 'features.calendar_view',
    descKey: 'features.calendar_view_desc',
    gradient: 'from-[#008B82] to-[#006B66]',
    image:
      'https://images.unsplash.com/photo-1588453251771-cd919b362ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHBsYW5uZXIlMjBzY2hlZHVsZXxlbnwxfHx8fDE3NjYzNDA1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: FaCreditCard,
    titleKey: 'features.card_tracking',
    descKey: 'features.card_tracking_desc',
    gradient: 'from-[#FF6B5B] to-[#FF8A7A]',
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVkaXQlMjBjYXJkJTIwcGF5bWVudHxlbnwxfHx8fDE3NjYzNTQwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: IoPieChartOutline,
    titleKey: 'features.spending_analytics',
    descKey: 'features.spending_analytics_desc',
    gradient: 'from-[#C41E14] to-[#990800]',
    image:
      'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBjaGFydHxlbnwxfHx8fDE3NjYzMzE4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: IoThunderstormSharp,
    titleKey: 'features.quick_setup',
    descKey: 'features.quick_setup_desc',
    gradient: 'from-[#008B82] to-[#00A89A]',
    image:
      'https://images.unsplash.com/photo-1758876202107-4f1254259280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWljayUyMG1vYmlsZSUyMGFwcHxlbnwxfHx8fDE3NjY0MDA5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: FaLock,
    titleKey: 'features.secure_private',
    descKey: 'features.secure_private_desc',
    gradient: 'from-[#6B0500] to-[#990800]',
    image:
      'https://images.unsplash.com/photo-1760597307381-2bec368dcf26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBsb2NrJTIwcHJpdmFjeXxlbnwxfHx8fDE3NjY0MDA5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export const Features = () => {
  const { t } = useTranslation();

  return (
    <section
      id="features"
      className="py-24 bg-linear-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#990800]/10 to-[#FF6B5B]/10 border border-[#990800]/20 text-[#990800] rounded-2xl text-sm mb-6 font-bold shadow-sm">
            <AiOutlineThunderbolt className="w-4 h-4" />
            {t('features.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="block text-gray-900">{t('features.title_1')}</span>
            <span className="block bg-linear-to-r from-[#990800] via-[#C41E14] to-[#FF6B5B] bg-clip-text text-transparent">
              {t('features.title_2')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('features.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-gray-900/10 transition-all duration-300 border-2 border-gray-100 hover:border-[#990800]/20 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={feature.image}
                  alt={t(feature.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}
                ></div>

                <div className="absolute top-4 left-4">
                  <div
                    className={`w-14 h-14 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-[#990800] transition-colors">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {t(feature.descKey)}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[#990800] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm">{t('features.learn_more')}</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-gray-50 to-red-50 border-2 border-dashed border-[#990800]/30 rounded-2xl">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#FF6B5B] to-[#C41E14] border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#990800] to-[#6B0500] border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#008B82] to-[#006B66] border-2 border-white"></div>
            </div>
            <p className="text-gray-700 font-semibold">
              {t('features.join_users')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
