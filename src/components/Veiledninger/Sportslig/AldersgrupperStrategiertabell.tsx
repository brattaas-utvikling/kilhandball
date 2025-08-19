
const AldersgrupperStrategiertabell = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Desktop View */}
        <div className="hidden md:block">
          {/* Header */}
          <div className="grid grid-cols-2 bg-kilred text-white">
            <div className="p-4">
              <h3 className="font-bold text-lg">Aldersgrupper</h3>
            </div>
            <div className="p-4 border-l border-white">
              <h3 className="font-bold text-lg">Strategier</h3>
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-2 min-h-[400px]">
            {/* Left Column - Aldersgrupper */}
            <div className="bg-gray-50 border-r border-gray-300">
              {/* 6-12 år */}
              <div className="p-4 border-b border-gray-300">
                <div className="space-y-3">
                  <div className="font-bold text-kilsvart text-base">6-12 år:</div>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    Minimum 3 sosiale tiltak pr. år som ikke er håndball. Deltagelse på arrangement som klubben organiserer
                  </div>
                </div>
              </div>
              
              {/* 13-20 år */}
              <div className="p-4">
                <div className="space-y-3">
                  <div className="font-bold text-kilsvart text-base">13-20 år:</div>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    Minimum 3 sosiale tiltak pr år som ikke er håndball. Organisere felles treningssamlinger.
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Strategier */}
            <div className="bg-white p-4">
              <div className="space-y-2 text-sm leading-relaxed text-gray-700">
                <p>Krav til foresatte om å delta</p>
                <p>Sosialt ansvarlig på hvert lag (forelder).</p>
                <p>Skape gode LAGMILJØ.</p>
                <p>Trygghet, tilhørighet, likeverd.</p>
                <p>Skape ett lagsmiljø, uavhengig av hvilket nivå de spiller på</p>
                <p>Unngå klikker.</p>
                <p>Laget og trenerne skal være en trygg havn for alle spillerne.</p>
                <p>Regler for hvilken oppførsel som er akseptabel og konsekvenser for å bryte reglene innad i laget.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="bg-kilred text-white p-4">
            <h3 className="font-bold text-lg text-center">Aldersgrupper og Strategier</h3>
          </div>
          
          <div className="space-y-6">
            {/* 6-12 år */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-kilred text-lg mb-3">6-12 år</h4>
              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Minimum 3 sosiale tiltak pr. år som ikke er håndball. Deltagelse på arrangement som klubben organiserer
                </p>
              </div>
              <h4 className="font-bold text-kilred text-lg mb-3">13-20 år</h4>
              <div className="mb-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  Minimum 3 sosiale tiltak pr år som ikke er håndball. Organisere felles treningssamlinger.
                </p>
              </div>
              
              <div className="border-t border-gray-300 pt-3">
                <h5 className="font-bold text-kilsvart mb-2">Strategier:</h5>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• Krav til foresatte om å delta</p>
                  <p>• Sosialt ansvarlig på hvert lag (forelder)</p>
                  <p>• Skape gode LAGMILJØ</p>
                  <p>• Trygghet, tilhørighet, likeverd</p>
                  <p>• Skape ett lagsmiljø, uavhengig av hvilket nivå de spiller på</p>
                  <p>• Unngå klikker</p>
                  <p>• Laget og trenerne skal være en trygg havn for alle spillerne</p>
                  <p>• Regler for hvilken oppførsel som er akseptabel og konsekvenser for å bryte reglene innad i laget</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AldersgrupperStrategiertabell;