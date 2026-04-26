"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Banner {
    id: number;
    title: string;
    description: string | null;
    image_url: string;
    color: string; // kept in interface for DB compatibility, not used visually
    link_url: string;
    button_text: string;
}

interface BannerSliderProps {
    banners: Banner[];
}

/* Decorative floating shapes — rendered per slide */
function FloatingShapes() {
    return (
        <>
            {/* Big soft circle top-left */}
            <div
                className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(252,210,1,0.22) 0%, transparent 70%)' }}
            />
            {/* Small circle bottom-right */}
            <div
                className="absolute bottom-10 right-10 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }}
            />
            {/* Sparkle dots */}
            <Star className="absolute top-16 left-1/3 w-5 h-5 text-yellow-300 opacity-60 animate-pulse" style={{ animationDuration: '2.4s' }} />
            <Star className="absolute top-28 right-1/4 w-3 h-3 text-yellow-200 opacity-50 animate-pulse" style={{ animationDuration: '3.1s' }} />
            <Sparkles className="absolute bottom-20 left-1/4 w-5 h-5 text-yellow-300 opacity-40 animate-pulse" style={{ animationDuration: '2s' }} />
            {/* Wavy bottom edge */}
            <svg
                className="absolute bottom-0 left-0 w-full pointer-events-none"
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                style={{ height: 60 }}
            >
                <path
                    d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
                    fill="rgba(255,253,231,0.95)"
                />
            </svg>
        </>
    );
}

export default function BannerSlider({ banners }: BannerSliderProps) {
    if (!banners || banners.length === 0) return null;

    return (
        <div className="w-full relative mb-0 overflow-hidden" dir="rtl">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                speed={1000}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) =>
                        `<span class="${className} hero-bullet"></span>`,
                }}
                navigation={{
                    nextEl: '.hero-btn-next',
                    prevEl: '.hero-btn-prev',
                }}
                className="w-full hero-swiper"
                style={{ height: 'clamp(480px, 75vh, 760px)' }}
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id} className="overflow-hidden">
                        <div className="relative w-full h-full flex items-center">

                            {/* ── Background image ── */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[8000ms] scale-105"
                                style={{ backgroundImage: `url(${banner.image_url})` }}
                            />

                            {/* ── Single warm dark overlay (no color from DB) ── */}
                            {/* <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-black/10" /> */}

                            {/* ── Decorative layer ── */}
                            <FloatingShapes />

                            {/* ── Hero Content ── */}
                            <div className="info relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex justify-start">
                                <div className="max-w-xl">

                                    {/* Fun pill badge */}
                                    {/* <div className="inline-flex items-center gap-2 mb-5">
                                        <span
                                            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black shadow-lg"
                                            style={{
                                                background: 'linear-gradient(135deg, #FCD201, #FFA000)',
                                                color: '#1a1a1a',
                                            }}
                                        >
                                            <Sparkles className="w-3.5 h-3.5" />
                                            مجموعة جديدة 🎉
                                        </span>
                                        <span className="flex gap-1">
                                            {[8, 5, 3].map((size, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-full"
                                                    style={{
                                                        width: size,
                                                        height: size,
                                                        background: 'rgba(252,210,1,0.6)',
                                                        display: 'inline-block',
                                                    }}
                                                />
                                            ))}
                                        </span>
                                    </div> */}

                                    {/* Main title */}
                                    <h1
                                        className="font-black leading-[1.1] drop-shadow-2xl mb-4"
                                        style={{
                                            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                                            color: '#000',
                                            textShadow: '0 2px 20px rgba(220, 182, 46, 0.4)',
                                            marginTop: '20px',
                                        }}
                                    >
                                        {banner.title}
                                        {/* Underline squiggle */}
                                        <svg viewBox="0 0 300 12" className="mt-1 w-full max-w-[280px]" style={{ height: 12 }}>
                                            <path
                                                d="M0,6 Q75,0 150,6 Q225,12 300,6"
                                                stroke="#FCD201"
                                                strokeWidth="3"
                                                fill="none"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </h1>

                                    {/* Description */}
                                    {banner.description && (
                                        <p
                                            className="text-base md:text-lg leading-relaxed mb-8 max-w-md mt-10"
                                            style={{ color: 'rgba(53, 50, 50, 0.88)' }}
                                        >
                                            {banner.description}
                                        </p>
                                    )}

                                    {/* CTA buttons */}
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            href={banner.link_url}
                                            className="group/btn relative overflow-hidden flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl font-black text-base transition-all duration-300 hover:-translate-y-0.5"
                                            style={{
                                                background: 'linear-gradient(135deg, #FCD201 0%, #FFA000 100%)',
                                                color: '#1a1a1a',
                                                boxShadow: '0 6px 30px rgba(252,210,1,0.55)',
                                            }}
                                        >
                                            {/* shine sweep */}
                                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 skew-x-12" />
                                            <span className="relative z-10">{banner.button_text}</span>
                                            <ArrowLeft className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                                        </Link>

                                    </div>

                                    {/* Trust chips */}
                                    <div className="flex flex-wrap gap-3 mt-7">
                                        {['🚚 توصيل سريع', '✨ جودة عالية'].map((chip) => (
                                            <span
                                                key={chip}
                                                className="px-3 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    background: 'rgba(255,255,255,0.40)',
                                                    backdropFilter: 'blur(8px)',
                                                    color: '#000',
                                                    border: '1px solid rgba(255,255,255,0.25)',
                                                }}
                                            >
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}

                {/* Custom nav buttons */}
                <div className="absolute bottom-16 left-8 z-20 hidden md:flex gap-3">
                    <button className="hero-btn-next w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg,#FCD201,#FFA000)', color: '#1a1a1a', boxShadow: '0 4px 18px rgba(252,210,1,0.5)' }}>
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                    <button className="hero-btn-prev w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>
            </Swiper>

            <style jsx global>{`
                .hero-swiper .swiper-pagination {
                    bottom: 24px !important;
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    align-items: center;
                }
                .hero-bullet {
                    width: 36px;
                    height: 4px;
                    background: rgba(255,255,255,0.35);
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    display: inline-block;
                }
                .hero-bullet.swiper-pagination-bullet-active {
                    background: #FCD201;
                    width: 72px;
                    box-shadow: 0 0 12px rgba(252,210,1,0.6);
                }
                @media (max-width: 640px) {
                    .hero-bullet { width: 18px; }
                    .hero-bullet.swiper-pagination-bullet-active { width: 36px; }
                }
            `}</style>
        </div>
    );
}
