import { Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import PraktiskInfo from './pages/PraktiskInfo';
import Hjemmearrangement from './components/Veiledninger/Hjemmearrangement';
import HandballLive from './components/Veiledninger/HandballLive';
import Dommer from './components/Veiledninger/Dommer';
import Rullestol from './components/Veiledninger/Rullestol';
import Sportslig from './components/Veiledninger/Sportslig';
import Klubbdrift from './components/Veiledninger/Klubbdrift';
import PDFViewerPage from './components/PDFViewerPage';
import OrganisasjonsKart from './components/Veiledninger/OrganisasjonsKart';
import ErrorPage from './components/ErrorPage';
import Treningsoversikt from './pages/Treningsoversikt';
import Kamper from './components/Kamper';
// import Nyheter from './pages/Nyheter';
import NyheterArtikkel from './pages/NyheterArtikkel';
import Lag from './pages/Lag';
import BarnehandballKomponent from './components/Veiledninger/BarnehandballArrangement';
import Utviklingstrappa from './components/Veiledninger/Utviklingstrappa/Utviklingstrappa';

function App() {
  return (
    <div className="text-black">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pdf/view" element={<PDFViewerPage />} />
          {/* <Route path='/nyheter' element={<Nyheter />} /> */}
          <Route
          path="/nyheter/:id"
          element={<NyheterArtikkel />}
          />
          <Route path="/om-oss" element={<About />} />
          <Route path="/kamper" element={<Kamper />} />
          <Route path="/lag" element={<Lag />} />
          <Route path="/treningstider" element={<Treningsoversikt />} />
          <Route path="/praktisk-info" element={<PraktiskInfo />} />
          <Route
            path="/praktisk-info/hjemmearrangement"
            element={<Hjemmearrangement />}
          />
          <Route
            path="/praktisk-info/barnehandballarrangement"
            element={<BarnehandballKomponent />}
          />
          <Route
            path="/praktisk-info/handball-live"
            element={<HandballLive />}
          />
          <Route
            path="/praktisk-info/organisasjonskart"
            element={<OrganisasjonsKart />}
          />
          <Route path="/praktisk-info/dommer" element={<Dommer />} />
          <Route
            path="/praktisk-info/rullestolhandball"
            element={<Rullestol />}
          />
          <Route path="/praktisk-info/sportslig" element={<Sportslig />} />
          <Route path="/praktisk-info/utviklingstrappa" element={<Utviklingstrappa />} />
          <Route path="/praktisk-info/klubbdrift" element={<Klubbdrift />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
