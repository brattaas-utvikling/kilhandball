import Sponsorer from '../components/Sponsorer';
import { HeroSection } from '../components/HeroSection';
import HomepageNews from '../components/HomepageNews';
import Aarsmoete from '../components/Aarsmoete';

function Home() {
  

  return (
    <>
        <div className="flex flex-col items-center justify-center">
          <HeroSection />
          <HomepageNews />
          <Aarsmoete />
          <Sponsorer />
        </div>
    </>
  );
}

export default Home;
