import { useState } from 'react';
import { Hero } from './components/Hero';
import { PortfolioLibrary } from './components/PortfolioLibrary';
import { AdminPanel } from './components/AdminPanel';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>('portfolio');

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen">
        {/* Admin Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="font-['Anonymous_Pro'] text-xl text-[#323232] uppercase tracking-wider">
                Portfolio Admin
              </h1>
              <Button
                onClick={() => setCurrentView('portfolio')}
                variant="outline"
                className="font-['Anonymous_Pro'] uppercase tracking-wide bg-white/20 border-white/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Portfolio
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-20">
          <AdminPanel />
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero onUnlockAdmin={() => setCurrentView('admin')} />
      <PortfolioLibrary />
      <Toaster />
    </div>
  );
}