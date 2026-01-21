import { Trans, useTranslation } from 'react-i18next';
import { FiFileText } from 'react-icons/fi';
import { useTranslatedArray } from '../../hooks/useLanguage';
import { FaCheck } from 'react-icons/fa';
import { env } from '../../utils/env';

type Block =
  | { type: 'text'; content: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'note'; content: string[] }
  | { type: 'subheading'; title: string }
  | {
      type: 'contact';
      contact: {
        email: string;
        website: string;
        intro: string;
      };
    };

type Section = {
  heading: string;
  blocks: Block[];
};

export const TermsConditions = () => {
  const { t } = useTranslation('terms');
  const sections = useTranslatedArray<Section>('sections', [], 'terms');

  const renderBlock = (block: Block, sectionIndex: number) => {
    switch (block.type) {
      case 'subheading':
        return (
          <h3
            key={`subheading-${sectionIndex}`}
            className="text-xl font-medium mt-6 mb-3"
          >
            {block.title}
          </h3>
        );

      case 'text':
        return block.content.map((p, paragraphIndex) => (
          <p key={`text-${sectionIndex}-${paragraphIndex}`} className="mb-3">
            <Trans i18nKey={p} />
          </p>
        ));

      case 'list':
        return (
          <ul key={`list-${sectionIndex}`} className="">
            {block.items.map((item, itemIndex) => (
              <li
                className="flex gap-2"
                key={`item-${sectionIndex}-${itemIndex}`}
              >
                <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
                <Trans i18nKey={item} />
              </li>
            ))}
          </ul>
        );

      case 'note':
        return block.content.map((p, paragraphIndex) => (
          <p
            key={`note-${sectionIndex}-${paragraphIndex}`}
            className="font-semibold mt-4"
          >
            <Trans i18nKey={p} />
          </p>
        ));

      case 'contact':
        return (
          <div key={`contact-${sectionIndex}`} className="space-y-1">
            <p>{block.contact.intro}</p>
            <p>
              {block.contact.email}:{' '}
              <a
                href={`mailto:${env.APP_PRIVACY_POLICY_EMAIL}`}
                className="text-blue-600 underline"
              >
                {env.APP_PRIVACY_POLICY_EMAIL}
              </a>
            </p>
            <p>
              {block.contact.website}:{' '}
              <a
                href={env.APP_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {env.APP_WEBSITE_URL}
              </a>
            </p>
          </div>
        );
    }
  };

  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <FiFileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold m-0">{t('title')}</h2>
      </div>

      <p className="mb-4">
        <Trans i18nKey={t('intro')} />
      </p>
      <p className="mb-4">{t('intro2')}</p>
      <p className="mb-10">{t('intro3')}</p>

      {sections.map((section, idx) => (
        <section key={idx} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
          {section.blocks.map(renderBlock)}
        </section>
      ))}
    </div>
  );
};
