import { FaCheck } from 'react-icons/fa6';
import { FiFileText } from 'react-icons/fi';

export const TermsConditions = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <FiFileText className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 m-0">
          Terms & Conditions
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed">
        These Terms and Conditions govern your use of the Keepay subscription
        tracking application. By accessing or using our service, you agree to be
        bound by these terms.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        1. Acceptance of Terms
      </h3>
      <p className="text-gray-600 leading-relaxed">
        By creating an account and using Keepay, you acknowledge that you have
        read, understood, and agree to be bound by these Terms and Conditions.
        If you do not agree, please do not use our service.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        2. User Accounts
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        When you create an account with us, you must provide accurate and
        complete information. You are responsible for:
      </p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Maintaining the security of your account credentials</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>All activities that occur under your account</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Notifying us immediately of any unauthorized use</span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        3. Subscription Plans
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Keepay offers Free, Premium Basic, and Premium Plus subscription plans.
        Premium plans are billed on a recurring basis unless you choose the
        one-time payment option. You may cancel your subscription at any time,
        and cancellation will take effect at the end of your current billing
        period.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        4. Acceptable Use
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">You agree not to:</p>
      <ul className="space-y-2 text-gray-600">
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Use the service for any illegal or unauthorized purpose</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Attempt to gain unauthorized access to our systems</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Interfere with or disrupt the service or servers</span>
        </li>
        <li className="flex items-start gap-2">
          <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
          <span>Reproduce, duplicate, or resell any part of the service</span>
        </li>
      </ul>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        5. Limitation of Liability
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Keepay is provided "as is" without warranties of any kind. We shall not
        be liable for any indirect, incidental, special, consequential, or
        punitive damages resulting from your use of the service.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        6. Refund Policy
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We offer a 14-day money-back guarantee for all premium subscriptions. If
        you're not satisfied, contact us within 14 days of your purchase for a
        full refund.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        7. Changes to Terms
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We reserve the right to modify these terms at any time. We will notify
        users of any material changes via email or through the application.
        Continued use of the service after changes constitutes acceptance of the
        new terms.
      </p>
    </div>
  );
};
