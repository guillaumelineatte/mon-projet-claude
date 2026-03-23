import { toast, Toaster } from 'sonner';
import { useContactForm } from '../hooks/use-contact-form';
import type { ContactFormData } from '../lib/validation';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    submitContactForm,
  } = useContactForm();

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      toast.success('Message envoyé avec succès !');
      reset();
    } catch {
      toast.error('Une erreur est survenue. Réessayez.');
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-white">
          Nous contacter
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Nom */}
          <div>
            <label
              htmlFor="nom"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Nom
            </label>
            <input
              id="nom"
              type="text"
              placeholder="Jean Dupont"
              {...register('nom')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              aria-invalid={!!errors.nom}
              aria-describedby={errors.nom ? 'nom-error' : undefined}
            />
            {errors.nom && (
              <p id="nom-error" role="alert" className="mt-1 text-sm text-red-500">
                {errors.nom.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jean@exemple.fr"
              {...register('email')}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Votre message..."
              {...register('message')}
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Spinner />
                Envoi en cours…
              </>
            ) : (
              'Envoyer le message'
            )}
          </button>
        </form>
      </div>
    </>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
