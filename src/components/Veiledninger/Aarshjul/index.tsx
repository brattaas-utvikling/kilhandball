import { Link } from 'react-router-dom';
import ArshjulHjul from './ArshjulHjul';




function AarhjulIndex() {
  return (
    <div className="container mx-auto">
      <div className="my-6">
        <Link
          to="/praktisk-info"
          className="text-kilred hover:underline flex items-center"
        >
          ← Tilbake til praktisk info
        </Link>
      </div>
      <ArshjulHjul />
    </div>
  );
}

export default AarhjulIndex;
