import { useLocation, useNavigate } from 'react-router-dom';
import SimplePDFViewer from './SimplePDFViewer';
import { Link } from 'react-router-dom';

const PDFViewerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pdfUrl, pdfTitle } = location.state || {};

  if (!pdfUrl) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl text-red-600 mb-4">Finner ikke PDF-dokumentet</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          ← Tilbake forsiden
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link to="/" className="text-kilred hover:underline flex items-center">
          ← Tilbake forsiden
        </Link>
      </div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">{pdfTitle || 'PDF Dokument'}</h1>
      </div>

      <SimplePDFViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default PDFViewerPage;
