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
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-slate-200 pb-8 dark:border-white/10">
          <a
            href={`mailto:${BRAND.email}`}
            className="text-sm font-medium text-ink underline-offset-4 hover:underline dark:text-slate-200"
          >
            {BRAND.email}
          </a>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink underline-offset-4 hover:underline dark:text-slate-200"
          >
            Instagram {BRAND.instagramHandle}
          </a>
        </div>

        <ContactFormFields subject={subject} />
      </div>
    </PageShell>
  );
}
