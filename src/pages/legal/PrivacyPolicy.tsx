import { Trans, useTranslation } from 'react-i18next';
import { useTranslatedArray } from '../../hooks/useLanguage';
import { LuShield } from 'react-icons/lu';
import { env } from '../../utils/env';
import { FaCheck } from 'react-icons/fa6';

export const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy');

  const intro = useTranslatedArray<Block>('intro', [], 'privacy');
  const sections = useTranslatedArray<Section>('sections', [], 'privacy');
  return (
    <div className="prose prose-gray max-w-none prose-strong:font-bold">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <LuShield className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 m-0">
          {t('title')}
        </h1>
      </div>

      {intro.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}

      {sections.map((section, index) => (
        <section key={index} className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {section.heading}
          </h2>

          {section.blocks.map((block: Block, blockIndex: number) => (
            <BlockRenderer key={blockIndex} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
};

type ListItem = string | { text: string; items?: ListItem[] };

type Block =
  | { type: 'text'; content: string[] }
  | { type: 'list'; items: ListItem[] }
  | { type: 'note'; content: string[] }
  | { type: 'subheading'; title: string }
  | {
      type: 'contact';
      contact: { email?: string; website?: string; text: string };
    };

type Section = {
  heading: string;
  blocks: Block[];
};

export const BlockRenderer = ({ block }: { block: Block }) => {
  switch (block.type) {
    case 'subheading':
      return (
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
          {block.title}
        </h3>
      );

    case 'text':
      return (
        <>
          {block.content.map((text, index) => (
            <p key={index} className="mb-2 text-gray-700">
              <Trans
                components={{
                  strong: <strong className="font-semibold text-gray-900" />,
                }}
                values={{
                  privacy_email: env.APP_PRIVACY_POLICY_EMAIL,
                  website_url: env.APP_WEBSITE_URL,
                  date: new Date().toLocaleDateString(),
                }}
              >
                {text}
              </Trans>
            </p>
          ))}
        </>
      );

    case 'list': {
      const renderList = (items: ListItem[]) => (
        <ul className="mb-2 space-y-1">
          {items.map((item, i) => {
            if (typeof item === 'string') {
              return (
                <li key={i} className="flex gap-2 text-gray-700">
                  <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
                  <Trans>{item}</Trans>
                </li>
              );
            }

            if (item.items) {
              return (
                <li key={i} className="space-y-1">
                  <div className="flex gap-2 text-gray-700">
                    <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
                    <Trans>{item.text}</Trans>
                  </div>
                  <div className="pl-6">{renderList(item.items)}</div>
                </li>
              );
            }

            return null;
          })}
        </ul>
      );

      return renderList(block.items);
    }

    case 'note':
      return (
        <>
          {block.content.map((text, index) => (
            <p key={index} className="mb-2 text-gray-700">
              <Trans
                components={{
                  strong: <strong className="font-semibold text-gray-900" />,
                }}
                values={{
                  privacy_email: env.APP_PRIVACY_POLICY_EMAIL,
                  website_url: env.APP_WEBSITE_URL,
                  date: new Date().toLocaleDateString(),
                }}
              >
                {text}
              </Trans>
            </p>
          ))}
        </>
      );

    case 'contact':
      return (
        <div className="space-y-1 text-gray-700">
          {block.contact.text && <p>{block.contact.text}</p>}
          {block.contact.email && (
            <p>
              {block.contact.email}:{' '}
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
          )}
        </div>
      );

    default:
      return null;
  }
};
