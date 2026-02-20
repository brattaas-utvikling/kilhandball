import Sponsorer from '../components/Sponsorer';
import { HeroSection } from '../components/HeroSection';
import HomepageNews from '../components/HomepageNews';
import Aarsmoete from '../components/Aarsmoete';
// import KommendeKamper from '../components/KommendeKamper';
import { Aarsmoete2026 } from '@/components/Aarsmoete2026';

function Home() {
  

  return (
    <>
        <div className="flex flex-col items-center justify-center">
          <HeroSection />
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
