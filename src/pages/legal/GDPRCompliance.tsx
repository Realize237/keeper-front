import { useTranslation, Trans } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa6';
import { useTranslatedArray } from '../../hooks/useLanguage';
import { FaCheck } from 'react-icons/fa';
import { env } from '../../utils/env';

type Block =
  | { type: 'text'; content: string[] }
  | { type: 'list'; items: string[] }
  | {
      type: 'contact';
      contact: { controller?: string; email: string; website: string };
    };

type Section = {
  heading: string;
  blocks: Block[];
};

export const GDPRCompliance = () => {
  const { t } = useTranslation('gdpr');
  const sections = useTranslatedArray<Section>('sections', [], 'gdpr');

  const renderBlock = (block: Block, key: number) => {
    switch (block.type) {
      case 'text':
        return block.content.map((p, i) => (
          <p key={i} className="mb-2">
            <Trans i18nKey={p} />
          </p>
        ));
      case 'list':
        return (
          <ul key={key} className=" mb-2">
            {block.items.map((item, i) => (
              <li className="flex gap-2" key={i}>
                <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
                <Trans i18nKey={item} />
              </li>
            ))}
          </ul>
        );
      case 'contact':
        return (
          <div key={key} className="space-y-1">
            <p>{block.contact.controller}</p>
            {block.contact.email && (
              <p>
                {block.contact.email}{' '}
                <a
                  href={`mailto:${env.APP_PRIVACY_POLICY_EMAIL}`}
                  className="text-blue-600 underline"
                >
                  {env.APP_PRIVACY_POLICY_EMAIL}
                </a>
              </p>
            )}
            {block.contact.website && (
              <p>
                {block.contact.website}{' '}
                <a
                  href={env.APP_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {env.APP_WEBSITE_URL}
                </a>
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <FaGlobe className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 m-0">
          {t('title')}
        </h2>
      </div>

      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        <Trans i18nKey={t('intro')} />
      </p>

      {sections.map((section, idx) => (
        <section key={idx} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
          {section.blocks.map((block, i) => renderBlock(block, i))}
        </section>
      ))}
    </div>
  );
};
