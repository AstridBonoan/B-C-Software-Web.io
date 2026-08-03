import { BRAND } from '../data/site';
import { ContactFormFields } from './ui/ContactFormFields';
import { PageShell } from './ui/PageShell';

interface ContactFormProps {
  subject?: string;
}

export function ContactForm({ subject = '' }: ContactFormProps) {
  return (
    <PageShell
      eyebrow="Contact"
      title="Start your project with confidence"
      description="Tell me about your business and what you want to improve. I respond with clear, honest next steps."
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${BRAND.email}`}
            className="inline-flex rounded-xl border border-slate-200/90 px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            {BRAND.email}
          </a>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-xl border border-slate-200/90 px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Instagram
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/70 sm:p-8">
          <ContactFormFields subject={subject} />
        </div>
      </div>
    </PageShell>
  );
}
