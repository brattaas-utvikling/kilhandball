import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Bytt ut med dine faktiske Appwrite-bilde-URLer
const images = [
  'https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/Rullestol1/view?project=68a9f0da0014cb9bd6ad&mode=admin',
  'https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/Rullestol2/view?project=68a9f0da0014cb9bd6ad&mode=admin',
  'https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/Rullestol3/view?project=68a9f0da0014cb9bd6ad&mode=admin',
  'https://fra.cloud.appwrite.io/v1/storage/buckets/68bd6c630003e8e8b879/files/Rullestol4/view?project=68a9f0da0014cb9bd6ad&mode=admin',
];

export default function RullestolSeksjon() {
  return (
    <section className="py-16 mb-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto"
        >
          {/* Left - Swiper karusell */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
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
              {images.map((src, index) => (
                <SwiperSlide key={index} className="w-full h-full">
                  <img
                    src={src}
                    alt={`Rullestolhåndball KIL ${index + 1}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600 font-roboto">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>2026</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>KIL Håndball</span>
              </div>
            </div>

            {/* Tittel */}
            <h3 className="font-anton text-2xl md:text-3xl text-kilsvart tracking-wide">
              RULLESTOLHÅNDBALL I KIL
            </h3>

            {/* Ingress */}
            <p className="text-kilred font-roboto text-base md:text-lg font-semibold">
              KIL Håndball tilbyr rullestolhåndball — noe for alle!
            </p>

            {/* Brødtekst */}
            <div className="text-gray-700 font-roboto leading-relaxed space-y-4 text-sm md:text-base">
              <p>
                Sist uke var J16 med på en økt. Det ble mye latter, mestring og god stemning i hallen.
              </p>
              <p>
                Vi ønsker flere lag med neste sesong. Ta med laget ditt og prøv.
              </p>
            </div>

            {/* Lenker */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/kontakt"
                className="inline-flex items-center gap-2 px-6 py-3 bg-kilred hover:bg-kilred/90 text-white font-roboto font-semibold rounded-lg transition-colors duration-200 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred"
              >
                Ta kontakt
              </a>
              <a
                href="/praktisk-info/rullestolhandball"
                className="inline-flex items-center gap-1.5 text-sm font-roboto font-medium text-kilred hover:text-kilred/80 underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kilred"
              >
                Les mer om rullestolhåndball →
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}