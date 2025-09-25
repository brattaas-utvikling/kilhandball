import { motion } from 'framer-motion';

const HandballTable = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      >
        {/* Desktop View - 3 Columns */}
        <div className="hidden sm:grid sm:grid-cols-3">
          {/* Column 1 - Barnehåndball 6-8 år */}
          <div className="border-r border-gray-200">
            <div className="bg-kilred text-white p-2 sm:p-3 lg:p-4">
              <h3 className="font-bold text-center text-xs sm:text-sm lg:text-lg whitespace-nowrap">
                <div>Barnehåndball</div>
                <div>6-8 år</div>
              </h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="font-bold text-kilsvart">4-er håndball</div>
              <div className="text-gray-700">Spill 4 mot 4</div>
              <div className="text-gray-700">Minihåndball - banestørrelse 20x12 meter</div>
              <div className="pt-4">
                <div className="font-semibold text-kilsvart mb-2">Ballstørrelse:</div>
                <div className="text-gray-700">00 mykball/Streetball</div>
                <div className="text-gray-700">42-45 cm</div>
              </div>
              <div className="pt-2">
                <div className="text-gray-700">Spilletid: 1 x 15 min</div>
              </div>
              <div className="pt-2">
                <div className="text-gray-700">Inntil 8 spillere pr. kamp</div>
              </div>
            </div>
          </div>

          {/* Column 2 - Barnehåndball 9-10 år */}
          <div className="border-r border-gray-200">
            <div className="bg-kilred text-white p-2 sm:p-3 lg:p-4">
              <h3 className="font-bold text-center text-xs sm:text-sm lg:text-lg whitespace-nowrap">
                <div>Barnehåndball 9</div>
                <div>- 10 år</div>
              </h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="font-bold text-kilsvart">5-er håndball</div>
              <div className="text-gray-700">Spill 5 mot 5 (4 + 1)</div>
              <div className="text-gray-700">Kortbane - banestørrelse ca. 26x20 meter</div>
              <div className="pt-4">
                <div className="font-semibold text-kilsvart mb-2">Ballstørrelse:</div>
                <div className="text-gray-700">9 år - 00 ball</div>
                <div className="text-gray-700">10 år - 0 ball</div>
              </div>
              <div className="pt-2">
                <div className="text-gray-700">Spilletid: 2 x 15 min</div>
              </div>
              <div className="pt-2">
                <div className="text-gray-700">Inntil 10 spillere pr. kamp</div>
              </div>
            </div>
          </div>

          {/* Column 3 - Aktivitetsserie 11 år / Regionsserie 12 år */}
          <div>
            <div className="bg-kilred text-white p-2 sm:p-3 lg:p-4">
              <h3 className="font-bold text-center text-xs sm:text-sm lg:text-lg leading-tight">
                <div className="whitespace-nowrap">Aktivitetsserie 11 år</div>
                <div className="whitespace-nowrap">Regionsserie 12 år</div>
              </h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="font-bold text-kilsvart">6-er håndball</div>
              <div className="text-gray-700">Spill 6 mot 6</div>
              <div className="text-gray-700">
                <div>Ordinær bane, banestørrelse</div>
                <div>40 x 20 meter</div>
              </div>
              <div className="pt-2">
                <div className="text-kilblue font-medium">11 år: Nedsunket tverrligger</div>
                <div className="text-kilblue font-medium">12 år: Ordinære mål</div>
              </div>
              <div className="pt-4">
                <div className="font-semibold text-kilsvart mb-2">Ballstørrelse:</div>
                <div className="text-gray-700">0 ball</div>
              </div>
              <div className="pt-2">
                <div className="text-gray-700">Spilletid: 2 x 20 min</div>
              </div>
              <div className="pt-2">
                <div className="text-gray-700">Inntil 12 spillere pr. kamp</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View - Stacked Cards */}
        <div className="sm:hidden space-y-4">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="border-b border-gray-200 last:border-b-0"
          >
            <div className="bg-kilred text-white p-4">
              <h3 className="font-bold text-center text-lg">Barnehåndball 6-8 år</h3>
            </div>
            <div className="p-4 space-y-3 text-sm bg-gray-50">
              <div className="font-bold text-kilsvart">4-er håndball</div>
              <div className="text-gray-700">Spill 4 mot 4</div>
              <div className="text-gray-700">Minihåndball - banestørrelse 20x12 meter</div>
              <div className="pt-2">
                <div className="font-semibold text-kilsvart">Ballstørrelse:</div>
                <div className="text-gray-700">00 mykball/Streetball, 42-45 cm</div>
              </div>
              <div className="text-gray-700">Spilletid: 1 x 15 min</div>
              <div className="text-gray-700">Inntil 8 spillere pr. kamp</div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border-b border-gray-200 last:border-b-0"
          >
            <div className="bg-kilred text-white p-4">
              <h3 className="font-bold text-center text-lg">Barnehåndball 9 - 10 år</h3>
            </div>
            <div className="p-4 space-y-3 text-sm bg-gray-50">
              <div className="font-bold text-kilsvart">5-er håndball</div>
              <div className="text-gray-700">Spill 5 mot 5 (4 + 1)</div>
              <div className="text-gray-700">Kortbane - banestørrelse ca. 26x20 meter</div>
              <div className="pt-2">
                <div className="font-semibold text-kilsvart">Ballstørrelse:</div>
                <div className="text-gray-700">9 år - 00 ball, 10 år - 0 ball</div>
              </div>
              <div className="text-gray-700">Spilletid: 2 x 15 min</div>
              <div className="text-gray-700">Inntil 10 spillere pr. kamp</div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-kilred text-white p-4">
              <h3 className="font-bold text-center text-lg">
                <div>Aktivitetsserie 11 år</div>
                <div>Regionsserie 12 år</div>
              </h3>
            </div>
            <div className="p-4 space-y-3 text-sm bg-gray-50">
              <div className="font-bold text-kilsvart">6-er håndball</div>
              <div className="text-gray-700">Spill 6 mot 6</div>
              <div className="text-gray-700">Ordinær bane, banestørrelse 40 x 20 meter</div>
              <div className="pt-2">
                <div className="text-kilblue font-medium">11 år: Nedsunket tverrligger</div>
                <div className="text-kilblue font-medium">12 år: Ordinære mål</div>
              </div>
              <div className="pt-2">
                <div className="font-semibold text-kilsvart">Ballstørrelse:</div>
                <div className="text-gray-700">0 ball</div>
              </div>
              <div className="text-gray-700">Spilletid: 2 x 20 min</div>
              <div className="text-gray-700">Inntil 12 spillere pr. kamp</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HandballTable;