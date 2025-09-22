import { Link } from 'react-router-dom';
import RullestolHandball from './RullestolHandball';




function Rullestol() {
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
      <RullestolHandball />
    </div>
  );
}

export default Rullestol;
