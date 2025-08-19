
const Hospiteringstabell = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Desktop View */}
        <div className="hidden sm:block">
          <table className="w-full">
            <thead>
              <tr className="bg-kilred text-white">
                <th className="p-3 text-left font-bold text-sm">Hospitering</th>
                <th className="p-3 text-center font-bold text-sm">6-7 år</th>
                <th className="p-3 text-center font-bold text-sm">8-9 år</th>
                <th className="p-3 text-center font-bold text-sm">10-11 år</th>
                <th className="p-3 text-center font-bold text-sm">12 år</th>
                <th className="p-3 text-center font-bold text-sm">Fra 13 år</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="p-3 font-medium text-gray-900">Hospitering på tvers av kjønn</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Ikke anbefalt</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
              </tr>
              <tr className="bg-white border-b border-gray-200">
                <td className="p-3 font-medium text-gray-900">Hospitering i kamp</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Ikke anbefalt</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-200">
                <td className="p-3 font-medium text-gray-900">Hospitering på tvers av klubber</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-medium text-gray-900">Hospitering opp en aldersklasse</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Nei</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig i særskilte tilfeller</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
                <td className="p-3 text-center text-gray-700">Ja, dersom formålstjenlig</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden">
          <div className="bg-kilred text-white p-4">
            <h3 className="font-bold text-lg text-center">Hospitering</h3>
          </div>
          
          <div className="space-y-4 p-4">
            {/* Hospitering på tvers av kjønn */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-kilred mb-3">Hospitering på tvers av kjønn</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">6-7 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">8-9 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">10-11 år:</span>
                  <span>Ikke anbefalt</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">12 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fra 13 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
              </div>
            </div>

            {/* Hospitering i kamp */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-kilred mb-3">Hospitering i kamp</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">6-7 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">8-9 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">10-11 år:</span>
                  <span>Ikke anbefalt</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">12 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fra 13 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
              </div>
            </div>

            {/* Hospitering på tvers av klubber */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-kilred mb-3">Hospitering på tvers av klubber</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">6-7 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">8-9 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">10-11 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">12 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fra 13 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
              </div>
            </div>

            {/* Hospitering opp en aldersklasse */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-kilred mb-3">Hospitering opp en aldersklasse</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">6-7 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">8-9 år:</span>
                  <span>Nei</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">10-11 år:</span>
                  <span>Ja, dersom formålstjenlig i særskilte tilfeller</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">12 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Fra 13 år:</span>
                  <span>Ja, dersom formålstjenlig</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospiteringstabell;