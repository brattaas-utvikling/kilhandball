import { useState } from 'react';
import {
  User,
  ChevronDown,
  ChevronRight,
  Mail,
  CircleUserRound,
  Volleyball,
  Phone,
} from 'lucide-react';
import { GiWhistle } from 'react-icons/gi';
import { ExpandedSections } from '../../../types/ExpandedSections';
import { OrganizationData } from '../../../types/OrganizationData';

import { OrganizationSection } from '../../../types/OrganizationSection';
import { Member } from '../../../types/member';

function KlubbKontakt() {
  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    styre: false,
    sportslig: false,
    dommer: false,
  });

  // Toggle section expansion
  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Mock organization data
  const organisasjon: OrganizationData = {
    hovedStyre: {
      title: 'Styret',
      icon: <CircleUserRound size={24} />,
      members: [
        {
          name: 'Bent Rode-Christoffersen',
          role: 'Styreleder',
          email: 'bent.rode.christoffersen@gmail.com',
          phone: 90969435,
        },
        {
          name: 'Vidar Svartkjønnli',
          role: 'Nestleder',
          email: 'darwin73@live.no',
          phone: 92201316,
        },
        {
          name: 'Svein Thorstensen',
          role: 'Styremedlem',
          email: 'sveinthorstensen50@gmail.com',
          phone: 91185490,
        },
        {
          name: 'Elin Maria Vendela Skoglund',
          role: 'Styremedlem',
          email: 'elinskoglund83@gmail.com',
          phone: 91788617,
        },
        {
          name: 'Erik Seigerud',
          role: 'Nestleder',
          email: 'erse@omfjeld.no',
          phone: 92097978,
        },
        {
          name: 'Bjørn Erik Johnsen',
          role: 'Styremedlem',
          email: 'berikj@online.no',
          phone: 90728194,
        },
        {
          name: 'Linda skarstad ',
          role: 'Styremedlem',
          email: 'linda@skarstadgartneri.no',
          phone: 41500585,
        },
        {
          name: 'Hanne Fiskerud ',
          role: 'Styremedlem',
          email: 'hanne.fiskerud@gmail.com',
          phone: 97584371,
        },
      ],
    },
    sportsligUtvalg: {
      title: 'Sportslig Utvalg',
      icon: <Volleyball size={24} />,
      members: [
        {
          name: 'Erik Elseth',
          role: 'Sportslig Leder',
          email: 'erik.elseth@gmail.com',
          phone: 90667312,
        },
        {
          name: 'Sara Bourne Holtet',
          role: 'Sportslig Utvalg',
          email: 'sarah_bourne6@hotmail.com',
          phone: 91158686,
        },
        {
          name: 'Charlotte Egnersson',
          role: 'Sportslig Utvalg',
          email: 'charlotteproeven@hotmail.com',
          phone: 41351166,
        },
        {
          name: 'Jon Are Haveråen-Brattås',
          role: 'Sprotslig Utvalg',
          email: 'jon.are.br@gmail.com',
          phone: 91607759,
        },
      ],
    },
    dommeransvarlig: {
      title: 'Dommeransvarlig',
      icon: <GiWhistle size={24} />,
      members: [
        {
          name: 'Ingvald Moe Gimse',
          role: 'Dommeransvarlig',
          email: 'Ingvald.Moe.gimse@gmail.com',
          phone: 90252766,
        },
        {
          name: 'Bent Rode-Christoffersen',
          role: 'Dommerkontakt',
          email: 'bent.rode.christoffersen@gmail.com',
          phone: 90969435,
        },
      ],
    },
  };

  // Render a member card
  const renderMemberCard = (member: Member, index: number) => (
    <div
      key={index}
      className="bg-white shadow-[2px_3px_4.5px_rgba(0,0,0,0.25)] rounded-lg p-4 flex flex-col hover:bg-gray-50 transition-all"
    >
      <div className="flex items-center mb-2">
        <div className="bg-gray-100 p-2 rounded-full">
          <User size={20} className="text-kilred" />
        </div>
        <div className="ml-3">
          <h4 className="text-body-medium-mobile md:text-body-medium-desktop font-medium text-kilsvart">
            {member.name}
          </h4>
          <p className="text-sm text-gray-600">{member.role}</p>
        </div>
      </div>
      <a
        href={`mailto:${member.email}`}
        className="text-sm text-gray-500 mt-auto flex items-center break-all"
      >
        <Mail size={14} className="mr-1 flex-shrink-0 text-kilred" />{' '}
        {member.email}
      </a>
      <a
        href={`tel:${member.phone}`}
        className="text-sm text-gray-500 mt-auto flex items-center"
      >
        <Phone size={14} className="mr-1 text-kilred" /> {member.phone}
      </a>
    </div>
  );

  // Render a section of the org chart
  const renderSection = (
    key: keyof ExpandedSections,
    data: OrganizationSection
  ) => {
    const isExpanded = expandedSections[key];

    return (
      <div className="mb-6">
        <button
          onClick={() => toggleSection(key)}
          className="w-full flex items-center justify-between gap-4 px-4 py-6 bg-white rounded-lg shadow-[2px_3px_4.5px_rgba(0,0,0,0.25)] hover:bg-gray-100 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="text-xl text-kilred">{data.icon}</div>
            <div className="text-left">
              <h3 className="text-body-large-mobile md:text-body-large-desktop font-medium mb-2 text-kilsvart">
                {data.title}
              </h3>
              <p className="text-body-medium-mobile md:text-body-medium-desktop text-gray-600 font-light hidden sm:block">
                Klikk for å se medlemmer
              </p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="text-gray-400" />
          ) : (
            <ChevronRight className="text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-auto-fit">
            {data.members.map(renderMemberCard)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white pb-12">
      {/* Organization chart sections */}
      <div className="grid grid-cols-1 md:grid-cols-auto-fit gap-6">
        {renderSection('styre', organisasjon.hovedStyre)}
        {renderSection('sportslig', organisasjon.sportsligUtvalg)}
        {renderSection('dommer', organisasjon.dommeransvarlig)}
      </div>
    </div>
  );
}

export default KlubbKontakt;
