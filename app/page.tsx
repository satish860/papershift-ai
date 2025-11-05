import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { UseCaseTabs } from '@/components/landing/UseCaseTabs';
import { IntegrationSection } from '@/components/landing/IntegrationSection';

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

        {/* Placeholder for next sections */}
        <section className="min-h-screen flex items-center justify-center px-4 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6">
              More Sections Coming...
            </h2>
            <p className="text-lg text-muted-foreground">
              Pricing, Footer, and more!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
