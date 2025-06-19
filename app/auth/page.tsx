'use client';

import { AuthForm } from '@/components/auth/auth-form';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') as 'signin' | 'signup' || 'signin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-gray-900">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span>FinanceHub</span>
          </Link>
        </div>
        <AuthForm mode={mode} />
      </div>
    </div>
  );
} 