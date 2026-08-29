import { Link } from 'react-router-dom';
import Hjemmearrangement2Divisjon from './Hjemmearrangement2Divisjon';



function div2Arr() {
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
      <Hjemmearrangement2Divisjon />
    </div>
  );
}

export default div2Arr;
