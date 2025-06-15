'use client';

import { LandingPage } from '@/components/LandingPage';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/tool');
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
}
