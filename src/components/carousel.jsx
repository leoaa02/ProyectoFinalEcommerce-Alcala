import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Carousel = () => {
        return (
        <div className="mt-24 w-100 h-300 relative z-30 h-64 ml-25 justify-center items-center">
        <Swiper 
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: false }}
        
    >
        <SwiperSlide>
        <img src="src/assets/auris.jpg" alt="auriculares" className="w-full h-full object-cover" />
        </SwiperSlide>

        <SwiperSlide>
        <img src="src/assets/telefono.jpg" alt="telefono" className="w-full h-full object-cover" />
        </SwiperSlide>

        <SwiperSlide>
        <img src="src/assets/desktop.avif" alt="Imagen 3" className="w-full h-full object-cover" />
        </SwiperSlide>
        </Swiper>
        </div>
);
};

export default Carousel;
