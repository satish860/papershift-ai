'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const codeSnippet = `from papershift import OCR
result = OCR.process("document.pdf")
print(result.markdown)  # Clean, AI-ready text`;

export function Hero() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typing animation for code snippet
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 800); // Start typing after other animations

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= codeSnippet.length) {
        setDisplayedCode(codeSnippet.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Typing speed

    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto w-full">
        {/* Main Content */}
        <div className="text-center space-y-8">
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
              <Link href="#demo">
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
              <Link href="/docs">
                View Docs
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
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
              <div className="relative bg-card border border-border rounded-lg p-6 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <pre className="font-mono text-sm md:text-base overflow-x-auto">
                  <code className="text-foreground">
                    <span className="text-purple-400">from</span>{' '}
                    <span className="text-blue-400">papershift</span>{' '}
                    <span className="text-purple-400">import</span>{' '}
                    <span className="text-green-400">OCR</span>
                    {'\n'}
                    <span className="text-foreground">result</span>{' '}
                    <span className="text-purple-400">=</span>{' '}
                    <span className="text-green-400">OCR</span>
                    <span className="text-foreground">.</span>
                    <span className="text-yellow-400">process</span>
                    <span className="text-foreground">(</span>
                    <span className="text-orange-400">"document.pdf"</span>
                    <span className="text-foreground">)</span>
                    {'\n'}
                    <span className="text-purple-400">print</span>
                    <span className="text-foreground">(result.markdown)</span>{' '}
                    <span className="text-gray-500"># Clean, AI-ready text</span>
                  </code>
                </pre>
              </div>
            </div>
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
