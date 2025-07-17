import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Slider() {
  const slides = [
    {
      image: "/assets/images/slider-1.png",
      title: "Bridging the Gap Between Clients and Vendors",
      subtitle:
        "Streamline collaboration and foster partnerships for seamless bench resource hiring.",
    },
    {
      image: "/assets/images/slider-2.png",
      title: "Discover the Right Talent, Every Time",
      subtitle:
        "Effortlessly connect with a curated network of skilled bench resources.",
    },
    {
      image: "/assets/images/slider-3.png",
      title: "Place Top Talent with Confidence",
      subtitle:
        "Empowering vendors to showcase expertise and match with premium opportunities.",
    },
    {
      image: "/assets/images/slider-4.png",
      title: "Unlock Insights with Advanced Analytics",
      subtitle:
        "Track performance, optimize hiring strategies, and make data-driven decisions effortlessly.",
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]} // Include Autoplay module
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 3000, // Time between slides (in milliseconds)
        disableOnInteraction: false, // Keeps autoplay running even after user interaction
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="my-2 text-center">
            <p className="text-heading font-bold">{slide.title}</p>
            <p className="text-base mt-2">{slide.subtitle}</p>
          </div>
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
