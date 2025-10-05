import Herrelag from '../assets/herrelag.webp';
import Kasese from '../assets/kasese.webp';
import Rullestol from '../assets/rullestol_handball.webp';
import KastBallen from '../assets/kast_ballen.jpg';
import Damelag from '../assets/damelag.webp';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import TrastadhallenKamper from './TrastadhallenKamper';

export function HeroSection() {
  const images = [Herrelag, Kasese, Rullestol, Damelag, KastBallen];

  return (
    <section className="bg-gradient-to-b from-kilred to-kilred/70 overflow-hidden mb-32 -mx-[calc((100vw-100%)/2)] w-screen relative">
      {/* Main content container */}
      <div className="mx-auto  py-12  w-11/12 max-w-7xl ">
        <div className="grid sm:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center text-white text-clip text-balance order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 uppercase">
              Velkommen til <br />
              Kongsvinger IL Håndball
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md mb-8">
              Kongsvinger Idrettslag, med en stolt historie som strekker seg
              tilbake til 1892, er mer enn bare en idrettsklubb; det er et
              fellesskap som binder sammen generasjoner av idrettsentusiaster i
              Kongsvinger kommune.
            </p>
            <div className="mt-4">
              <div className="flex flex-wrap gap-4 pt-2 text-sm text-white/30">
                <TrastadhallenKamper />
              </div>
            </div>
          </div>

          {/* Right side - Carousel */}
          <div className="w-full h-[400px] md:h-[600px] overflow-hidden rounded-lg order-2">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass:
                  'swiper-pagination-bullet bg-white/50 w-2 h-2 inline-block rounded-full mx-1 cursor-pointer',
                bulletActiveClass: 'swiper-pagination-bullet-active bg-white',
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="w-full h-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="w-full h-full">
                  <img
                    src={image || 'https://placehold.co/600x400'}
                    alt={`Handball action ${index + 1}`}
                    className="w-full h-full object-cover object-center rounded-md md:rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Triangle shape at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}
      ></div>
    </section>
  );
}
