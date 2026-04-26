"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { Tag } from 'lucide-react';

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
        <section className="mt-20 mb-4" dir="rtl">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
                <div
                    className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-black shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #FCD201, #FFA000)', color: '#1a1a1a' }}
                >
                    <Tag className="w-4 h-4" />
                    <span>عروض حصرية</span>
                </div>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #FCD201, transparent)' }} />
                <p className="text-sm font-semibold" style={{ color: '#b8860b' }}>اكتشف أحدث الخصومات</p>
            </div>

            <div className="relative">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640:  { slidesPerView: 1 },
                        768:  { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="pb-12 offers-swiper"
                >
                    {offers.map((offer) => (
                        <SwiperSlide key={offer.id}>
                            <Link href="/products" className="block h-full">
                                <div
                                    className="h-full flex flex-col overflow-hidden group transition-all duration-400 hover:-translate-y-1"
                                    style={{
                                        background: '#ffffff',
                                        borderRadius: '2rem',
                                        border: '2px solid rgba(252,210,1,0.2)',
                                        boxShadow: '0 4px 24px rgba(252,210,1,0.10), 0 1px 4px rgba(0,0,0,0.06)',
                                    }}
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[16/9] w-full overflow-hidden" style={{ borderRadius: '2rem 2rem 0 0' }}>
                                        <img
                                            src={offer.image_url}
                                            alt={offer.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                        {/* Discount label */}
                                        <div
                                            className="absolute top-4 right-4 font-black px-4 py-2 rounded-2xl shadow-xl text-sm transform rotate-2 group-hover:rotate-4 group-hover:-translate-y-1 transition-all duration-300"
                                            style={{
                                                background: 'linear-gradient(135deg, #FCD201, #FFA000)',
                                                color: '#1a1a1a',
                                                boxShadow: '0 4px 18px rgba(252,210,1,0.5)',
                                            }}
                                        >
                                            {offer.discount_label}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-grow flex flex-col justify-center text-center relative">
                                        {/* Decorative dots */}
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                            {[1,2,3].map(i => (
                                                <div key={i} className="w-1 h-1 rounded-full" style={{ background: i === 2 ? '#FCD201' : 'rgba(252,210,1,0.35)' }} />
                                            ))}
                                        </div>
                                        <h3 className="text-lg font-black text-slate-800 mb-2 group-hover:text-yellow-700 transition-colors duration-300">
                                            {offer.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {offer.description}
                                        </p>
                                        {/* CTA line */}
                                        <div
                                            className="mt-4 mx-auto h-1 w-12 rounded-full transition-all duration-400 group-hover:w-20"
                                            style={{ background: 'linear-gradient(to right, #FCD201, #FFA000)' }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                .offers-swiper .swiper-button-next,
                .offers-swiper .swiper-button-prev {
                    color: #1a1a1a !important;
                    background: linear-gradient(135deg, #FCD201, #FFA000) !important;
                    width: 42px !important;
                    height: 42px !important;
                    border-radius: 50% !important;
                    box-shadow: 0 4px 16px rgba(252,210,1,0.45) !important;
                    transition: transform 0.3s !important;
                }
                .offers-swiper .swiper-button-next:hover,
                .offers-swiper .swiper-button-prev:hover {
                    transform: scale(1.1) !important;
                }
                .offers-swiper .swiper-button-next:after,
                .offers-swiper .swiper-button-prev:after {
                    font-size: 15px !important;
                    font-weight: 900 !important;
                }
                .offers-swiper .swiper-pagination-bullet {
                    background: rgba(252,210,1,0.3) !important;
                    opacity: 1 !important;
                }
                .offers-swiper .swiper-pagination-bullet-active {
                    background: #FCD201 !important;
                    transform: scale(1.3) !important;
                }
            `}</style>
        </section>
    );
}
