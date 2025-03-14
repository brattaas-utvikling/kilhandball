import { Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import PraktiskInfo from './components/PraktiskInfo';
import Hjemmearrangement from './components/Veiledninger/Hjemmearrangement';
import HandballLive from './components/Veiledninger/HandballLive';
import Dommer from './components/Veiledninger/Dommer';
import Rullestol from './components/Veiledninger/Rullestol';
import Sportslig from './components/Veiledninger/Sportslig';
import Klubbdrift from './components/Veiledninger/Klubbdrift';


function App() {
  return (
    <div className="text-black">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/om-oss" element={<About />} />
          <Route path="/praktisk-info" element={<PraktiskInfo />} />
          <Route path="/praktisk-info/hjemmearrangement" element={<Hjemmearrangement />} />
          <Route path="/praktisk-info/handball-live" element={<HandballLive />} />
          <Route path="/praktisk-info/dommer" element={<Dommer />} />
          <Route path="/praktisk-info/rullestolhandball" element={<Rullestol />} />
          <Route path="/praktisk-info/sportslig" element={<Sportslig />} />
          <Route path="/praktisk-info/klubbdrift" element={<Klubbdrift />} />
          <Route path="/kontakt" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;