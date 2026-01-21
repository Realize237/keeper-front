import { useTranslation } from 'react-i18next';
import { LuBellRing } from 'react-icons/lu';
import { IoLinkSharp } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: FaUserPlus,
    titleKey: 'how_it_works.step_1_title',
    descKey: 'how_it_works.step_1_desc',
    number: '01',
  },
  {
    icon: IoLinkSharp,
    titleKey: 'how_it_works.step_2_title',
    descKey: 'how_it_works.step_2_desc',
    number: '02',
  },
  {
    icon: LuBellRing,
    titleKey: 'how_it_works.step_3_title',
    descKey: 'how_it_works.step_3_desc',
    number: '03',
  },
];

export function HowItWorks() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-[#990800]/5 to-[#FF6B5B]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-br from-[#008B82]/5 to-[#006B66]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#008B82]/10 to-[#00A89A]/10 border border-[#008B82]/20 text-[#008B82] rounded-2xl text-sm mb-6 font-bold shadow-sm">
            <LuBellRing className="w-4 h-4" />
            {t('how_it_works.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="block text-gray-900">
              {t('how_it_works.title_1')}
            </span>
            <span className="block bg-linear-to-r from-[#990800] via-[#C41E14] to-[#FF6B5B] bg-clip-text text-transparent">
              {t('how_it_works.title_2')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('how_it_works.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-red-900/30 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-linear-to-br from-[#008B82] to-[#006B66] border-3 border-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900">
                  {t(step.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {t(step.descKey)}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-1 bg-linear-to-r from-[#990800]/30 via-[#C41E14]/20 to-transparent rounded-full"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-white border-2 border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#008B82] rounded-full animate-pulse"></div>
              <p className="text-gray-700 font-semibold">
                {t('how_it_works.ready_title')}
              </p>
            </div>
            <button
              onClick={() => navigate('/subscriptions')}
              className="px-8 py-3 bg-linear-to-r from-[#990800] to-[#C41E14] text-white rounded-2xl hover:shadow-xl hover:shadow-red-900/30 transition-all transform hover:-translate-y-1 font-bold"
            >
              {t('how_it_works.start_now')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
