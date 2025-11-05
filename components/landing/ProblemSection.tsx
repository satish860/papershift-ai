'use client';

import { motion } from 'framer-motion';
import { Search, Bot, Globe, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  before: string;
  after: string;
  stat: string;
  accentColor: string;
  delay: number;
}

function ProblemCard({
  icon,
  title,
  description,
  before,
  after,
  stat,
  accentColor,
  delay,
}: ProblemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${accentColor} rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300`}
      />

      {/* Card */}
      <div className="relative bg-card border border-border rounded-lg p-6 h-full flex flex-col hover:border-${accentColor.split(' ')[1]}/50 transition-colors">
        {/* Icon */}
        <div className="mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${accentColor} p-3 flex items-center justify-center`}>
            {icon}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>

        {/* Before/After Comparison */}
        <div className="flex-1 space-y-4 mb-6">
          {/* Before */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-red-500">❌ Before</span>
            </div>
            <div className="bg-background/50 border border-border rounded p-3">
              <code className="text-xs text-muted-foreground font-mono line-through">
                {before}
              </code>
            </div>
          </div>

          {/* After */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-green-500">✅ After</span>
            </div>
            <div className="bg-background/50 border border-border rounded p-3">
              <code className="text-xs text-foreground font-mono">{after}</code>
            </div>
          </div>
        </div>

        {/* Stat Badge */}
        <Badge variant="secondary" className="w-fit">
          {stat}
        </Badge>
      </div>
    </motion.div>
  );
}

export function ProblemSection() {
  const problems = [
    {
      icon: <Search className="w-6 h-6 text-white" />,
      title: 'RAG Systems Break',
      description:
        'Bad OCR corrupts embeddings, making vector search return irrelevant results.',
      before: 'Th3 c0mpany r3v3nu3 w@s $5M...',
      after: 'The company revenue was $5M...',
      stat: '92% accuracy improvement',
      accentColor: 'from-blue-500 to-blue-600',
      delay: 0.1,
    },
    {
      icon: <Bot className="w-6 h-6 text-white" />,
      title: 'AI Agents Fail',
      description:
        'Incorrect OCR data leads to wrong actions and hallucinated outputs.',
      before: 'lnv0ice: Pay $1OOO by...',
      after: 'Invoice: Pay $1000 by...',
      stat: '85% fewer errors',
      accentColor: 'from-purple-500 to-purple-600',
      delay: 0.2,
    },
    {
      icon: <Globe className="w-6 h-6 text-white" />,
      title: 'Multi-lingual Chaos',
      description:
        'Most OCR can\'t handle Hindi, Arabic, Japanese, or mixed-language documents.',
      before: '???? ???? ???',
      after: 'वार्षिक रिपोर्ट 2024',
      stat: '50+ languages supported',
      accentColor: 'from-green-500 to-green-600',
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Why Clean OCR Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bad OCR isn't just annoying—it breaks your AI systems at the
            foundation layer. Here's what happens when your documents aren't
            properly processed.
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Don't let OCR quality be your bottleneck.{' '}
            <a
              href="#demo"
              className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 font-medium"
            >
              Try it now
              <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
