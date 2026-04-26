"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { Tag, ArrowLeft, Sparkles, Zap } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Offer } from '@/lib/supabase/types';

interface OffersSliderProps {
    offers: Offer[];
}

export default function OffersSlider({ offers }: OffersSliderProps) {
    if (!offers || offers.length === 0) return null;

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
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="pb-14 offers-swiper"
                >
                    {offers.map((offer, index) => (
                        <SwiperSlide key={offer.id}>
                            <Link href="/products" className="block h-full group">
                                <div
                                    className="relative overflow-hidden transition-all duration-500 border-2"
                                    style={{
                                        borderRadius: '2rem',
                                        minHeight: '360px',
                                    }}
                                >
                                    {/* ── Background Image ── */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={offer.image_url}
                                            alt={offer.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* ── Rich Dark Gradient Overlay ── */}
                                    {/* <div
                                        className="absolute inset-0"
                                        style={{
                                            background: index % 2 === 0
                                                ? 'linear-gradient(135deg, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.45) 55%, rgba(252,210,1,0.15) 100%)'
                                                : 'linear-gradient(135deg, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.45) 55%, rgba(255,160,0,0.18) 100%)',
                                        }}
                                    /> */}

                                    {/* ── Animated glow border on hover ── */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            borderRadius: '2rem',
                                            boxShadow: 'inset 0 0 0 2.5px #FCD201, 0 0 40px rgba(252,210,1,0.25)',
                                        }}
                                    />

                                    {/* ── Decorative sparkle dots ── */}
                                    <Sparkles
                                        className="absolute top-5 left-5 opacity-20 group-hover:opacity-40 transition-opacity duration-500 text-[#FCD201]"
                                        style={{ width: 28, height: 28 }}
                                    />
                                    <div
                                        className="absolute bottom-28 left-6 w-2 h-2 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                                        style={{ background: '#FCD201' }}
                                    />
                                    <div
                                        className="absolute top-14 left-12 w-1.5 h-1.5 rounded-full opacity-20"
                                        style={{ background: '#FFA000' }}
                                    />

                                    {/* ── Discount Badge ── */}
                                    <div className="absolute top-5 right-5 z-10">
                                        <div
                                            className="relative flex flex-col items-center justify-center font-black shadow-2xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-110"
                                            style={{
                                                background: 'linear-gradient(135deg, #FCD201, #FFA000)',
                                                color: '#1a1a1a',
                                                borderRadius: '1rem',
                                                padding: '10px 18px',
                                                boxShadow: '0 6px 24px rgba(252,210,1,0.55)',
                                                minWidth: 72,
                                            }}
                                        >
                                            <Zap className="w-3.5 h-3.5 mb-0.5" />
                                            <span className="text-xs font-black leading-none">{offer.discount_label}</span>
                                        </div>
                                    </div>

                                    {/* ── Content ── */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                        {/* Title */}
                                        <h3
                                            className="text-2xl font-black mb-1.5 leading-tight"
                                            style={{ color: '#000', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                                        >
                                            {offer.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-sm font-semibold mb-5 leading-relaxed" style={{ color: '#777' }}>
                                            {offer.description}
                                        </p>

                                        {/* CTA Button */}
                                        <div
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-all duration-300 group-hover:gap-3"
                                            style={{
                                                background: 'linear-gradient(135deg, #FCD201, #FFA000)',
                                                color: '#1a1a1a',
                                                boxShadow: '0 4px 18px rgba(252,210,1,0.45)',
                                            }}
                                        >
                                            تسوق الآن
                                            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                                        </div>
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
                    width: 44px !important;
                    height: 44px !important;
                    border-radius: 50% !important;
                    box-shadow: 0 4px 18px rgba(252,210,1,0.5) !important;
                    transition: transform 0.3s, box-shadow 0.3s !important;
                }
                .offers-swiper .swiper-button-next:hover,
                .offers-swiper .swiper-button-prev:hover {
                    transform: scale(1.12) !important;
                    box-shadow: 0 6px 28px rgba(252,210,1,0.65) !important;
                }
                .offers-swiper .swiper-button-next:after,
                .offers-swiper .swiper-button-prev:after {
                    font-size: 15px !important;
                    font-weight: 900 !important;
                }
                .offers-swiper .swiper-pagination-bullet {
                    background: rgba(252,210,1,0.35) !important;
                    opacity: 1 !important;
                    transition: all 0.3s !important;
                }
                .offers-swiper .swiper-pagination-bullet-active {
                    background: #FCD201 !important;
                    transform: scale(1.4) !important;
                    box-shadow: 0 0 8px rgba(252,210,1,0.6) !important;
                }
            `}</style>
        </section>
    );
}
