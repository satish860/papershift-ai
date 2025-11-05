'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const codeSnippet = `import requests

response = requests.post(
    "https://api.papershift.ai/v1/ocr",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"url": "document.pdf"}
)

print(response.json()["markdown"])  # Clean, AI-ready text`;

export function Hero() {
  const [apiKeyHovered, setApiKeyHovered] = useState(false);

  const handleGetApiKey = () => {
    // Scroll to demo section
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl mx-auto w-full">
        {/* Main Content */}
        <div className="text-center space-y-6">
          {/* Beta Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Free Beta Access • No Credit Card</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
              Clean OCR for AI Workflows
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stop letting bad OCR break your RAG systems. High-quality document
              processing built for AI engineers who need reliable, structured
              output.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-glow hover:shadow-glow-purple transition-all group text-base px-8 py-6"
            >
              <Link href="/playground">
                Try Demo
                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted group text-base px-8 py-6"
            >
              <a href="http://localhost:8000/docs" target="_blank" rel="noopener noreferrer">
                View API Docs
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Animated Code Snippet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20" />

              {/* Code block */}
              <div className="relative bg-card border border-border rounded-lg p-5 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <TooltipProvider>
                  <pre className="font-mono text-sm md:text-base overflow-x-auto">
                    <code className="text-foreground">
                      <span className="text-purple-400">import</span>{' '}
                      <span className="text-blue-400">requests</span>
                      {'\n\n'}
                      <span className="text-foreground">response</span>{' '}
                      <span className="text-purple-400">=</span>{' '}
                      <span className="text-foreground">requests.</span>
                      <span className="text-yellow-400">post</span>
                      <span className="text-foreground">(</span>
                      {'\n'}
                      <span className="text-foreground">    </span>
                      <span className="text-orange-400">"https://api.papershift.ai/v1/ocr"</span>
                      <span className="text-foreground">,</span>
                      {'\n'}
                      <span className="text-foreground">    headers</span>
                      <span className="text-purple-400">=</span>
                      <span className="text-foreground">{'{'}</span>
                      <span className="text-orange-400">"Authorization"</span>
                      <span className="text-foreground">: </span>
                      <span className="text-cyan-400">f</span>
                      <span className="text-orange-400">"Bearer </span>
                      <span className="text-foreground">{'{'}</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            className="text-foreground underline decoration-dotted decoration-primary cursor-pointer hover:text-primary transition-colors"
                            onClick={handleGetApiKey}
                            onMouseEnter={() => setApiKeyHovered(true)}
                            onMouseLeave={() => setApiKeyHovered(false)}
                          >
                            API_KEY
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">👆 Click to get your free API key</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="text-foreground">{'}'}</span>
                      <span className="text-orange-400">"</span>
                      <span className="text-foreground">{'}'}</span>
                      <span className="text-foreground">,</span>
                      {'\n'}
                      <span className="text-foreground">    json</span>
                      <span className="text-purple-400">=</span>
                      <span className="text-foreground">{'{'}</span>
                      <span className="text-orange-400">"url"</span>
                      <span className="text-foreground">: </span>
                      <span className="text-orange-400">"document.pdf"</span>
                      <span className="text-foreground">{'}'}</span>
                      {'\n'}
                      <span className="text-foreground">)</span>
                      {'\n\n'}
                      <span className="text-purple-400">print</span>
                      <span className="text-foreground">(response.</span>
                      <span className="text-yellow-400">json</span>
                      <span className="text-foreground">()[</span>
                      <span className="text-orange-400">"markdown"</span>
                      <span className="text-foreground">])</span>
                      {' '}
                      <span className="text-gray-500"># Clean, AI-ready text</span>
                    </code>
                  </pre>
                </TooltipProvider>
              </div>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Simple REST API
              </span>
              <span className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Clean markdown output
              </span>
              <span className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Multi-lingual support
              </span>
              <span className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                Bounding box metadata
              </span>
            </div>
            <p className="text-xs text-muted-foreground/80">
              Full API documentation available at{' '}
              <a
                href="http://localhost:8000/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                localhost:8000/docs
              </a>
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
