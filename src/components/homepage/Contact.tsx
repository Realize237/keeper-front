import { useState } from 'react';
import { FaRegMessage } from 'react-icons/fa6';
import { FiSend } from 'react-icons/fi';
import { LuCircleHelp } from 'react-icons/lu';
import { MdOutlineMailOutline } from 'react-icons/md';
import { env } from '../../utils/env';
import { useTranslation } from 'react-i18next';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = () => {};

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-[#990800]/5 to-[#FF6B5B]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-br from-[#008B82]/5 to-[#006B66]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary/10 to-[#FF6B5B]/10 border border-primary/20 text-[#990800] rounded-2xl text-sm mb-6 font-bold shadow-sm">
            <FaRegMessage className="w-4 h-4" />
            {t('contact.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            <span className="block text-foreground">{t('contact.title')}</span>
            <span className="block text-gradient-primary ">
              {t('contact.subtitle')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            {t('contact.description')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 align-items: stretch">
          <div className="flex flex-col gap-6">
            <div className="bg-linear-to-br from-primary/5 to-[#C41E14]/5 p-7 rounded-3xl border-2 border-primary/10 hover:border-primary/30 transition-all group">
              <div className="w-14 h-14 bg-linear-to-br from-primary to-[#C41E14] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                <MdOutlineMailOutline className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {t('contact.cards.email.title')}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 font-medium">
                {t('contact.cards.email.description')}
              </p>
              <a
                href={`mailto:${env.APP_SUPPORT_EMAIL}`}
                className="text-primary hover:text-[#C41E14] font-bold transition-colors"
              >
                {env.APP_SUPPORT_EMAIL}
              </a>
            </div>

            <div className="bg-linear-to-br from-[#008B82]/5 to-[#00A89A]/5 p-7 rounded-3xl border-2 border-[#008B82]/10 hover:border-[#008B82]/30 transition-all group">
              <div className="w-14 h-14 bg-linear-to-br from-[#008B82] to-[#006B66] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-teal-900/30 group-hover:scale-110 transition-transform">
                <FaRegMessage className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {t('contact.cards.chat.title')}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 font-medium">
                {t('contact.cards.chat.description')}
              </p>
              <button className="text-[#008B82] hover:text-[#00A89A] font-bold transition-colors">
                {t('contact.cards.chat.cta')}
              </button>
            </div>

            <div className="bg-linear-to-br from-[#FF6B5B]/5 to-[#FF8A7A]/5 p-7 rounded-3xl border-2 border-[#FF6B5B]/10 hover:border-[#FF6B5B]/30 transition-all group">
              <div className="w-14 h-14 bg-linear-to-br from-[#FF6B5B] to-[#FF8A7A] rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-orange-900/30 group-hover:scale-110 transition-transform">
                <LuCircleHelp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {t('contact.cards.help.title')}
              </h3>
              <p className="text-muted-foreground text-sm mb-3 font-medium">
                {t('contact.cards.help.description')}
              </p>
              <button className="text-[#FF6B5B] hover:text-[#FF8A7A] font-bold transition-colors">
                {t('contact.cards.help.cta')}
              </button>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="bg-background border-2 border-border p-10 rounded-3xl space-y-6 shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 text-foreground font-bold"
                  >
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 text-surface-foreground py-3.5 placeholder-muted-foreground bg-surface border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 text-foreground font-bold"
                  >
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 text-surface-foreground  placeholder-muted-foreground bg-surface border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm mb-2 text-foreground font-bold"
                >
                  {t('contact.form.subject')}
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full text-surface-foreground px-5 py-3.5 placeholder-muted-foreground bg-surface border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                  required
                >
                  <option value="">
                    {t('contact.form.placeholders.subject')}
                  </option>
                  <option value="general">
                    {t('contact.form.subjects.general')}
                  </option>
                  <option value="support">
                    {t('contact.form.subjects.support')}
                  </option>
                  <option value="billing">
                    {t('contact.form.subjects.billing')}
                  </option>
                  <option value="feature">
                    {t('contact.form.subjects.feature')}
                  </option>
                  <option value="partnership">
                    {t('contact.form.subjects.partnership')}
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm mb-2 text-foreground font-bold"
                >
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-3.5 bg-surface text-surface-foreground placeholder-muted-foreground border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all font-medium flex-1 min-h-37.5 md:min-h-67.5"
                  placeholder="Tell us how we can help..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary-gradient  text-primary-foreground rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 font-bold text-lg"
              >
                <FiSend className="w-5 h-5" />
                {t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
