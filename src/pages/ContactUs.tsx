import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import FormInput from '../components/ui/FormInput';
import FormButton from '../components/ui/Button';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX, NAME_RULES } from '../constants/validation/patterns';

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
          className="p-2 rounded-full hover:bg-muted transition"
        >
          <FaChevronLeft className="w-5 h-5 text-foreground" />
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
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
            {t('contact_us.title')}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t('contact_us.description')}
          </p>
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
                value: NAME_RULES.REGEX,
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
                value: EMAIL_REGEX,
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
              className={`w-full resize-none bg-surface text-surface-foreground placeholder-muted-foreground rounded-2xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.message ? 'border border-danger' : ''
              }`}
            />

            {errors.message && (
              <p className="text-danger text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </motion.div>

          <FormButton type="submit" disabled={isSubmitting} className="w-full">
            {t('contact_us.actions.submit')}
          </FormButton>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          {t('contact_us.footer')}
        </p>
      </motion.div>
    </div>
  );
};

export default ContactUs;
