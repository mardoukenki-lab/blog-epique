import React, { useState } from 'react';

interface ContactFormProps {
  className?: string;
  defaultSubject?: string;
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
  defaultSubject = 'question_article',
  title = 'Écrire à la Rédaction d’Epiqure',
  subtitle = 'Une question médicale, une suggestion d’article ou un témoignage à partager ? Remplissez ce formulaire ci-dessous.',
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      if (name) formData.append('name', name);
      formData.append('subject', subject);
      formData.append('message', message);

      const response = await fetch('https://formspree.io/f/xgobznna', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setName('');
        setMessage('');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          data?.errors?.[0]?.message ||
            'Une erreur est survenue lors de l’envoi. Veuillez réessayer.'
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Impossible de contacter le serveur. Vérifiez votre connexion et réessayez.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border border-[#e5eeff] p-6 md:p-8 shadow-xs ${className}`}>
      {title && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-[#006c4a] text-[12px] font-semibold uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Formulaire de contact direct</span>
          </div>
          <h3 className="font-heading font-bold text-[22px] md:text-[24px] text-[#121c28]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[14px] text-[#434654] mt-1 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {status === 'success' ? (
        <div className="p-6 rounded-2xl bg-[#82f5c1]/25 border border-[#82f5c1] flex flex-col items-center text-center gap-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-[#006c4a] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">check</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-heading font-bold text-[18px] text-[#004b33]">
              Message transmis avec succès !
            </h4>
            <p className="text-[14px] text-[#005137] max-w-md">
              Merci pour votre message. L'équipe médicale et éditoriale d'Epiqure prendra connaissance de votre demande dans les plus brefs délais.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-2 px-5 py-2 rounded-xl bg-[#006c4a] text-white text-[13px] font-semibold hover:bg-[#005137] transition-all"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form
          action="https://formspree.io/f/xgobznna"
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {status === 'error' && (
            <div className="p-3.5 rounded-xl bg-[#ffdad6] border border-[#ffb4ab] text-[#ba1a1a] text-[13px] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label
                htmlFor="form-name"
                className="block text-[13px] font-medium text-[#121c28] mb-1.5"
              >
                Votre prénom ou nom
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[18px]">
                  person
                </span>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Estelle Kouamé"
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                />
              </div>
            </div>

            {/* Email (Required) */}
            <div>
              <label
                htmlFor="form-email"
                className="block text-[13px] font-medium text-[#121c28] mb-1.5"
              >
                Votre e-mail <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] text-[18px]">
                  mail
                </span>
                <input
                  id="form-email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre-adresse@domaine.com"
                  className="w-full h-11 pl-9 pr-3 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
                />
              </div>
            </div>
          </div>

          {/* Subject / Category */}
          <div>
            <label
              htmlFor="form-subject"
              className="block text-[13px] font-medium text-[#121c28] mb-1.5"
            >
              Objet de votre message
            </label>
            <select
              id="form-subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff]"
            >
              <option value="question_article">Question sur un article du blog</option>
              <option value="suggestion_sujet">Suggestion d'un sujet médical ou de prévention</option>
              <option value="temoignage">Partage d'un témoignage ou retour d'expérience</option>
              <option value="contact_professionnel">Contact professionnel / Soignant</option>
              <option value="autre">Autre demande</option>
            </select>
          </div>

          {/* Message (Required) */}
          <div>
            <label
              htmlFor="form-message"
              className="block text-[13px] font-medium text-[#121c28] mb-1.5"
            >
              Votre message ou question <span className="text-[#ba1a1a]">*</span>
            </label>
            <textarea
              id="form-message"
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message à l'attention de la rédaction d'Epiqure..."
              className="w-full p-3 rounded-xl border border-[#c3c5d7] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#003fb1] bg-[#f8f9ff] resize-y"
            />
          </div>

          {/* Privacy Note & Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[12px] text-[#737686]">
              Vos données restent strictement confidentielles et ne sont jamais cédées.
            </span>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-11 px-6 rounded-xl bg-[#003fb1] text-white font-semibold text-[14px] hover:bg-[#1a56db] transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Envoi en cours...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Envoyer à la rédaction</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
