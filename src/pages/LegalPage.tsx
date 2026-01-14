import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';
import { LuShield, LuCookie } from 'react-icons/lu';
import { FaArrowLeft } from 'react-icons/fa';
import { PrivacyPolicy } from '../components/Legal/PrivacyPolicy';
import { TermsConditions } from '../components/Legal/TermsConditions';
import { CookiePolicy } from '../components/Legal/CookiePolicy';
import { GDPRCompliance } from '../components/Legal/GDPRCompliance';

type LegalSection = 'privacy' | 'terms' | 'cookies' | 'gdpr';

export const LegalPage = () => {
  const [activeSection, setActiveSection] = useState<LegalSection>('privacy');

  const sections = [
    { id: 'privacy' as LegalSection, icon: LuShield, label: 'Privacy Policy' },
    {
      id: 'terms' as LegalSection,
      icon: FiFileText,
      label: 'Terms & Conditions',
    },
    { id: 'cookies' as LegalSection, icon: LuCookie, label: 'Cookie Policy' },
    { id: 'gdpr' as LegalSection, icon: FaGlobe, label: 'GDPR Compliance' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#990800] transition-colors font-medium mb-4"
          >
            <FaArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Legal Information
          </h1>
          <p className="text-gray-600 mt-2">Last updated: January 9, 2026</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Legal Sections
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                      activeSection === section.id
                        ? 'bg-linear-to-r from-[#990800] to-[#C41E14] text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="w-5 h-5 shrink-0" />
                    <span className="font-semibold text-sm">
                      {section.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 md:p-12">
              {activeSection === 'privacy' && <PrivacyPolicy />}
              {activeSection === 'terms' && <TermsConditions />}
              {activeSection === 'cookies' && <CookiePolicy />}
              {activeSection === 'gdpr' && <GDPRCompliance />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
