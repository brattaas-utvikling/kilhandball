import React from 'react';
import { Download } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  pdfTitle?: string;
}

const SimplePDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, pdfTitle = 'dokument' }) => {
  // Funksjon for å laste ned PDF-en
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${pdfTitle}.pdf`;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl mb-4 flex justify-end">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-kilblue text-white rounded flex items-center gap-2 hover:bg-kildarkblue transition-colors duration-300"
          aria-label="Last ned PDF"
        >
          <Download size={18} />
          <span>Last ned PDF</span>
        </button>
      </div>

      <div className="w-full max-w-4xl h-screen border border-gray-300 rounded shadow-lg">
        <iframe 
          src={pdfUrl} 
          title="PDF Viewer"
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
      
      {/* Melding for mobilbrukere */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm md:hidden">
        <p>Problemer med å vise PDF-en? Bruk nedlastningsknappen over for å åpne dokumentet direkte på enheten din.</p>
      </div>
    </div>
  );
};

export default SimplePDFViewer;