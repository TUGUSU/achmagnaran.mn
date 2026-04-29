'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';

const heroSlides = [
  {
    image: '/assets/achmag/product-set-1.jpg',
    alt: 'Ачмаг Наран ХХК махан бүтээгдэхүүн — чанартай савлагаатай мах',
    eyebrow: 'Ачмаг Наран ХХК · 2014 он',
    headline1: 'Шинэлэг бүхнийг',
    headline2: 'Хүн бүрт',
    sub: 'Өрх болон бизнесийн хэрэглэгчдэд зориулсан цэвэр, найдвартай, чанарын хяналттай махан бүтээгдэхүүн.',
  },
  {
    image: '/assets/achmag/product-set-2.jpg',
    alt: 'Ачмаг Наран — амталсан мах, самгёпсал',
    eyebrow: 'Хоол үйлдвэрлэл · Байгууллагын захиалга',
    headline1: 'Амталсан мах,',
    headline2: 'Бэлэн бүтээгдэхүүн',
    sub: 'Амталсан самгёпсал, жэюүг, стейк зэрэг бэлэн амталсан бүтээгдэхүүнийг ресторан болон өрхийн хэрэглээнд нийлүүлнэ.',
  },
  {
    image: '/assets/achmag/product-set-5.jpg',
    alt: 'Ачмаг Наран — тахианы ангилсан бүтээгдэхүүн',
    eyebrow: 'Бөөний нийлүүлэлт · 15+ нэр төрөл',
    headline1: 'Тахиа, гахайн',
    headline2: 'Төрөлжсөн нийлүүлэлт',
    sub: 'Бөөний болон жижиглэнгийн хэрэглээнд тохирсон, ангилал болон багцлалттай бүтээгдэхүүнийг уян хатан нөхцөлтэйгөөр санал болгодог.',
  },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentSlide) return;
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 2000);
    },
    [isTransitioning, currentSlide]
  );

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => setIsTransitioning(false), 2000);
    }, 7500);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      section.style.setProperty('--mouse-x', `${x}%`);
      section.style.setProperty('--mouse-y', `${y}%`);
    };
    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = heroSlides[currentSlide];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' } as React.CSSProperties}
    >
      {/* Slide backgrounds — crossfade */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0"
          style={{
            opacity: i === currentSlide ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        >
          <AppImage
            src={s.image}
            alt={s.alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Warm gradient overlay */}
          <div className="absolute inset-0 hero-gradient" />
          {/* Deep left vignette for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(26,10,4,0.82) 0%, rgba(26,10,4,0.55) 50%, rgba(26,10,4,0.1) 100%)',
            }}
          />
        </div>
      ))}

      {/* Cursor glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{
          background:
            'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(200,75,17,0.35), transparent 55%)',
        }}
      />

      {/* Animated beams */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-between px-12 md:px-24">
        <div className="relative w-px h-full bg-white/[0.02] overflow-hidden">
          <div className="beam" />
        </div>
        <div className="relative w-px h-full bg-white/[0.02] overflow-hidden hidden md:block">
          <div className="beam beam-delay-1" />
        </div>
        <div className="relative w-px h-full bg-white/[0.02] overflow-hidden">
          <div className="beam beam-delay-2" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 z-0 bg-gradient-to-t from-warm-dark to-transparent" />

      {/* Content — re-animates on slide change via key */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <div
            key={`eyebrow-${currentSlide}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border mb-8 animate-in"
            style={{
              borderColor: 'rgba(212, 168, 83, 0.4)',
              backgroundColor: 'rgba(212, 168, 83, 0.08)',
              animationDelay: '0.05s',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-accent">
              {slide.eyebrow}
            </span>
          </div>

          {/* Main headline */}
          <h1
            key={`h1-${currentSlide}`}
            className="font-display font-bold leading-none tracking-tight mb-6 animate-in"
            style={{ animationDelay: '0.15s', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
          >
            <span className="block text-cream">{slide.headline1}</span>
            <span className="block text-gradient" style={{ lineHeight: 1.1 }}>
              {slide.headline2}
            </span>
          </h1>

          {/* Subheadline */}
          <p
            key={`sub-${currentSlide}`}
            className="text-lg md:text-xl text-cream-muted leading-relaxed max-w-xl mb-10 animate-in"
            style={{ animationDelay: '0.28s' }}
          >
            {slide.sub}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-in"
            style={{ animationDelay: '0.42s' }}
          >
            <button
              onClick={() => handleScrollTo('#products')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-gradient text-white font-semibold text-[15px] rounded-sm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1"
            >
              Бүтээгдэхүүн үзэх
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => handleScrollTo('#contact')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 border text-cream font-medium text-[15px] rounded-sm hover:bg-white/5 transition-all duration-300"
              style={{ borderColor: 'rgba(250, 240, 230, 0.2)' }}
            >
              Холбоо барих
            </button>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 mt-14 pt-8 animate-in"
            style={{
              animationDelay: '0.55s',
              borderTop: '1px solid rgba(250,240,230,0.08)',
            }}
          >
            {[
              { value: '2014', label: 'Үүсгэн байгуулагдсан' },
              { value: '29+', label: 'Бүтээгдэхүүний нэр төрөл' },
              { value: '4', label: 'Нэрийн дэлгүүр' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-[12px] text-cream-subtle mt-1 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide indicators with animated progress bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              goToSlide(i);
              startInterval();
            }}
            aria-label={`${i + 1}-р слайд`}
            className="relative overflow-hidden rounded-full transition-all duration-400"
            style={{
              width: i === currentSlide ? '40px' : '8px',
              height: '4px',
              background:
                i === currentSlide ? 'transparent' : 'rgba(250,240,230,0.2)',
            }}
          >
            {i === currentSlide && (
              <span className="slide-progress-bar" style={{ animationDuration: '7.5s' }} />
            )}
          </button>
        ))}
      </div>

      {/* Slide counter — bottom right */}
      <div className="absolute bottom-[5.5rem] right-8 md:right-12 z-10 flex items-center gap-1.5">
        <span className="font-display text-sm font-bold text-accent">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="text-cream-subtle text-xs opacity-50">/</span>
        <span className="text-cream-subtle text-xs opacity-50">
          {String(heroSlides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="text-[10px] tracking-widest text-cream-subtle uppercase">Доош</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>
    </section>
  );
}
