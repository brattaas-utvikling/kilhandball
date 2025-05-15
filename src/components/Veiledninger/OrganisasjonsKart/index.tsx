import { useState } from 'react';
import { Users, User, Trophy, Briefcase, ShoppingCart, ChevronDown, ChevronRight, Mail } from 'lucide-react';

// Define types for the component
type Responsibility = string;

type Member = {
  name: string;
  role: string;
  email: string;
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
  arrangementskomite: OrganizationSection;
  okonomi: OrganizationSection;
  kommunikasjon: OrganizationSection;
};

function OrganisasjonsKart() {
  // State for expanded member details
  const [expandedMembers, setExpandedMembers] = useState<{[key: string]: boolean}>({});

  // Toggle member details expansion - close others when opening one
  const toggleMemberDetails = (memberName: string) => {
    setExpandedMembers(prev => {
      const wasPreviouslyExpanded = prev[memberName];
      
      // Start with all closed
      const newState: {[key: string]: boolean} = {};
      
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
      title: "Hovedstyre",
      icon: <Users size={24} />,
      members: [
        { 
          name: "Lisa Hansen", 
          role: "Styreleder", 
          email: "styreleder@kilhandball.no",
          responsibilities: [
            "Kontrakter for lag over J/G14",
            "Learn Handball",
            "Dommeransvar",
            "Overordnet klubbansvar",
            "Kontakt med idrettsrådet",
            "Årsmøte"
          ]
        },
        { 
          name: "Anders Johansen", 
          role: "Nestleder", 
          email: "nestleder@kilhandball.no",
          responsibilities: [
            "Kontakt med region og forbund",
            "Hallfordeling",
            "Politiattester",
            "Klubbhåndbok"
          ]
        },
        { 
          name: "Kari Olsen", 
          role: "Styremedlem", 
          email: "styremedlem1@kilhandball.no",
          responsibilities: [
            "Rekruttering",
            "Dugnadskoordinering",
            "Fair Play ansvarlig",
            "Kontakt med barnehager og skoler"
          ]
        },
        { 
          name: "Petter Nilsen", 
          role: "Styremedlem", 
          email: "styremedlem2@kilhandball.no",
          responsibilities: [
            "Materiellansvarlig",
            "Klubbtøy og utstyr",
            "Sponsor oppfølging",
            "Laglederlisenser"
          ]
        }
      ]
    },
    sportsligUtvalg: {
      title: "Sportslig Utvalg",
      icon: <Trophy size={24} />,
      members: [
        { 
          name: "Nina Berg", 
          role: "Sportslig Leder", 
          email: "sportslig@kilhandball.no",
          responsibilities: [
            "Sportslig plan",
            "Trenerforum",
            "Trenerkurs",
            "Talentutvikling",
            "Hospitering mellom lag"
          ]
        },
        { 
          name: "Thomas Larsen", 
          role: "Trenerkoordinator", 
          email: "trener@kilhandball.no",
          responsibilities: [
            "Rekruttering av trenere",
            "Oppfølging av trenere",
            "Mentorordning",
            "Treningsplaner"
          ]
        },
        { 
          name: "Marte Svendsen", 
          role: "Spillerutvikler", 
          email: "utvikling@kilhandball.no",
          responsibilities: [
            "Spillerutviklingstiltak",
            "Regionale samlinger",
            "Koordinering med kretslag",
            "Fadderordning for yngre spillere"
          ]
        }
      ]
    },
    arrangementskomite: {
      title: "Arrangementskomité",
      icon: <ShoppingCart size={24} />,
      members: [
        { 
          name: "Ole Kristiansen", 
          role: "Arrangementsleder", 
          email: "arrangement@kilhandball.no",
          responsibilities: [
            "Hjemmekamper",
            "Turneringer",
            "Publikumsarrangementer",
            "Vaktlister",
            "Koordinering med hall"
          ]
        },
        { 
          name: "Anna Bakken", 
          role: "Kioskansvarlig", 
          email: "kiosk@kilhandball.no",
          responsibilities: [
            "Kioskdrift",
            "Innkjøp",
            "Kasseoppgjør",
            "Kioskbemanning",
            "Matkonsept"
          ]
        },
        { 
          name: "Jon Dahl", 
          role: "Dommeransvarlig", 
          email: "dommer@kilhandball.no",
          responsibilities: [
            "Dommerutvikling",
            "Dommerkurs",
            "Dommeroppsett",
            "Dommeroppfølging"
          ]
        }
      ]
    },
    okonomi: {
      title: "Økonomi",
      icon: <Briefcase size={24} />,
      members: [
        { 
          name: "Hege Pedersen", 
          role: "Økonomiansvarlig", 
          email: "okonomi@kilhandball.no",
          responsibilities: [
            "Budsjett",
            "Regnskap",
            "Økonomistyring",
            "Rapportering",
            "Tilskudd og støtteordninger"
          ]
        },
        { 
          name: "Fredrik Andersen", 
          role: "Kasserer", 
          email: "kasserer@kilhandball.no",
          responsibilities: [
            "Fakturering",
            "Medlemskontingent",
            "Treningsavgift",
            "Betaling av regninger",
            "Lagkasser"
          ]
        }
      ]
    },
    kommunikasjon: {
      title: "Kommunikasjon",
      icon: <Mail size={24} />,
      members: [
        { 
          name: "Silje Eriksen", 
          role: "Kommunikasjonsansvarlig", 
          email: "kommunikasjon@kilhandball.no",
          responsibilities: [
            "Intern kommunikasjon",
            "Ekstern kommunikasjon",
            "Presseansvarlig",
            "Nyhetsbrev",
            "Kommunikasjonsstrategi"
          ]
        },
        { 
          name: "Martin Haugen", 
          role: "Web og Sosiale Medier", 
          email: "web@kilhandball.no",
          responsibilities: [
            "Nettside",
            "Facebook",
            "Instagram",
            "Kamprapportering",
            "Bildepublisering",
            "Grafisk profil"
          ]
        }
      ]
    }
  };

  // Render responsibilities list - Removed since it is not used

  // Render a member card
  const renderMemberCard = (member: Member, index: number) => {
    const isExpanded = expandedMembers[member.name] || false;
    
    return (
      <div key={index} className="bg-white shadow-[2px_3px_4.5px_rgba(0,0,0,0.25)] rounded-lg overflow-hidden">
        <button 
          onClick={() => toggleMemberDetails(member.name)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-all text-left"
        >
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-full">
              <User size={20} className="text-kilred" />
            </div>
            <div className="ml-3">
              <h4 className="text-body-medium-mobile md:text-body-medium-desktop font-medium text-kilsvart">{member.name}</h4>
              <div className="flex items-center">
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-500 ml-3 flex items-center">
                  <Mail size={14} className="mr-1" /> {member.email}
                </p>
              </div>
            </div>
          </div>
          {isExpanded ? 
            <ChevronDown className="text-gray-400" /> : 
            <ChevronRight className="text-gray-400" />
          }
        </button>
        
        {isExpanded && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Ansvarsområder:</h5>
            <ul className="space-y-1">
              {member.responsibilities.map((resp, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
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
        <div className="w-full mb-4">
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
      {/* Header */}
      <div className="bg-kilsvart text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">Organisasjonskart</h1>
          <p className="mt-2">KIL Håndball</p>
        </div>
      </div>

      {/* Main content container */}
      <div className="container mx-auto px-4 mt-8 md:mt-12">
        {/* Kort introduksjon */}
        <div className="mb-8">
          <p className="text-lg text-gray-700">
            Her finner du oversikt over klubbens organisasjon med kontaktinformasjon og ansvarsområder.
            Klikk på personen for å se vedkommendes ansvarsområder.
          </p>
        </div>

        {/* Organization chart sections */}
        <div className="grid grid-cols-1 gap-6">
          {renderSection(organisasjon.hovedStyre)}
          {renderSection(organisasjon.sportsligUtvalg)}
          {renderSection(organisasjon.arrangementskomite)}
          {renderSection(organisasjon.okonomi)}
          {renderSection(organisasjon.kommunikasjon)}
        </div>
      </div>
    </div>
  );
}

export default OrganisasjonsKart;