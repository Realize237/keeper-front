import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import FormInput from '../components/ui/FormInput';
import FormButton from '../components/ui/FormButton';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: 'onBlur',
  });
  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh]  px-6 mt-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-white/10 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-white/80" />
        </button>
        <h3 className="text-lg font-semibold ml-4 capitalize"></h3>
      </div>
      <motion.div
        className="w-full max-w-md mx-auto space-y-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-semibold text-white">
            {t('contact_us.title')}
          </h1>
          <p className="text-sm text-white/50">{t('contact_us.description')}</p>
        </div>

        <form onSubmit={handleSubmit(() => {})} className="space-y-5">
          <FormInput<ContactFormValues>
            name="name"
            placeholder={t('contact_us.fields.name.placeholder')}
            register={register}
            error={errors.name}
            rules={{
              required: t('contact_us.fields.name.required'),
              minLength: {
                value: 2,
                message: t('contact_us.fields.name.min'),
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: t('contact_us.fields.name.pattern'),
              },
            }}
          />

          <FormInput<ContactFormValues>
            name="email"
            type="email"
            placeholder={t('contact_us.fields.email.placeholder')}
            register={register}
            error={errors.email}
            rules={{
              required: t('contact_us.fields.email.required'),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t('contact_us.fields.email.invalid'),
              },
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <textarea
              {...register('message', {
                required: t('contact_us.fields.message.required'),
                minLength: {
                  value: 10,
                  message: t('contact_us.fields.message.min'),
                },
              })}
              rows={5}
              placeholder={t('contact_us.fields.message.placeholder')}
              className={`w-full resize-none bg-[#2a2a2a] text-white placeholder-gray-500 rounded-2xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-[#CDFF00] ${
                errors.message ? 'border border-red-500' : ''
              }`}
            />

            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </motion.div>

          <FormButton type="submit" disabled={isSubmitting} className="w-full">
            {t('contact_us.actions.submit')}
          </FormButton>
        </form>

        <p className="text-center text-xs text-white/30">
          {t('contact_us.footer')}
        </p>
      </motion.div>
    </div>
  );
};

export default ContactUs;
