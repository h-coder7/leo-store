"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface Banner {
    id: number;
    title: string;
    description: string | null;
    image_url: string;
    color: string;
    link_url: string;
    button_text: string;
}

interface BannerSliderProps {
    banners: Banner[];
}

export default function BannerSlider({ banners }: BannerSliderProps) {
    if (!banners || banners.length === 0) return null;

    return (
        <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl mb-12 px-10" dir="rtl">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id} className="group">
                        <div className="relative w-full h-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url(${banner.image_url})` }}
                            ></div>

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} mix-blend-multiply opacity-90`}></div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24 z-10 text-white">
                                <div className="transition-all duration-700 transform translate-y-8 opacity-0 group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 delay-100">
                                    <span className="inline-block px-4 py-1 mb-6 text-sm font-bold bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                        حصرياً على متجر ليو
                                    </span>
                                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 max-w-3xl leading-tight">
                                        {banner.title}
                                    </h2>
                                    {banner.description && (
                                        <p className="text-lg md:text-2xl text-white/90 max-w-2xl mb-10 leading-relaxed font-medium">
                                            {banner.description}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={banner.link_url}
                                            className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                                        >
                                            {banner.button_text}
                                        </Link>
                                        <Link
                                            href="/products"
                                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:scale-105 transition-all"
                                        >
                                            اكتشف المزيد
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Styles for Swiper Pagination & Navigation */}
            <style>{`
        .swiper-pagination-bullet {
          background-color: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 32px !important;
          border-radius: 12px !important;
          transition: all 0.3s ease;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(8px) !important;
          width: 56px !important;
          height: 56px !important;
          border-radius: 50% !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s ease !important;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 24px !important;
          font-weight: bold !important;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          transform: scale(1.1) !important;
        }
      `}</style>
        </div>
    );
}
