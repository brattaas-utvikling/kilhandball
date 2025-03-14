import KommerSnart from "../../KommerSnart";
import { Link } from "react-router-dom";

function Sportslig() {
    return (
    <div className="container mx-auto pb-12">
        <div className="mb-6">
            <Link to="/praktisk-info" className="text-kilred hover:underline flex items-center">
                ← Tilbake til praktisk info
            </Link>
        </div>
        <KommerSnart />
    </div>
)
}

export default Sportslig;