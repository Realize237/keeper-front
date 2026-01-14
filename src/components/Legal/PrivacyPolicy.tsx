import { FaCheck } from 'react-icons/fa6';
import { LuShield } from 'react-icons/lu';

export const PrivacyPolicy = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <LuShield className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 m-0">
          Privacy Policy
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed">
        At Keepay, we take your privacy seriously. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you
        use our subscription tracking application.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        1. Information We Collect
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        We collect information that you provide directly to us, including:
      </p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Account information (name, email address, password)</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Subscription details you add to the application</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>
            Payment information (processed securely through third-party
            providers)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Communication preferences and notification settings</span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        2. How We Use Your Information
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        We use the information we collect to:
      </p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Provide, maintain, and improve our services</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Send you subscription renewal notifications</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Process your transactions and manage your account</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>
            Respond to your comments, questions, and customer service requests
          </span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Analyze usage patterns to improve our application</span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        3. Data Security
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We implement industry-standard security measures to protect your
        personal information. All data is encrypted in transit using SSL/TLS
        protocols and at rest using AES-256 encryption. We regularly conduct
        security audits and vulnerability assessments to ensure your data
        remains secure.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        4. Data Retention
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We retain your personal information for as long as your account is
        active or as needed to provide you services. You may request deletion of
        your account and associated data at any time through your account
        settings.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        5. Your Rights
      </h3>
      <p className="text-gray-600 leading-relaxed">
        You have the right to access, update, or delete your personal
        information at any time. You can also object to processing, request data
        portability, and withdraw consent where applicable.
      </p>
    </div>
  );
};
