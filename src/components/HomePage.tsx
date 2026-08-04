import { CTASection } from './home/CTASection';
import { FeaturedWorkSection } from './home/FeaturedWorkSection';
import { HeroSection } from './home/HeroSection';
import { IndustriesSection } from './home/IndustriesSection';
import { ProcessSection } from './home/ProcessSection';
import { ReviewsSection } from './home/ReviewsSection';
import { ServicesPreview } from './home/ServicesPreview';
import { WhyChooseSection } from './home/WhyChooseSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <HeroSection onNavigate={onNavigate} />
      <ServicesPreview onNavigate={onNavigate} />
      <IndustriesSection />
      <FeaturedWorkSection onNavigate={onNavigate} />
      <ReviewsSection onNavigate={onNavigate} />
      <WhyChooseSection />
      <ProcessSection />
      <CTASection onNavigate={onNavigate} />
    </div>
  );
}
