import { Trans, useTranslation } from 'react-i18next';
import { useTranslatedArray } from '../../hooks/useLanguage';
import { LuShield } from 'react-icons/lu';
import { env } from '../../utils/env';

export const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const introLists = useTranslatedArray('privacy.intro.list', []);
  const section1Lists1 = useTranslatedArray('privacy.section1.1.list', []);
  const section1Lists2 = useTranslatedArray('privacy.section1.2.list', []);
  const section1Lists3 = useTranslatedArray('privacy.section1.3.list', []);
  const section2List = useTranslatedArray('privacy.section2.list', []);
  const section6List = useTranslatedArray('privacy.section6.list', []);
  const section6List2 = useTranslatedArray('privacy.section6.list2', []);
  const section7List = useTranslatedArray('privacy.section7.list', []);
  const section8List = useTranslatedArray('privacy.section8.list', []);
  const section9List = useTranslatedArray('privacy.section9.list', []);

  return (
    <div className="prose prose-gray max-w-none prose-strong:font-bold prose-strong:text-gray-900">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <LuShield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 m-0">
          {t('privacy.title')}
        </h2>
      </div>

      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        <Trans
          i18nKey="privacy.intro.text1"
          components={{
            strong: (
              <strong
                className="font-semibold text-gray-900"
                style={{ fontWeight: 600 }}
              />
            ),
          }}
        />
      </p>
      <p className="text-lg leading-relaxed text-gray-700 mb-4">
        {t('privacy.intro.text2')}
      </p>

      <ul className="list-disc pl-10 mb-16 text-gray-700 space-y-2">
        {introLists.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section1.title')}
        </h2>
        <p className="text-gray-700 mb-4">{t('privacy.section1.intro')}</p>

        <h3 className="text-xl font-medium text-gray-900 mb-4">
          {t('privacy.section1.1.title')}
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          {section1Lists1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3 className="text-xl font-medium text-gray-900 mb-4">
          {t('privacy.section1.2.title')}
        </h3>
        <p className="text-gray-700 mb-4">{t('privacy.section1.2.intro')}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          {section1Lists2.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-900 " style={{ fontWeight: '600' }}>
          {t('privacy.section1.2.note1')}
        </p>
        <p className="mb-4">
          <Trans
            i18nKey="privacy.section1.2.note2"
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>

        <h3 className="text-xl font-medium text-gray-900 mb-4">
          {t('privacy.section1.3.title')}
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {section1Lists3.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section2.title')}
        </h2>
        <p className="text-gray-700 mb-4">
          <Trans
            i18nKey="privacy.section2.intro"
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {section2List.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-gray-700 " style={{ fontWeight: '600' }}>
          {t('privacy.section2.note1')}
        </p>
        <p className="text-gray-700 " style={{ fontWeight: '600' }}>
          {t('privacy.section2.note2')}
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section3.title')}
        </h2>
        <p className="text-gray-700 mb-4">{t('privacy.section3.intro')}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <Trans
              i18nKey="privacy.section3.item1"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="privacy.section3.item2"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="privacy.section3.item3"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="privacy.section3.item4"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
        </ul>
        <p className="mt-4 text-gray-700">{t('privacy.section3.note')}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section4.title')}
        </h2>
        <p className="text-gray-700 mb-4">
          <Trans
            i18nKey="privacy.section4.intro"
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          {t('privacy.section4.retention_periods')}
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <Trans
              i18nKey="privacy.section4.item1"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="privacy.section4.item2"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <Trans
                  i18nKey="privacy.section4.subitem2a"
                  components={{
                    strong: (
                      <strong
                        className="font-semibold text-gray-900"
                        style={{ fontWeight: 600 }}
                      />
                    ),
                  }}
                />
              </li>
              <li>
                <Trans
                  i18nKey="privacy.section4.subitem2b"
                  components={{
                    strong: (
                      <strong
                        className="font-semibold text-gray-900"
                        style={{ fontWeight: 600 }}
                      />
                    ),
                  }}
                />
              </li>
            </ul>
          </li>
          <li>
            <Trans
              i18nKey="privacy.section4.item3"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="privacy.section4.item4"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
        </ul>
        <p className="mt-6 text-gray-700">{t('privacy.section4.note')}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
          <li>
            <Trans
              i18nKey="privacy.section4.noteItem1"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>{t('privacy.section4.noteItem2')}</li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section5.title')}
        </h2>
        <p className="text-gray-700 mb-4">
          {t('privacy.section5.intro')}
          <Trans
            i18nKey="privacy.section5.intro"
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <Trans
              i18nKey="privacy.section5.item1"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="privacy.section5.item2"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="privacy.section5.item3"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
        </ul>
        <p className="text-gray-700 my-4">{t('privacy.section5.intro2')}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
          <li>{t('privacy.section5.item5')}</li>
          <li>
            <Trans
              i18nKey="privacy.section5.item6"
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
          </li>
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section6.title')}
        </h2>
        <p className="text-gray-700 mb-4">{t('privacy.section6.intro')}</p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {section6List.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-700 my-4">{t('privacy.section5.intro2')}</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-2">
          {section6List2.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section7.title')}
        </h2>
        <p className="text-gray-700 mb-4">{t('privacy.section7.intro')}</p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {section7List.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-gray-700">
          <Trans
            i18nKey={t('privacy.section7.note1', {
              privacy_email: env.APP_PRIVACY_POLICY_EMAIL,
            })}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>
        <p className="text-gray-700">
          <Trans
            i18nKey={t('privacy.section7.note2')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section8.title')}
        </h2>
        <p className="text-gray-700 mb-4">{t('privacy.section8.intro')}</p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {section8List.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="text-gray-700 my-4">{t('privacy.section8.intro')}</p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section9.title')}
        </h2>
        <p className="text-gray-700 mb-4">
          <Trans
            i18nKey={t('privacy.section9.intro')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {section9List.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-gray-700">
          <Trans
            i18nKey={t('privacy.section9.note')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section10.title')}
        </h2>
        <p className="text-gray-700 ">
          <Trans
            i18nKey={t('privacy.section10.intro')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>

        <p className=" text-gray-700">
          <Trans
            i18nKey={t('privacy.section10.note')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section11.title')}
        </h2>
        <p className="text-gray-700 ">
          <Trans
            i18nKey={t('privacy.section11.intro')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>

        <p className=" text-gray-700">
          <Trans
            i18nKey={t('privacy.section11.note')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {t('privacy.section12.title')}
        </h2>
        <p className="text-gray-700 ">
          <Trans
            i18nKey={t('privacy.section12.intro')}
            components={{
              strong: (
                <strong
                  className="font-semibold text-gray-900"
                  style={{ fontWeight: 600 }}
                />
              ),
            }}
          />
        </p>

        <p className=" text-gray-700">
          <span>
            <Trans
              i18nKey={t('privacy.section12.email')}
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
            :{' '}
          </span>
          <span style={{ fontWeight: 600 }}>
            {env.APP_PRIVACY_POLICY_EMAIL}
          </span>
        </p>
        <p className=" text-gray-700">
          <span>
            <Trans
              i18nKey={t('privacy.section12.website')}
              components={{
                strong: (
                  <strong
                    className="font-semibold text-gray-900"
                    style={{ fontWeight: 600 }}
                  />
                ),
              }}
            />
            :{' '}
          </span>
          <span style={{ fontWeight: 600 }}>{env.APP_WEBSITE_URL}</span>
        </p>
      </section>
    </div>
  );
};
// <section className="mb-16">
//   <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//     {t('privacy.section9.title')}
//   </h2>
//   <p className="text-gray-700 mb-4">{t('privacy.section9.intro')}</p>

//   <ul className="list-disc pl-6 space-y-2 text-gray-700">
//     {section9List.map((item, index) => (
//       <li key={index}>{item}</li>
//     ))}
//   </ul>
// </section>

// <section className="mb-16">
//   <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//     {t('privacy.section10.title')}
//   </h2>
//   <p className="text-gray-700 mb-4">{t('privacy.section10.intro')}</p>

//   <ul className="list-disc pl-6 space-y-2 text-gray-700">
//     <li>{t('privacy.section10.item1')}</li>
//     <li>{t('privacy.section10.item2')}</li>
//     <li>{t('privacy.section10.item3')}</li>
//   </ul>
// </section>

// <section className="mb-16">
//   <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//     {t('privacy.section11.title')}
//   </h2>
//   <p className="text-gray-700 mb-4">{t('privacy.section11.intro')}</p>
//   <p className="text-gray-700 ">{t('privacy.section11.text1')}</p>
//   <p className="text-gray-700 mb-4">{t('privacy.section11.text2')}</p>
//   <p className="text-gray-700 mb-4">{t('privacy.section11.note')}</p>
// </section>

// <section className="mb-16">
//   <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//     {t('privacy.section11.title')}
//   </h2>
//   <p className="text-gray-700 mb-4">{t('privacy.section11.intro')}</p>
//   <p className="text-gray-700 ">{t('privacy.section11.text1')}</p>
//   <p className="text-gray-700 mb-4">{t('privacy.section11.text2')}</p>
//   <p className="text-gray-700 mb-4">{t('privacy.section11.note')}</p>
// </section>

// <section className="mb-16">
//   <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//     {t('privacy.section12.title')}
//   </h2>
//   <p className="text-gray-700">{t('privacy.section12.intro')}</p>
//   <p className="text-gray-700 mt-4">{t('privacy.section12.note')}</p>
// </section>
