import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { LuCircleHelp } from 'react-icons/lu';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: { [key: string]: FAQItem[] } = {
  en: [
    {
      question: 'How does Keepay work?',
      answer:
        'Keepay connects securely to your bank account to automatically detect recurring subscriptions. You can also manually add subscriptions. We then send you timely notifications before renewals and provide spending analytics to help you manage your finances better.',
    },
    {
      question: 'Is my financial data secure?',
      answer:
        'Absolutely. We use bank-level 256-bit encryption to protect your data. We never store your bank credentials, and we partner with leading security providers to ensure your information is always safe and private.',
    },
    {
      question: 'Can I use Keepay for free?',
      answer:
        'Yes! Our Free plan allows you to track up to 5 subscriptions with basic notifications and calendar view. You can upgrade to Pro anytime for unlimited subscriptions and advanced features.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer:
        "You can cancel your Keepay Pro subscription anytime from your account settings. There are no cancellation fees, and you'll continue to have access until the end of your billing period.",
    },
    {
      question: 'Does Keepay work with all banks?',
      answer:
        "Keepay works with over 10,000 financial institutions across North America and Europe. If your bank isn't supported, you can still manually add subscriptions and enjoy all other features.",
    },
    {
      question: 'Can I track business subscriptions?',
      answer:
        'Yes! Many small business owners use Keepay Pro to track both personal and business subscriptions. The multi-card tracking feature makes it easy to separate different types of expenses.',
    },
  ],
  fr: [
    {
      question: 'Comment fonctionne Keepay?',
      answer:
        'Keepay se connecte en toute sécurité à votre compte bancaire pour détecter automatiquement les abonnements récurrents. Vous pouvez également ajouter des abonnements manuellement. Nous vous envoyons ensuite des notifications en temps opportun avant les renouvellements et fournissons des analyses de dépenses pour vous aider à mieux gérer vos finances.',
    },
    {
      question: 'Mes données financières sont-elles sécurisées?',
      answer:
        'Absolument. Nous utilisons un cryptage de niveau bancaire 256 bits pour protéger vos données. Nous ne stockons jamais vos identifiants bancaires et nous collaborons avec les principaux fournisseurs de sécurité pour garantir que vos informations sont toujours sûres et privées.',
    },
    {
      question: 'Puis-je utiliser Keepay gratuitement?',
      answer:
        "Oui! Notre plan Gratuit vous permet de suivre jusqu'à 5 abonnements avec des notifications de base et une vue calendrier. Vous pouvez passer à Pro à tout moment pour des abonnements illimités et des fonctionnalités avancées.",
    },
    {
      question: 'Comment puis-je annuler mon abonnement?',
      answer:
        "Vous pouvez annuler votre abonnement Keepay Pro à tout moment depuis les paramètres de votre compte. Il n'y a pas de frais d'annulation et vous continuerez à avoir accès jusqu'à la fin de votre période de facturation.",
    },
    {
      question: 'Keepay fonctionne-t-il avec toutes les banques?',
      answer:
        "Keepay fonctionne avec plus de 10 000 institutions financières en Amérique du Nord et en Europe. Si votre banque n'est pas prise en charge, vous pouvez toujours ajouter manuellement des abonnements et profiter de toutes les autres fonctionnalités.",
    },
    {
      question: 'Puis-je suivre les abonnements professionnels?',
      answer:
        'Oui! De nombreux propriétaires de petites entreprises utilisent Keepay Pro pour suivre à la fois les abonnements personnels et professionnels. La fonction de suivi multi-cartes facilite la séparation des différents types de dépenses.',
    },
  ],
};

export const FAQ = () => {
  const { currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = faqData[currentLanguage];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-linear-to-br from-[#990800]/5 to-[#FF6B5B]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-linear-to-br from-[#008B82]/5 to-[#006B66]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-accent/10 to-[#00A89A]/10 border border-[#008B82]/20 text-[#008B82] rounded-2xl text-sm mb-6 font-bold shadow-sm">
            <LuCircleHelp className="w-4 h-4" />
            {t('faq.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="block text-foreground">{t('faq.title_1')}</span>
            <span className="block text-gradient-primary">
              {t('faq.title_2')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            {t('faq.description')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface border-2 border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-muted transition-all group"
              >
                <span className="text-lg font-bold text-surface-foreground pr-8 group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all ${
                    openIndex === index
                      ? 'bg-primary-gradient rotate-180'
                      : 'bg-surface border border-border group-hover:bg-muted'
                  }`}
                >
                  {openIndex === index ? (
                    <FaMinus className="w-5 h-5 text-surface-foreground" />
                  ) : (
                    <FaPlus className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-muted-foreground leading-relaxed font-medium border-t border-gray-100 pt-6">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-surface border-2 border-dashed border-primary/30 rounded-3xl">
            <p className="text-surface-foreground font-bold text-lg">
              {t('faq.still_questions')}
            </p>
            <a
              href="#contact"
              className="px-8 py-3 bg-primary-gradient text-primary-foreground rounded-2xl hover:shadow-xl hover:shadow-red-900/30 transition-all transform hover:-translate-y-1 font-bold"
            >
              {t('faq.contact_us')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
