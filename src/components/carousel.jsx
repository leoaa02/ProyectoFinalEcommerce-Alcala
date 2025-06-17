import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import computerImg from '../assets/computer.jpg';
import freezerImg from '../assets/freezer.jpg';
import marketImg from '../assets/market.jpg';
import orangeImg from '../assets/orange.jpg';
import toallasImg from '../assets/toallas.jpg';



    const Carousel = () => {
    return (
    <div className="w-full h-50 relative mt-10" style={{ zIndex: 10 }}> 
    <Swiper 
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} 
        slidesPerView={1} 
        breakpoints={{
          768: { 
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        navigation
        pagination={{ clickable: true }} 
        autoplay={{ delay: 1000, disableOnInteraction: false }} 
        loop={true} 
        speed={800} 
        >
    <SwiperSlide>
    <img src={computerImg} alt="computer" className="w-full h-full object-fit:cover" /> 
    </SwiperSlide>

    <SwiperSlide>
    <img src={freezerImg} alt="freezer" className="w-full h-full object-fit:cover" />
    </SwiperSlide>

    <SwiperSlide>
    <img src={marketImg} alt="market" className="w-full h-full object-fit:cover" />
    </SwiperSlide>

    <SwiperSlide>
    <img src={orangeImg} alt="orange" className="w-full h-full object-fit:cover" />
    </SwiperSlide>

    <SwiperSlide>
    <img src={toallasImg} alt="toallas" className="w-full h-full object-fit:cover" />
    </SwiperSlide>
    </Swiper>
    </div>
  );
};

export default Carousel;