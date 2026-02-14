import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Accessibility,
  Cog,
  Download,
  House,
  LifeBuoy,
  SquareChartGantt,
  TvMinimalPlay,
  Volleyball,
  Icon
} from 'lucide-react';
import { stairs } from '@lucide/lab';
import { FaChevronRight } from 'react-icons/fa6';
import Logo from '../assets/kil_logo.png';
import { GiWhistle } from 'react-icons/gi';
import { Button } from '../components/ui/button';
import { getFileDownload } from '../lib/appwrite'; // Juster import-path etter din struktur

// Appwrite Storage konfiguration
const STORAGE_CONFIG = {
  BUCKET_ID: import.meta.env.VITE_STORAGE_BUCKET_ID, // Erstatt med din bucket ID
  FORELDRE_MAL_FILE_ID: import.meta.env.VITE_FORELDRE_MAL_FILE_ID, // Erstatt med din PDF file ID
};

function PraktiskInfo() {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  // Funksjon for å hente download URL fra Appwrite Storage
  const getForeldremoeteMalDownloadUrl = async (): Promise<string> => {
    try {
      const downloadUrl = getFileDownload(
        STORAGE_CONFIG.BUCKET_ID,
        STORAGE_CONFIG.FORELDRE_MAL_FILE_ID
      );
      return downloadUrl; // downloadUrl er allerede en string
    } catch (error) {
      console.error('Feil ved henting av download URL:', error);
      throw new Error('Kunne ikke hente download URL fra Appwrite Storage');
    }
  };

  const handleDownloadForeldremoeteMal = async () => {
    setIsDownloading(true);
    try {
      const downloadUrl = await getForeldremoeteMalDownloadUrl();
      
      // Opprett download link
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Foredremøte-mal.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Download feilet:", error);
      
      // Type-safe error handling
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Ukjent feil oppstod";
      
      alert(`Kunne ikke laste ned foreldremøte-mal: ${errorMessage}`);
      
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Forenklet datastruktur for informasjonselementer
  const informasjonsElementer = [
    {
      icon: <House size={24} />,
      title: 'Hjemmearrangement',
      description: 'Brukerveiledninger for hjemmearrangement',
      link: '/praktisk-info/hjemmearrangement',
    },
    {
      icon: <House size={24} />,
      title: 'Barnehåndballarrangement',
      description: 'Brukerveiledninger for barnehåndballarrangement',
      link: '/praktisk-info/barnehandballarrangement',
    },
    {
      icon: <TvMinimalPlay size={24} />,
      title: 'Håndball Live',
      description: 'Brukerveiledninger for Håndball Live',
      link: '/praktisk-info/handball-live',
    },
    {
      icon: <SquareChartGantt size={24} />,
      title: 'Organisasjonskart',
      description: 'Oversikt over organisasjonen',
      link: '/praktisk-info/organisasjonskart',
    },
    {
      icon: <Volleyball size={24} />,
      title: 'Sportslig informasjon',
      description: 'Informasjon om sportslig drift',
      link: '/praktisk-info/sportslig',
    },
    {
      icon:   <Icon iconNode={stairs} size={24}/>,
      title: 'Utviklingstrappa',
      description: 'Tenk langsiktig med utviklingstrappa!',
      link: '/praktisk-info/utviklingstrappa',
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
    {
      icon: <LifeBuoy size={24} />,
      title: 'Årshjul',
      description: 'Her kan du finne klubbens årshjul',
      link: '/praktisk-info/aarshjul',
    },
    // Legg til flere elementer her ved behov
  ];

  return (
    <div className="w-full min-h-screen bg-white pb-12">
      {/* Hero banner */}
      <div className="relative w-full h-48 md:h-96">
        <img
          src={"https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/klubbhus-nivaa-1-banner/view?project=68a9f0da0014cb9bd6ad&mode=admin"}
          alt="KIL banner"
          className="w-full h-full rounded-t-md object-contain object-center aspect-video overflow-hidden"
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
          <div className="flex justify-center my-4">
            <Button
              onClick={handleDownloadForeldremoeteMal}
              disabled={isDownloading}
              variant="outline"
              size="sm"
              className="font-roboto font-medium rounded-full 
                        border-kilred text-kilred 
                        hover:bg-kilred hover:text-white
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-kilred mr-2"></div>
                  Laster ned...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Last ned foreldremøte-mal
                </>
              )}
            </Button>
          </div>
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