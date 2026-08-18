import { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from './Button';

const FORMSPREE_FORM_ID = 'mojggrbk';

export const contactInputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-ink placeholder-slate-400 transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15 dark:border-white/15 dark:bg-ink/50 dark:text-white dark:placeholder-slate-500 dark:focus:border-brand-400 dark:focus:ring-brand-400/20';

interface ContactFormFieldsProps {
  subject?: string;
  message?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

export function ContactFormFields({
  subject = '',
  message = '',
  compact = false,
  onSuccess,
}: ContactFormFieldsProps) {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID);
  const [formSubject, setFormSubject] = useState(subject);
  const [formMessage, setFormMessage] = useState(message);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.succeeded && onSuccess) {
      onSuccess();
    }
  }, [state.succeeded, onSuccess]);

  const handleSendAnother = () => {
    reset();
    formRef.current?.reset();
    setFormSubject(subject);
    setFormMessage(message);
  };

  if (state.succeeded) {
    return (
      <div className="border border-slate-200 bg-surface p-8 text-center dark:border-white/10 dark:bg-white/5">
        <p className="font-medium text-ink dark:text-slate-100">
          Thank you—we received your message and will reply within 1–2 business days.
        </p>
        <Button variant="secondary" onClick={handleSendAnother} className="mt-4">
          Send another message
        </Button>
      </div>
    );
  }

  const labelClass = 'mb-2 block text-sm font-medium text-ink dark:text-white';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={compact ? 'space-y-4' : 'space-y-5'}
      noValidate
    >
      <div className={compact ? 'grid grid-cols-1 gap-4 sm:grid-cols-2' : 'grid grid-cols-1 gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            required
            className={contactInputClass}
            placeholder="Your name"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-sm text-red-600" />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            required
            className={contactInputClass}
            placeholder="you@business.com"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-sm text-red-600" />
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            Subject
          </label>
          <input
            type="text"
            id="contact-subject"
            name="subject"
            value={formSubject}
            onChange={(e) => setFormSubject(e.target.value)}
            required
            className={contactInputClass}
            placeholder="Website, automation, consultation..."
          />
          <ValidationError prefix="Subject" field="subject" errors={state.errors} className="mt-1 text-sm text-red-600" />
        </div>
      )}

      {compact && (
        <input type="hidden" name="subject" value={formSubject || 'Homepage consultation request'} />
      )}

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={compact ? 4 : formMessage.length > 160 ? 12 : 6}
          value={formMessage}
          onChange={(e) => setFormMessage(e.target.value)}
          className={`${contactInputClass} resize-none`}
          placeholder="Tell us about your business and what you'd like to improve..."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-sm text-red-600" />
      </div>

      <ValidationError
        errors={state.errors}
        className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300"
      />

      <Button type="submit" disabled={state.submitting} className="w-full sm:w-auto">
        {state.submitting ? 'Sending...' : compact ? 'Request consultation' : 'Send message'}
      </Button>
    </form>
  );
}
