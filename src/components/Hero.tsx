import { motion } from 'motion/react';
import adminAvatar from '../assets/admin-avatar.png';

interface HeroData {
  name: string;
  title: string;
  description: string;
  skills: string;
  expertise: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  contactLink: string;
}

const DEFAULT_HERO_DATA: HeroData = {
  name: 'Artem',
  title: 'Designer & Project Manager',
  description: 'Seeking a position in design or project management where I can help you with project visualization, process optimization, and solving business problems. My goal is to work with a steady stream of orders and clients.',
  skills: 'Graphic and web design • Vibe coding • Zero-code services • AI image/video generation • Project management • Event organization',
  expertise: 'Client communication • Business process optimization • Visual concept creation • Social media promotion',
  primaryButtonText: 'View Portfolio',
  secondaryButtonText: 'Contact Me',
  contactLink: 'https://t.me/artartemev'
};

export function Hero({ onUnlockAdmin }: { onUnlockAdmin?: () => void }) {
  const heroData = DEFAULT_HERO_DATA;

  const scrollToPortfolio = () => {
    const portfolioSection = document.querySelector('[data-section="portfolio"]');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminClick = () => {
    const password = window.prompt('Enter admin password');
    if (password === 'goura') {
      onUnlockAdmin?.();
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with glass effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffded] via-[#f8f6e8] to-[#f0ede1]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div className="flex justify-center md:justify-start">
            <img
              src={adminAvatar}
              alt="Admin avatar"
              className="w-full max-w-xs md:max-w-md rounded-full cursor-pointer"
              onClick={handleAdminClick}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                className="font-['Anonymous_Pro'] tracking-[0.2em] uppercase text-[#323232]"
                style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 'bold', lineHeight: '0.9' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {heroData.name}
              </motion.h1>

              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-[#323232] to-transparent"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="font-['Anonymous_Pro'] text-[#323232] text-xl leading-relaxed uppercase tracking-wider">
                {heroData.description}
              </p>

              <div className="relative">
                <div className="absolute -inset-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10" />
                <div className="relative p-6 space-y-2">
                  <p className="font-['Anonymous_Pro'] text-[#323232] leading-relaxed uppercase tracking-wide opacity-90">
                    <span className="text-[#666]">Skills:</span> {heroData.skills}
                  </p>
                  <p className="font-['Anonymous_Pro'] text-[#323232] leading-relaxed uppercase tracking-wide opacity-90">
                    <span className="text-[#666]">Expertise:</span> {heroData.expertise}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button 
                onClick={scrollToPortfolio}
                className="group relative px-6 sm:px-8 py-4 bg-[#323232] text-white font-['Anonymous_Pro'] uppercase tracking-wider overflow-hidden rounded-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">{heroData.primaryButtonText}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#323232] to-[#555] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
              
              <a 
                href={heroData.contactLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-6 sm:px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-[#323232] font-['Anonymous_Pro'] uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 inline-block"
              >
                {heroData.secondaryButtonText}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-[#323232]/60"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-['Anonymous_Pro'] text-sm uppercase tracking-wider">Scroll</span>
          <div className="w-px h-8 bg-[#323232]/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
