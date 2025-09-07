import { useState } from 'react';
import { Hero } from './components/Hero';
import { PortfolioLibrary } from './components/PortfolioLibrary';
import { AdminPanel } from './components/AdminPanel';
import { ApiDebug } from './components/ApiDebug';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { Settings, Eye, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>('portfolio');

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen">
        {/* Admin Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="font-['Feature_Mono'] text-xl text-[#323232] uppercase tracking-wider">
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
      {/* Admin Access Button */}
      <motion.div
        className="fixed top-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button
          onClick={() => setCurrentView('admin')}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-[#323232] hover:bg-white/20 transition-all duration-300"
          size="sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="font-['Anonymous_Pro'] uppercase tracking-wide">Admin</span>
        </Button>
      </motion.div>

      <Hero />
      <PortfolioLibrary />
      <ApiDebug />
      <Toaster />
    </div>
  );
}