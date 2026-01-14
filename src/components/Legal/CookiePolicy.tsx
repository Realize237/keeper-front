import { FaCheck } from 'react-icons/fa6';
import { LuCookie } from 'react-icons/lu';

export const CookiePolicy = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-linear-to-br from-[#990800] to-[#C41E14] rounded-2xl flex items-center justify-center">
          <LuCookie className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 m-0">
          Cookie Policy
        </h2>
      </div>

      <p className="text-gray-600 leading-relaxed">
        This Cookie Policy explains how Keepay uses cookies and similar
        technologies to recognize you when you visit our application.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        What Are Cookies?
      </h3>
      <p className="text-gray-600 leading-relaxed">
        Cookies are small data files that are placed on your computer or mobile
        device when you visit a website or use an application. Cookies are
        widely used to make applications work more efficiently and provide
        information to the owners of the application.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        How We Use Cookies
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        We use cookies for the following purposes:
      </p>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">
          Essential Cookies
        </h4>
        <p className="text-gray-600 leading-relaxed mb-3">
          These cookies are necessary for the application to function and cannot
          be switched off. They include:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
            <span>Authentication cookies to keep you logged in</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
            <span>Security cookies to protect against fraud</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
            <span>Session cookies to remember your preferences</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">
          Analytics Cookies
        </h4>
        <p className="text-gray-600 leading-relaxed mb-3">
          These cookies help us understand how visitors interact with our
          application:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
            <span>Google Analytics to measure application traffic</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
            <span>Performance cookies to identify technical issues</span>
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">
          Functional Cookies
        </h4>
        <p className="text-gray-600 leading-relaxed mb-3">
          These cookies enable enhanced functionality:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
            <span>Language preference cookies</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCheck className="w-5 h-5 text-[#008B82] shrink-0 mt-0.5" />
            <span>User interface customization cookies</span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        Managing Cookies
      </h3>
      <p className="text-gray-600 leading-relaxed">
        You can control and manage cookies through your browser settings. Please
        note that removing or blocking cookies may impact your user experience
        and some features may no longer function properly.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
        Third-Party Cookies
      </h3>
      <p className="text-gray-600 leading-relaxed">
        We may also use third-party cookies from trusted partners for analytics
        and advertising purposes. These cookies are subject to the respective
        privacy policies of these external services.
      </p>
    </div>
  );
};
