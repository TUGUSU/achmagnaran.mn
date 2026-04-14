import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import PartnersSection from './components/PartnersSection';
import AboutSection from './components/AboutSection';
import ProductsSection from './components/ProductsSection';
import TrustSection from './components/TrustSection';
import SocialSection from './components/SocialSection';
import ContactSection from './components/ContactSection';

export default function Homepage() {
  return (
    <main className="min-h-screen bg-warm-dark overflow-x-hidden">
      <Header />
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <ProductsSection />
      <TrustSection />
      <SocialSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
