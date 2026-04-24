"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Offer } from '@/lib/supabase/types';

interface OffersSliderProps {
    offers: Offer[];
}

export default function OffersSlider({ offers }: OffersSliderProps) {
    if (!offers || offers.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 mb-16" dir="rtl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">عروض حصرية</h2>
                    <p className="text-slate-500 text-sm mt-0.5">اكتشف أحدث العروض والخصومات</p>
                </div>
            </div>

            <div className="relative">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="pb-12"
                >
                    {offers.map((offer) => (
                        <SwiperSlide key={offer.id}>
                            <Link href="/products" className="block h-full">
                                <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col overflow-hidden group transition-all duration-300">
                                    {/* Image Container */}
                                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                                        <img 
                                            src={offer.image_url} 
                                            alt={offer.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Discount Label */}
                                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground font-black px-4 py-2 rounded-xl shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform">
                                            {offer.discount_label}
                                        </div>
                                    </div>
                                    
                                    {/* Content Container */}
                                    <div className="p-6 flex-grow flex flex-col justify-center text-center">
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{offer.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                            {offer.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .swiper-button-next, .swiper-button-prev {
                    color: #FCD201 !important;
                    background: white !important;
                    width: 40px !important;
                    height: 40px !important;
                    border-radius: 50% !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
                }
                .dark .swiper-button-next, .dark .swiper-button-prev {
                    background: #1e293b !important;
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 16px !important;
                    font-weight: bold !important;
                }
                .swiper-pagination-bullet-active {
                    background: #FCD201 !important;
                }
            `}</style>
        </section>
    );
}
