import { Link } from 'react-router-dom';
import ClubManagement from './ClubManagment';



function Klubbdrift() {
  return (
    <div className="container mx-auto pb-12">
      <div className="my-6">
        <Link
          to="/praktisk-info"
          className="text-kilred hover:underline flex items-center"
        >
          ← Tilbake til praktisk info
        </Link>
      </div>
      <ClubManagement />
    </div>
  );
}

export default Klubbdrift;
