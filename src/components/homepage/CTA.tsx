import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

export const CTA = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-primary-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white space-y-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white text-sm font-bold shadow-xl">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            {t('cta.badge')}
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {t('cta.title')}
          </h2>

          <p className="text-xl md:text-2xl opacity-95 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
            <button
              onClick={() => navigate(PATHS.APP.SUBSCRIPTIONS)}
              className="group px-10 py-5 bg-white text-[#990800] rounded-2xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 font-bold text-lg"
            >
              <FaGlobe className="w-6 h-6" />
              {t('cta.sync_account')}
              <FaArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
