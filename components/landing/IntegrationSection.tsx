'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Link as LinkIcon, Workflow, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Integration {
  name: string;
  icon: React.ReactNode;
  tag: string;
  description: string;
  color: string;
  link?: string;
}

function IntegrationCard({
  integration,
  delay,
}: {
  integration: Integration;
  delay: number;
}) {
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
        className={`absolute -inset-0.5 bg-gradient-to-r ${integration.color} rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300`}
      />

      {/* Card */}
      <div className="relative bg-card border border-border rounded-lg p-8 h-full flex flex-col items-center text-center hover:border-primary/50 transition-colors">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-lg bg-gradient-to-br ${integration.color} p-4 flex items-center justify-center mb-4`}
        >
          {integration.icon}
        </div>

        {/* Name */}
        <h3 className="text-xl font-semibold mb-2">{integration.name}</h3>

        {/* Tag */}
        <Badge variant="secondary" className="mb-3">
          {integration.tag}
        </Badge>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {integration.description}
        </p>

        {/* Link (if available) */}
        {integration.link && (
          <a
            href={integration.link}
            className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            View Integration
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function IntegrationSection() {
  const integrations: Integration[] = [
    {
      name: 'LangChain',
      icon: <LinkIcon className="w-8 h-8 text-white" />,
      tag: 'Document Loaders',
      description:
        'Drop-in replacement for document loaders. Clean markdown output perfect for RAG pipelines and vector embeddings.',
      color: 'from-green-500 to-green-600',
      link: '/docs/langchain',
    },
    {
      name: 'LlamaIndex',
      icon: <LinkIcon className="w-8 h-8 text-white rotate-45" />,
      tag: 'Data Connectors',
      description:
        'Native integration with LlamaIndex readers. Seamlessly load documents into your knowledge base with high-quality OCR.',
      color: 'from-purple-500 to-purple-600',
      link: '/docs/llamaindex',
    },
    {
      name: 'Make.com',
      icon: <Workflow className="w-8 h-8 text-white" />,
      tag: 'No-Code Automation',
      description:
        'Pre-built modules for Make.com scenarios. Process documents automatically in your workflows without writing code.',
      color: 'from-blue-500 to-blue-600',
      link: '/docs/make',
    },
    {
      name: 'Zapier',
      icon: <Zap className="w-8 h-8 text-white" />,
      tag: 'Workflow Integration',
      description:
        'Connect PaperShift to 5,000+ apps. Trigger OCR processing from any event and send results anywhere.',
      color: 'from-orange-500 to-orange-600',
      link: '/docs/zapier',
    },
  ];

  return (
    <section className="py-20 px-4 bg-card/30">
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
            Works With Your Stack
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            PaperShift integrates seamlessly with the tools you already use.
            Whether you're building with Python or no-code, we've got you covered.
          </p>
        </motion.div>

        {/* Integration Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              delay={0.1 * (index + 1)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            Don't see your tool? We have a REST API that works with everything.
          </p>
          <a
            href="/docs/api"
            className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 font-medium"
          >
            View API Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
