'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Professional Financial
            <span className="text-blue-600"> Analysis Platform</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Access real-time market data, expert analysis, and comprehensive financial insights. 
            Make informed investment decisions with our cutting-edge platform trusted by professionals.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/team">Meet Our Team</Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Real-time Data</h3>
              <p className="mt-2 text-center text-sm text-gray-600">
                Live market data and advanced charting tools for accurate analysis
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Expert Analysis</h3>
              <p className="mt-2 text-center text-sm text-gray-600">
                Professional insights from certified financial analysts
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Fast Execution</h3>
              <p className="mt-2 text-center text-sm text-gray-600">
                Lightning-fast platform performance for time-critical decisions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}