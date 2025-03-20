import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
}

const SimplePDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl h-screen border border-gray-300 rounded shadow-lg">
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default SimplePDFViewer;
