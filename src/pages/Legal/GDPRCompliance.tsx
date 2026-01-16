import { FaCheck } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa6';

export const GDPRCompliance = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <FaGlobe className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 m-0">
          GDPR Compliance
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed">
        Keepay is committed to protecting the privacy and personal data of all
        users, especially those in the European Union. We comply with the
        General Data Protection Regulation (GDPR) requirements.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        Your GDPR Rights
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Under GDPR, you have the following rights:
      </p>

      <div className="space-y-4">
        <div className="bg-linear-to-r from-gray-50 to-red-50 rounded-2xl p-6 border-2 border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82]" />
            Right to Access
          </h4>
          <p className="text-gray-600 leading-relaxed">
            You have the right to request copies of your personal data. We may
            charge a small fee for this service.
          </p>
        </div>

        <div className="bg-linear-to-r from-gray-50 to-red-50 rounded-2xl p-6 border-2 border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82]" />
            Right to Rectification
          </h4>
          <p className="text-gray-600 leading-relaxed">
            You have the right to request that we correct any information you
            believe is inaccurate or complete information you believe is
            incomplete.
          </p>
        </div>

        <div className="bg-linear-to-r from-gray-50 to-red-50 rounded-2xl p-6 border-2 border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82]" />
            Right to Erasure
          </h4>
          <p className="text-gray-600 leading-relaxed">
            You have the right to request that we erase your personal data,
            under certain conditions.
          </p>
        </div>

        <div className="bg-linear-to-r from-gray-50 to-red-50 rounded-2xl p-6 border-2 border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82]" />
            Right to Restrict Processing
          </h4>
          <p className="text-gray-600 leading-relaxed">
            You have the right to request that we restrict the processing of
            your personal data, under certain conditions.
          </p>
        </div>

        <div className="bg-linear-to-r from-gray-50 to-red-50 rounded-2xl p-6 border-2 border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82]" />
            Right to Data Portability
          </h4>
          <p className="text-gray-600 leading-relaxed">
            You have the right to request that we transfer the data we have
            collected to another organization, or directly to you, under certain
            conditions.
          </p>
        </div>

        <div className="bg-linear-to-r from-gray-50 to-red-50 rounded-2xl p-6 border-2 border-gray-100">
          <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82]" />
            Right to Object
          </h4>
          <p className="text-gray-600 leading-relaxed">
            You have the right to object to our processing of your personal
            data, under certain conditions.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        Data Protection Measures
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        We implement the following measures to protect your data:
      </p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Data encryption both in transit and at rest</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Regular security audits and penetration testing</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Access controls and authentication mechanisms</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Data minimization - we only collect what's necessary</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Staff training on data protection</span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        Data Processing Agreement
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We only work with third-party processors who provide sufficient
        guarantees to implement appropriate technical and organizational
        measures to ensure GDPR compliance.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        Exercising Your Rights
      </h3>
      <p className="text-gray-600 leading-relaxed">
        If you wish to exercise any of your GDPR rights, please contact us at
        privacy@keepay.com. We will respond to your request within 30 days.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        Data Protection Officer
      </h3>
      <p className="text-gray-600 leading-relaxed">
        For any questions regarding data protection, you can contact our Data
        Protection Officer at dpo@keepay.com.
      </p>
    </div>
  );
};
