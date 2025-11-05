import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { UseCaseTabs } from '@/components/landing/UseCaseTabs';
import { IntegrationSection } from '@/components/landing/IntegrationSection';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Problem Section */}
        <ProblemSection />

        {/* Use Case Tabs */}
        <UseCaseTabs />

        {/* Integration Section */}
        <IntegrationSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
