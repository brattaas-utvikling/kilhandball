import { Sponsor } from "../../types/Sponsor";
import sparebank1 from '../../assets/sparebank1.webp';
import eidsiva from '../../assets/eidsiva.png';
import rimfeldt from '../../assets/rimfeldt-eiendom.jpg';
import sport1 from '../../assets/sport1.jpg';
import glåmdalen from '../../assets/glåmdalen.png';
import kobbl from '../../assets/kobbl.jpg';
import sulland from '../../assets/sulland.jpg';
import betongOst from '../../assets/betong_ost.png';

// Sponsor data
const sponsorsData = [
  {
    id: 1,
    name: 'SpareBank 1',
    imageUrl: sparebank1,
    websiteUrl: 'https://www.sparebank1.no/nb/ostlandet/privat.html'
  },
  {
    id: 2,
    name: 'Eidsiva',
    imageUrl: eidsiva,
    websiteUrl: 'https://www.eidsiva.no/'
  },
  {
    id: 3,
    name: 'Rimfelt-Eiendom',
    imageUrl: rimfeldt,
    websiteUrl: 'https://rimfeldteiendom.no/'
  },
  {
    id: 4,
    name: 'Sport1 Kongsvinger',
    imageUrl: sport1,
    websiteUrl: 'https://www.sport1.no/'
  },
  {
    id: 5,
    name: 'Glåmdalen',
    imageUrl: glåmdalen,
    websiteUrl: 'https://www.glomdalen.no/'
  },
  {
    id: 6,
    name: 'Kobbl',
    imageUrl: kobbl,
    websiteUrl: 'https://www.kobbl.no'
  },
  {
    id: 7,
    name: 'Sulland',
    imageUrl: sulland,
    websiteUrl: 'https://www.sulland.no/'
  },
  {
    id: 8,
    name: 'Betong ØST',
    imageUrl: betongOst,
    websiteUrl: 'https://www.betongost.no/'
  }
];

function Sponsors() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase text-kilsvart">Våre sponsorer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsorsData.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a 
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full"
      aria-label={`Besøk ${sponsor.name} sin nettside`}
    >
      <div className="flex items-center justify-center h-32 mb-2">
        <img 
          src={sponsor.imageUrl} 
          alt={`${sponsor.name} logo`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
    </a>
  );
}

export default Sponsors;