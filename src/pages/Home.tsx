import Sponsorer from '../components/Sponsorer';
import { HeroSection } from '../components/HeroSection';
import HomepageNews from '../components/HomepageNews';
import Aarsmoete from '../components/Aarsmoete';
// import KommendeKamper from '../components/KommendeKamper';
import { Aarsmoete2026 } from '@/components/Aarsmoete2026';
import { SaksagendaBanner } from '@/components/SaksagendaBanner';
import RullestolSeksjon from '@/components/RullestolSeksjon';
import { Handballskole2026 } from '@/components/Handballskole2026';
import { KickOff2026 } from '@/components/KickOff2026';

function Home() {
  

  return (
    <>
        <div className="flex flex-col items-center justify-center">
          <HeroSection />
          <KickOff2026 />
          <Handballskole2026 />
          <RullestolSeksjon />
          <SaksagendaBanner />
          <Aarsmoete2026 />
          {/* <KommendeKamper /> */}
          <HomepageNews />
          <Aarsmoete />
          <Sponsorer />
        </div>
    </>
  );
}

export default Home;
