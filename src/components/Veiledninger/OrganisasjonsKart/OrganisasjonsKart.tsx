import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Gavel
} from 'lucide-react';
import { GiWhistle } from 'react-icons/gi';
import { FaVolleyballBall } from 'react-icons/fa';

// Define types for the component
type Responsibility = string;

type Member = {
  name: string;
  role: string;
  email: string;
  phone: number;
  responsibilities: Responsibility[];
};

type OrganizationSection = {
  title: string;
  icon: React.ReactNode;
  members: Member[];
};

type OrganizationData = {
  hovedStyre: OrganizationSection;
  sportsligUtvalg: OrganizationSection;
  dommeransvarlig: OrganizationSection;
};

function OrganisasjonsKart() {
  // Mock organization data with responsibilities
  const organisasjon: OrganizationData = {
    hovedStyre: {
      title: 'Hovedstyre',
      icon: <Gavel size={24} />,
      members: [
        {
          name: 'Bent Rode-Christoffersen',
          role: 'Styreleder',
          email: 'bent.rode.christoffersen@gmail.com',
          phone: 90969435,
          responsibilities: [
            'Kontrakter for lag over J/G14',
            'Learn Handball',
            'Dommerakontakt',
            'Varslinger',
            'Tilskudd og støtteordninger',
            'Samarbeid NTG',
            'Prosjekt ny hall',
          ],
        },
        {
          name: 'Vidar Svartkjønnli',
          role: 'Nestleder',
          email: 'darwin73@live.no',
          phone: 92201316,
          responsibilities: [
            'Økonomi',
            'Spond',
            'Sportslig utvalg',
            'Oppstarts- og evalueringsmøte',
            'Årshjul',
          ],
        },
        {
          name: 'Svein Thorstensen',
          role: 'Styremedlem',
          email: 'sveinthorstensen50@gmail.com',
          phone: 91185490,
          responsibilities: [
            'Økonomi',
            'Hallverter',
            'Kontak/Mail',
            'Nøkkelansvarlig',
            'Kontigent',
          ],
        },
        {
          name: 'Elin Maria Vendela Skoglund',
          role: 'Styremedlem',
          email: 'elinskoglund83@gmail.com',
          phone: 91788617,
          responsibilities: [
            'Drakter (utdeling og innsamling)',
            'Kioskansvarlig',
            'Dugnadsansvarlig',
            'utstyr',
            'Sosiale Medier',
          ],
        },
        {
          name: 'Erik Seigerud',
          role: 'Styremedlem',
          email: 'erse@omfjeld.no',
          phone: 92097978,
          responsibilities: [
            "Spond",
            "Økonomisk Dugnadsansvarlig",
            "Prosjekt ny hall"
          ],
        },
        {
          name: 'Bjørn Erik Johnsen',
          role: 'Styremedlem',
          email: 'berikj@online.no',
          phone: 90728194,
          responsibilities: [
            'Økonomisk Dugnadsansvarlig',
            'Sponsoransvarlig',
            'Skjerm og lyd i hallen',
          ],
        },
        {
          name: 'Linda Skarstad',
          role: 'Styremedlem',
          email: 'linda@skarstadgartneri.no',
          phone: 41500585,
          responsibilities: [
            'Arrangementer',
            'Kickoff',
            'Drakter (utdeling og innsamling)',
            'Klubbhåndbok',
          ],
        },
        {
          name: 'Hanne Fiskerud',
          role: 'Styremedlem',
          email: 'hanne.fiskerud@gmail.com',
          phone: 97584371,
          responsibilities: [
            'Arrangement',
            'Kickoff',
            'Tilskudd og støtteordninger',
          ],
        },
      ],
    },
    sportsligUtvalg: {
      title: 'Sportslig Utvalg',
      icon: <FaVolleyballBall size={24} />,
      members: [
        {
          name: 'Erik Elseth',
          role: 'Sportslig Leder',
          email: 'erik.elseth@gmail.com',
          phone: 90667312,
          responsibilities: [
            'Sportslig årshjul',
            'Oppstarts- og evalueringsmøte',
            'Varslinger',
            'Lagspåmeldinger',
          ],
        },
        {
          name: 'Sarah Bourne Holtet',
          role: 'Sportslig Utvalg',
          email: 'sarah_bourne6@hotmail.com',
          phone: 91158686,
          responsibilities: [
            'Samarbeid med NTG',
            'Treningstider',
            'Fordeling av treningstider/haller',
          ],
        },
        {
          name: 'Charlotte Egnersson',
          role: 'Sportslig Utvalg',
          email: 'charlotteproeven@hotmail.com',
          phone: 41351166,
          responsibilities: ['Trenerutvikling', 'Trenerforum'],
        },
        {
          name: 'Jon Are Haveråen-Brattås',
          role: 'Sportslig Utvalg',
          email: 'jon.are.br@gmail.com',
          phone: 91607759,
          responsibilities: [
            'Sportslig plan',
            'Treningstider',
            'Fordeling av treningstider/haller',
            'Lagspåmeldinger',
            'Webside',
          ],
        },
      ],
    },
    dommeransvarlig: {
      title: 'Dommeransvarlig',
      icon: <GiWhistle size={24} />,
      members: [
        {
          name: 'Filippa My Lindgren',
          role: 'Dommeransvarlig',
          email: 'filippamy08@icloud.com',
          phone: 95013931,
          responsibilities: ['Dommeransvarlig'],
        },
        {
          name: 'Bent Rode-Christoffersen',
          role: 'Dommerkontakt',
          email: 'bent.rode.christoffersen@gmail.com',
          phone: 90969435,
          responsibilities: ['Dommerkontakt'],
        },
      ],
    },
  };

  // Render a member card
  const renderMemberCard = (member: Member, index: number) => {
    return (
      <div
        key={index}
        className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 h-full flex flex-col"
      >
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-kilsvart text-sm mb-1 font-anton">
              {member.name}
            </h4>
            <p className="text-gray-600 text-xs mb-3 font-roboto">{member.role}</p>
            
            <div className="flex items-center text-xs mb-1">
              <Mail className="w-3 h-3 mr-1 text-kilred" />
              <a 
                href={`mailto:${member.email}`}
                className="text-kilsvart-600 hover:text-kilsvart-800 hover:underline transition-colors break-all"
              >
                {member.email}
              </a>
            </div>
            
            <div className="flex items-center text-xs">
              <Phone className="w-3 h-3 mr-1 text-kilred" />
              <a 
                href={`tel:+47${member.phone}`}
                className="text-kilsvart-500 hover:text-svart-700 hover:underline transition-colors"
              >
                {member.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h5 className="text-sm font-semibold text-gray-700 mb-2 font-anton">
            Ansvarsområder:
          </h5>
          <div className="max-h-36 overflow-y-auto">
            <ul className="space-y-1">
              {member.responsibilities.map((resp, idx) => (
                <li
                  key={idx}
                  className="text-xs text-gray-600 flex items-start font-roboto"
                >
                  <span className="w-1.5 h-1.5 bg-kilred rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Render a section of the org chart
  const renderSection = (data: OrganizationSection) => {
    return (
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <div className="text-kilred mr-3">
            {data.icon}
          </div>
          <h2 className="text-xl sm:text-2xl font-anton font-bold text-kilsvart">
            {data.title}
          </h2>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.members.map(renderMemberCard)}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-anton-4xl md:text-anton-5xl font-anton text-kilsvart mb-4"
        >
          Organisasjonskart
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-kilsvart mx-auto mb-6"
        ></motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg text-gray-600 font-roboto max-w-2xl mx-auto"
        >
          <span className='text-balance hyphens-auto'>
           Her finner du oversikt over klubbens organisasjon med kontaktinformasjon og ansvarsområder. 
           Klikk på personen for å se vedkommendes ansvarsområder.
            
          </span>
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-4 md:px-6">        

        {/* Organization chart sections */}
        <div className="space-y-8">
          {renderSection(organisasjon.hovedStyre)}
          {renderSection(organisasjon.sportsligUtvalg)}
          {renderSection(organisasjon.dommeransvarlig)}
        </div>
      </div>
      </div>
    </div>
  );
}

export default OrganisasjonsKart;