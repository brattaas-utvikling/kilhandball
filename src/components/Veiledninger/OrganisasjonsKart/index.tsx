import { Link } from 'react-router-dom';
import OrganisasjonsKart from './OrganisasjonsKart';

;



function OrgKart() {
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
      <OrganisasjonsKart />
    </div>
  );
}

export default OrgKart;
