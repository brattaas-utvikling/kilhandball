import { Link } from 'react-router-dom';
import {
  Accessibility,
  Cog,
  House,
  TvMinimalPlay,
  Volleyball,
} from 'lucide-react';
import { FaChevronRight } from 'react-icons/fa6';
import Logo from '../../assets/kil_logo.png';
import Banner from '../../assets/banner.webp';
import { GiWhistle } from 'react-icons/gi';

function PraktiskInfo() {
  // Forenklet datastruktur for informasjonselementer
  const informasjonsElementer = [
    {
      icon: <House size={24} />,
      title: 'Hjemmearrangement',
      description: 'Brukerveiledninger for hjemmearrangement',
      link: '/praktisk-info/hjemmearrangement',
    },
    {
      icon: <TvMinimalPlay size={24} />,
      title: 'Håndball Live',
      description: 'Brukerveiledninger for Håndball Live',
      link: '/praktisk-info/handball-live',
    },
    {
      icon: <Volleyball size={24} />,
      title: 'Sportslig informasjon',
      description: 'Informasjon om sportslig drift',
      link: '/praktisk-info/sportslig',
    },
    {
      icon: <Accessibility size={24} />,
      title: 'Rullestolhåndball',
      description: 'Informasjon om rullestolhåndball',
      link: '/praktisk-info/rullestolhandball',
    },
    {
      icon: <GiWhistle size={24} />,
      title: 'Dommer',
      description: 'Informasjon for dommere',
      link: '/praktisk-info/dommer',
    },
    {
      icon: <Cog size={24} />,
      title: 'Klubbdrift',
      description: 'Informasjon om klubbdrift',
      link: '/praktisk-info/klubbdrift',
    },
    // Legg til flere elementer her ved behov
  ];

  return (
    <div className="w-full min-h-screen bg-white pb-12">
      {/* Hero banner */}
      <div className="relative w-full h-48 md:h-64">
        <img
          src={Banner || 'https://placehold.co/1200x300'}
          alt="KIL banner"
          className="w-full h-full rounded-t-md object-cover object-center aspect-video overflow-hidden"
        />
      </div>

      {/* Info Card */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-white shadow-lg rounded-lg p-6 max-w-lg md:max-w-2xl text-center w-11/12 sm:w-9/12 md:w-8/12 lg:w-6/12">
        <div className="flex flex-col items-center">
          <img
            src={Logo || 'https://placehold.co/150'}
            alt="KIL logo"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-gray-200 object-cover object-center aspect-square"
          />
          <h1 className="text-2xl md:text-3xl font-bold mt-4 text-kilsvart">
            Praktisk informasjon for KIL Håndball
          </h1>
        </div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto mt-52 md:mt-56 lg:mt-64">
        {/* Kort introduksjon */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-lg text-gray-700">
            Her finner du praktisk informasjon og nyttige ressurser for
            medlemmer, trenere og foreldre i KIL Håndball.
          </p>
        </div>

        {/* Informasjonselementer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {informasjonsElementer.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex items-center justify-between gap-4 px-6 py-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Icon + Text */}
              <div className="flex items-center gap-4">
                <div className="text-kilred">{item.icon}</div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-1 text-kilsvart">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </div>
              <FaChevronRight className="text-gray-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PraktiskInfo;
