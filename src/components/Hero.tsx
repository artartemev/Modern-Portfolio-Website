
import { useState } from 'react';
import { motion } from 'motion/react';
import { motion } from 'motion/react';
import { Avatar, AvatarImage } from './ui/avatar';
import adminAvatar from '../assets/admin-avatar.png';


interface HeroData {
interface HeroData {
  name: string;
  name: string;
  title: string;
  title: string;
  description: string;
  description: string;
  skills: string;
  skills: string;
  expertise: string;
  expertise: string;
  primaryButtonText: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryButtonText: string;
  contactLink: string;
  contactLink: string;
  image: string;
  image: string;
}
}


const DEFAULT_HERO_DATA: HeroData = {
const DEFAULT_HERO_DATA: HeroData = {
  name: 'Artem',
  name: 'Artem',
  title: 'Designer & Project Manager',
  title: 'Designer & Project Manager',
  description: 'Seeking a position in design or project management where I can help you with project visualization, process optimization, and solving business problems. My goal is to work with a steady stream of orders and clients.',
  description: 'Seeking a position in design or project management where I can help you with project visualization, process optimization, and solving business problems. My goal is to work with a steady stream of orders and clients.',
  skills: 'Graphic and web design • Vibe coding • Zero-code services • AI image/video generation • Project management • Event organization',
  skills: 'Graphic and web design • Vibe coding • Zero-code services • AI image/video generation • Project management • Event organization',
  expertise: 'Client communication • Business process optimization • Visual concept creation • Social media promotion',
  expertise: 'Client communication • Business process optimization • Visual concept creation • Social media promotion',
  primaryButtonText: 'View Portfolio',
  primaryButtonText: 'View Portfolio',
  secondaryButtonText: 'Contact Me',
  secondaryButtonText: 'Contact Me',
  contactLink: 'https://t.me/artartemev',
  contactLink: 'https://t.me/artartemev',
  image: ''
  image: adminAvatar
};
};


export function Hero({ onUnlockAdmin }: { onUnlockAdmin?: () => void }) {
export function Hero({ onUnlockAdmin }: { onUnlockAdmin?: () => void }) {
  const heroData = DEFAULT_HERO_DATA;
  const heroData = DEFAULT_HERO_DATA;
  const [clickCount, setClickCount] = useState(0);


  const scrollToPortfolio = () => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.querySelector('[data-section="portfolio"]');
    const portfolioSection = document.querySelector('[data-section="portfolio"]');
    if (portfolioSection) {
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
    }
  };
  };


  const handleImageClick = () => {
  const handleImageClick = () => {
    const newCount = clickCount + 1;
    const password = window.prompt('Enter admin password');
    setClickCount(newCount);
    if (password === 'goura') {
    if (newCount >= 8) {
      onUnlockAdmin?.();
      const password = window.prompt('Enter admin password');
      if (password === 'goura') {
        onUnlockAdmin?.();
      }
      setClickCount(0);
    }
    }
  };
  };
  return (
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with glass effects */}
      {/* Background with glass effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffded] via-[#f8f6e8] to-[#f0ede1]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#fffded] via-[#f8f6e8] to-[#f0ede1]" />
      
      
      {/* Animated background elements */}
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
      <div className="absolute inset-0 opacity-30">
        <motion.div
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          animate={{
          animate={{
            x: [0, 50, 0],
            x: [0, 50, 0],
            y: [0, 30, 0],
            y: [0, 30, 0],
          }}
          }}
          transition={{
          transition={{
            duration: 20,
            duration: 20,
            repeat: Infinity,
            repeat: Infinity,
            ease: "easeInOut"
            ease: "easeInOut"
          }}
          }}
        />
        />
        <motion.div
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 rounded-full blur-3xl"
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-cyan-200/20 rounded-full blur-3xl"
          animate={{
          animate={{
            x: [0, -30, 0],
            x: [0, -30, 0],
            y: [0, 50, 0],
            y: [0, 50, 0],
          }}
          }}
          transition={{
          transition={{
            duration: 25,
            duration: 25,
            repeat: Infinity,
            repeat: Infinity,
            ease: "easeInOut"
            ease: "easeInOut"
          }}
          }}
        />
        />
      </div>
      </div>


      <div className="container mx-auto px-8 relative z-10">
      <div className="container mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          {/* Image Section */}
          <motion.div
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            transition={{ duration: 0.8 }}
            className="relative"
            className="relative"
          >
          >
            <div className="relative">
            {heroData.image && (
              {heroData.image && (
              <Avatar
                <img
                className="w-40 h-40 mx-auto shadow-2xl cursor-pointer"
                onClick={handleImageClick}
              >
                <AvatarImage
                  src={heroData.image}
                  src={heroData.image}
                  alt={`${heroData.name} - ${heroData.title}`}
                  alt={`${heroData.name} - ${heroData.title}`}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover aspect-[4/5]"
                  className="object-cover"
                  onClick={handleImageClick}
                  loading="lazy"
                />
                />
              )}
              </Avatar>
            </div>
            )}
          </motion.div>
          </motion.div>


          {/* Content Section */}
          {/* Content Section */}
          <motion.div
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
            className="space-y-8"
          >
          >
            <div className="space-y-4">
            <div className="space-y-4">
              <motion.h1
              <motion.h1
                className="font-['Anonymous_Pro'] tracking-[0.2em] uppercase text-[#323232]"
                className="font-['Anonymous_Pro'] tracking-[0.2em] uppercase text-[#323232]"
                style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 'bold', lineHeight: '0.9' }}
                style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 'bold', lineHeight: '0.9' }}
                initial={{ opacity: 0, y: 30 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
              >
                {heroData.name}
                {heroData.name}
              </motion.h1>
              </motion.h1>
              
              
              <motion.div
              <motion.div
                className="h-1 w-24 bg-gradient-to-r from-[#323232] to-transparent"
                className="h-1 w-24 bg-gradient-to-r from-[#323232] to-transparent"
                initial={{ width: 0 }}
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                transition={{ duration: 0.8, delay: 0.6 }}