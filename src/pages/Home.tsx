import Sponsorer from '../components/Sponsorer';
import { HeroSection } from '../components/HeroSection';
import HomepageNews from '../components/HomepageNews';
import Aarsmoete from '../components/Aarsmoete';
// import KommendeKamper from '../components/KommendeKamper';

function Home() {
  

  return (
    <>
        <div className="flex flex-col items-center justify-center">
          <HeroSection />
          {/* <KommendeKamper /> */}
          <HomepageNews />
          <Aarsmoete />
          <Sponsorer />
        </div>
    </>
  );
}

export default Home;
