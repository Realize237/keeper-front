import { useTranslation } from 'react-i18next';
import { LuCookie } from 'react-icons/lu';
import { useTranslatedArray } from '../../hooks/useLanguage';
import { FaCheck } from 'react-icons/fa6';
import { env } from '../../utils/env';

type Block =
  | { type: 'text'; content: string[] }
  | { type: 'list'; items: string[] }
  | { type: 'subsection'; subheading: string; blocks: Block[] }
  | { type: 'note'; content: string; items: string[] }
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

export const CookiePolicy = () => {
  const { t } = useTranslation('cookies');
  const sections = useTranslatedArray<Section>('sections', [], 'cookies');

  const renderBlock = (block: Block, key: number) => {
    switch (block.type) {
      case 'text':
        return block.content.map((p, index) => (
          <p key={index} className="mb-2">
            {p}
          </p>
        ));
      case 'list':
        return (
          <ul key={key} className=" mb-2">
            {block.items.map((item, index) => (
              <li className="flex gap-2" key={index}>
                <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        );
      case 'subsection':
        return (
          <div key={key} className="pl-4 mb-4">
            <h3 className="text-xl font-medium mb-2">{block.subheading}</h3>
            {block.blocks.map((block, index) => renderBlock(block, index))}
          </div>
        );
      case 'note':
        return (
          <div key={key} className="mb-4 p-4  rounded-xl">
            <p className="font-semibold mb-2">{block.content}</p>
            <ul className="">
              {block.items.map((item, index) => (
                <li className="flex gap-2" key={index}>
                  <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-1">
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
      default:
        return null;
    }
  };

  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <LuCookie className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 m-0">
          {t('title')}
        </h2>
      </div>

      <p className="text-lg leading-relaxed text-gray-700 mb-6">{t('intro')}</p>

      {sections.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
          {section.blocks.map((block, index) => renderBlock(block, index))}
        </div>
      ))}
    </div>
  );
};
