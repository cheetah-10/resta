import React from 'react';
import HeroSection from '@/components/HeroSection';
import WelcomeSection from '@/components/WelcomeSection';
import RestaurantsSection from '@/components/RestaurantsSection';
import ServicesSection from '@/components/OurService';
import NearestRestaurantsSection from '@/components/NearestRestaurantsSection';
import GallerySection from '@/components/GallerySection';


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <WelcomeSection />
        <RestaurantsSection />
        <ServicesSection />
        <NearestRestaurantsSection />
        <GallerySection />
      </main>
    </div>
  );
}