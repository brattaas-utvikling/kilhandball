import { useState } from 'react';
import {
  Users,
  User,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  Volleyball,
} from 'lucide-react';
import { GiWhistle } from 'react-icons/gi';
import { Link } from 'react-router-dom';

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
  // State for expanded member details
  const [expandedMembers, setExpandedMembers] = useState<{
    [key: string]: boolean;
  }>({});

  // Toggle member details expansion - close others when opening one
  const toggleMemberDetails = (memberName: string) => {
    setExpandedMembers((prev) => {
      const wasPreviouslyExpanded = prev[memberName];

      // Start with all closed
      const newState: { [key: string]: boolean } = {};

      // If this one wasn't already open, open it (otherwise all stay closed)
      if (!wasPreviouslyExpanded) {
        newState[memberName] = true;
      }

      return newState;
    });
  };

  // Mock organization data with responsibilities
  const organisasjon: OrganizationData = {
    hovedStyre: {
      title: 'Hovedstyre',
      icon: <Users size={24} />,
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
          name: 'Linda skarstad ',
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
          name: 'Hanne Fiskerud ',
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
      icon: <Volleyball size={24} />,
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
          name: 'Sara Bourne Holtet',
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
          name: 'Ingvald Moe Gimse',
          role: 'Dommeransvarlig',
          email: 'Ingvald.Moe.gimse@gmail.com',
          phone: 90252766,
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
    const isExpanded = expandedMembers[member.name] || false;

    return (
      <div
        key={index}
        className="bg-white shadow-[2px_3px_4.5px_rgba(0,0,0,0.25)] rounded-lg overflow-hidden"
      >
        <button
          onClick={() => toggleMemberDetails(member.name)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-all text-left"
        >
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full">
              <User size={20} className="text-kilred" />
            </div>
            <div className="ml-3">
              <h4 className="text-body-medium-mobile md:text-body-medium-desktop font-semibold font-anton text-kilsvart">
                {member.name}
              </h4>
              <div className="flex items-center font-roboto">
                <p className="text-sm text-gray-600 mb-2">{member.role}</p>
              </div>
              <div className="">
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-gray-500 mt-auto flex items-center break-all mb-1 font-roboto"
                >
                  <Mail size={14} className="mr-1 flex-shrink-0 text-kilred" />{' '}
                  {member.email}
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="text-sm text-gray-500 mt-auto flex items-center font-roboto"
                >
                  <Phone size={14} className="mr-1 text-kilred" />{' '}
                  {member.phone}
                </a>
              </div>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="text-gray-400" />
          ) : (
            <ChevronRight className="text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <h5 className="text-sm font-medium text-gray-700 mb-2">
              Ansvarsområder:
            </h5>
            <ul className="space-y-1">
              {member.responsibilities.map((resp, idx) => (
                <li
                  key={idx}
                  className="text-sm text-gray-600 flex items-start"
                >
                  <span className="text-kilred mr-2 mt-1">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Render a section of the org chart
  const renderSection = (data: OrganizationSection) => {
    return (
      <div className="mb-10">
        <div className="w-full mb-4 font-anton">
          <h2 className="text-2xl font-semibold text-kilsvart inline-flex items-center border-b-2 border-kilred pb-2">
            {data.icon && <span className="text-kilred mr-3">{data.icon}</span>}
            {data.title}
          </h2>
        </div>

        <div className="mt-4 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.members.map(renderMemberCard)}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-white pb-12">
        <div className="my-6">
        <Link
          to="/praktisk-info"
          className="text-kilred hover:underline flex items-center"
        >
          ← Tilbake til praktisk info
        </Link>
      </div>
      {/* Header */}
      <div className="text-kilsvart pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold font-anton">Organisasjonskart</h1>
          <p className='text-normal text-gray-600 mt-2 font-roboto'>KIL Håndball</p>
        </div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 mt-8 md:mt-12">
        {/* Kort introduksjon */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 font-roboto">
            Her finner du oversikt over klubbens organisasjon med
            kontaktinformasjon og ansvarsområder. Klikk på personen for å se
            vedkommendes ansvarsområder.
          </p>
        </div>

        {/* Organization chart sections */}
        <div className="grid grid-cols-1 gap-6">
          {renderSection(organisasjon.hovedStyre)}
          {renderSection(organisasjon.sportsligUtvalg)}
          {renderSection(organisasjon.dommeransvarlig)}
        </div>
      </div>
    </div>
  );
}

export default OrganisasjonsKart;
