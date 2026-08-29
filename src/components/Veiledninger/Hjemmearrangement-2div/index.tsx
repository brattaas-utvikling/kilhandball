import { Link } from 'react-router-dom';
import Hjemmearrangement2Divisjon from '../Hjemmearrangement/Hjemmearrangement';
;



function Arr2div() {
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

export default Arr2div;
