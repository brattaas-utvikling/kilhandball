// components/SponsorBanner.tsx
import { useState } from 'react';

// Sponsor data
const sponsorsData = [
  {
    id: 1,
    name: 'SpareBank 1',
    imageUrl: '/bilder/partnere/sparebank1.webp',
    websiteUrl: 'https://www.sparebank1.no/nb/ostlandet/privat.html',
  },
  {
    id: 2,
    name: 'Eidsiva',
    imageUrl: '/bilder/partnere/eidsiva.png',
    websiteUrl: 'https://www.eidsiva.no/',
  },
  {
    id: 3,
    name: 'Rimfelt-Eiendom',
    imageUrl: '/bilder/partnere/rimfeldt-eiendom.jpg',
    websiteUrl: 'https://rimfeldteiendom.no/',
  },
  {
    id: 4,
    name: 'Sport1 Kongsvinger',
    imageUrl: '/bilder/partnere/sport1.jpg',
    websiteUrl: 'https://www.sport1.no/',
  },
  {
    id: 5,
    name: 'Glåmdalen',
    imageUrl: '/bilder/partnere/glamdalen.png',
    websiteUrl: 'https://www.glomdalen.no/',
  },
  {
    id: 6,
    name: 'Kobbl',
    imageUrl: '/bilder/partnere/kobbl.jpg',
    websiteUrl: 'https://www.kobbl.no',
  },
  {
    id: 7,
    name: 'Sulland',
    imageUrl: '/bilder/partnere/sulland.jpg',
    websiteUrl: 'https://www.sulland.no/',
  },
  {
    id: 8,
    name: 'Betong ØST',
    imageUrl: '/bilder/partnere/betong_ost.png',
    websiteUrl: 'https://www.betongost.no/',
  },
];

export default function SponsorBanner() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplikat array for seamless loop
  const duplicatedSponsors = [...sponsorsData, ...sponsorsData];

  return (
    <section className="relative w-full py-8 md:py- bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      
      {/* Top fade overlay */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none" />
      
      {/* Bottom fade overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none" />

        {/* Animated sponsor track */}
        <div 
          className={`flex gap-12 md:gap-16 ${isPaused ? 'pause-animation' : ''}`}
          style={{
            animation: 'scroll 40s linear infinite',
          }}
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <a
              key={`${sponsor.id}-${index}`}
              href={sponsor.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
              aria-label={`Besøk ${sponsor.name} sin nettside`}
            >
              <div className="relative w-32 h-20 md:w-40 md:h-24 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100">
                <img
                  src={sponsor.imageUrl}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}