import { useTranslation } from 'react-i18next';
import { FaCheck, FaStar } from 'react-icons/fa6';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { HiSparkles } from 'react-icons/hi2';

const plans = [
  {
    nameKey: 'pricing.free',
    price: '$0',
    periodKey: 'pricing.forever',
    descKey: 'pricing.free_desc',
    features: [
      'pricing_free_features.feature1',
      'pricing_free_features.feature2',
      'pricing_free_features.feature3',
    ],
    highlighted: false,
    buttonKey: 'pricing.get_started_free',
  },
  {
    nameKey: 'pricing.premium_basic',
    price: '$4.99',
    periodKey: 'pricing.per_month',
    descKey: 'pricing.premium_basic_desc',
    features: [
      'pricing_premium_basic_features.unlimited_subs',
      'pricing_premium_basic_features.email_notif',
      'pricing_premium_basic_features.whatsapp_notif',
      'pricing_premium_basic_features.sms_notif',
      'pricing_premium_basic_features.post_notif',
      'pricing_premium_basic_features.unlimited_shared',
      'pricing_premium_basic_features.unused_detection',
    ],
    highlighted: true,
    buttonKey: 'pricing.start_free_trial',
    badge: 'pricing.most_popular',
  },
  {
    nameKey: 'pricing.premium_plus',
    price: '$99',
    periodKey: 'pricing.one_time',
    descKey: 'pricing.premium_plus_desc',
    features: [
      'pricing_premium_plus_features.all_basic_features',
      'pricing_premium_plus_features.financial_analysis',
      'pricing_premium_plus_features.personalized_forecasts',
      'pricing_premium_plus_features.auto_cost_allocation',
      'pricing_common_features.lifetime_updates',
      'pricing_common_features.priority_support_forever',
    ],
    highlighted: false,
    buttonKey: 'pricing.buy_premium_plus',
    special: true,
  },
];

export const PricingPage = () => {
  const { t } = useTranslation();

  const isComingSoon = true;

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden selection:bg-primary/20 selection:text-primary">
      {isComingSoon ? (
        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center py-24 bg-surface/60 backdrop-blur-md rounded-3xl border border-border/60 mx-auto max-w-2xl text-center shadow-xl shadow-primary/5 relative overflow-hidden group w-full">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary via-primary/90 to-primary/80 border border-primary/20 flex items-center justify-center mb-6 shadow-lg shadow-primary/30 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <HiSparkles className="w-12 h-12 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-surface-foreground relative z-10">
              {t('pricing.coming_soon_title')}
            </h3>
            <p className="text-muted-foreground max-w-md relative z-10 leading-relaxed">
              {t('pricing.coming_soon_description')}
            </p>
          </div>
        </div>
      ) : (
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#008B82]/10 to-[#00A89A]/10 border border-[#008B82]/20 text-[#008B82] rounded-2xl text-sm mb-6 font-bold shadow-sm">
                <FaStar className="w-4 h-4 fill-current" />
                {t('pricing.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                <span className="block text-gray-900">
                  {t('pricing.title1')}
                </span>
                <span className="block bg-linear-to-r from-[#990800] via-[#C41E14] to-[#FF6B5B] bg-clip-text text-transparent">
                  {t('pricing.title2')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
                {t('pricing.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl p-8 transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-linear-to-br from-[#990800] via-[#C41E14] to-[#FF6B5B] text-white shadow-2xl shadow-red-900/30 scale-105 border-2 border-transparent'
                      : plan.special
                        ? 'bg-linear-to-br from-[#008B82] to-[#006B66] text-white shadow-xl border-2 border-transparent hover:shadow-2xl'
                        : 'bg-white border-2 border-gray-200 hover:border-[#990800]/30 hover:shadow-xl'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-linear-to-r from-[#FF6B5B] to-[#FF8A7A] text-white rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5">
                      <AiOutlineThunderbolt className="w-4 h-4" />
                      {t(plan.badge)}
                    </div>
                  )}

                  <div className="mb-8">
                    <h3
                      className={`text-2xl font-bold mb-3 ${plan.highlighted || plan.special ? 'text-white' : 'text-gray-900'}`}
                    >
                      {t(plan.nameKey)}
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className={`text-5xl font-extrabold ${plan.highlighted || plan.special ? 'text-white' : 'text-gray-900'}`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={
                          plan.highlighted || plan.special
                            ? 'text-white/80'
                            : 'text-gray-500'
                        }
                      >
                        {t(plan.periodKey)}
                      </span>
                    </div>
                    <p
                      className={`${plan.highlighted || plan.special ? 'text-white/90' : 'text-gray-600'} font-medium`}
                    >
                      {t(plan.descKey)}
                    </p>
                  </div>

                  <button
                    className={`w-full py-4 rounded-2xl mb-8 transition-all font-bold text-base ${
                      plan.highlighted
                        ? 'bg-white text-[#990800] hover:shadow-2xl hover:-translate-y-1'
                        : plan.special
                          ? 'bg-white text-[#008B82] hover:shadow-2xl hover:-translate-y-1'
                          : 'bg-linear-to-r from-[#990800] to-[#C41E14] text-white hover:shadow-xl hover:shadow-red-900/30 hover:-translate-y-1'
                    }`}
                  >
                    {t(plan.buttonKey)}
                  </button>

                  <div className="space-y-4">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.highlighted || plan.special
                              ? 'bg-white/20'
                              : 'bg-[#008B82]/10'
                          }`}
                        >
                          <FaCheck
                            className={`w-3.5 h-3.5 ${plan.highlighted || plan.special ? 'text-white' : 'text-[#008B82]'}`}
                          />
                        </div>
                        <span
                          className={`${plan.highlighted || plan.special ? 'text-white/95' : 'text-gray-700'} font-medium`}
                        >
                          {t(feature)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-linear-to-r from-gray-50 to-red-50 border-2 border-dashed border-[#990800]/30 rounded-2xl">
                <div className="w-12 h-12 bg-linear-to-br from-[#008B82] to-[#006B66] rounded-2xl flex items-center justify-center shadow-lg">
                  <FaCheck className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-gray-900 font-bold">
                    {t('pricing.guarantee')}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {t('pricing.guarantee_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
