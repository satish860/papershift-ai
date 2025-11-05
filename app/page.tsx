import { Navigation } from '@/components/landing/Navigation';
import { Hero } from '@/components/landing/Hero';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section */}
        <Hero />

        {/* Placeholder sections for testing scroll behavior */}
        <section className="min-h-screen flex items-center justify-center px-4 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-6">
              Why Clean OCR Matters
            </h2>
            <p className="text-lg text-muted-foreground">
              Problem section coming next...
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
