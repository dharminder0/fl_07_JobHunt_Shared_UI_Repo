import React, { useEffect, useState } from "react";


export default function Slider() {

const slides = [
    {
        image: "/assets/images/slider-1.png",
        title: "Bridging the Gap Between Clients and Vendors",
        subtitle: "Streamline collaboration and foster partnerships for seamless bench resource hiring.",
    },
    {
        image: "/assets/images/slider-2.png",
        title: "Discover the Right Talent, Every Time",
        subtitle: "Effortlessly connect with a curated network of skilled bench resources.",
    },
    {
        image: "/assets/images/slider-3.png",
        title: "Place Top Talent with Confidence",
        subtitle: "Empowering vendors to showcase expertise and match with premium opportunities.",
    },
    {
        image: "/assets/images/slider-4.png",
        title: "Unlock Insights with Advanced Analytics",
        subtitle: "Track performance, optimize hiring strategies, and make data-driven decisions effortlessly.",
    },
];
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
    <div className="bg-gray-50">
        {/* Title and Subtitle */}
        <div className="my-2 text-center">
            <p className="text-sm font-bold">{slides[currentSlide].title}</p>
            <p className="text-xs mt-2">{slides[currentSlide].subtitle}</p>
        </div>

        {/* Image Carousel */}
        <div className="relative w-full overflow-hidden h-[495px]">
            <img
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            />
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4">
            {slides.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 mx-2 rounded-full transition-colors duration-300 ${index === currentSlide ? "bg-blue-500" : "bg-gray-400"
                        }`}
                />
            ))}
        </div>
    </div>
    );
}
