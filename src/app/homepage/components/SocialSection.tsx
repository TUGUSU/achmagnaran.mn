'use client';

import React, { useEffect, useRef } from 'react';

export default function SocialSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef?.current?.querySelectorAll('.scroll-reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section id="social" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1A0A04 0%, #2A1008 40%, #3A1A0A 70%, #2A1008 100%)',
        }}
      />
      {/* Gold accent blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #D4A853, transparent 70%)' }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px ornament-divider" />
        <div className="absolute bottom-0 left-0 right-0 h-px ornament-divider" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="scroll-reveal mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-6">
            <span className="w-6 h-px bg-accent" />
            Сошиал хаяг
            <span className="w-6 h-px bg-accent" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight mb-5">
            Биднийг <span className="text-gradient">дагаарай</span>
          </h2>
          <p className="text-cream-muted text-[16px] leading-relaxed max-w-2xl mx-auto">
            Шинэ бүтээгдэхүүн ,компанийн мэдээ мэдээлэл болон сонирхолтой контентыг хамгийн түрүүнд
            авахыг хүсвэл манай сошиал хуудсыг дагаарай.
          </p>
        </div>

        {/* Social cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 scroll-reveal" style={{ transitionDelay: '0.15s' }}>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=61557235019083"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-5 p-10 rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg"
            style={{ backgroundColor: 'rgba(34,16,5,0.7)', borderColor: 'rgba(200,75,17,0.2)' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,75,17,0.08), transparent 70%)' }} />
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-[#1877F2] transition-transform duration-300 group-hover:scale-110 relative z-10" style={{ backgroundColor: 'rgba(24,119,242,0.1)', border: '1px solid rgba(24,119,242,0.2)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="font-display font-bold text-xl text-cream mb-1">Facebook</div>
              <div className="text-[13px] text-cream-muted">Ачмаг Наран ХХК</div>
              <div className="text-[12px] text-cream-subtle mt-2">Шинэ бүтээгдэхүүн, мэдээ мэдээлэл</div>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-[13px] font-semibold text-white relative z-10 transition-all duration-300 group-hover:shadow-warm" style={{ background: 'linear-gradient(135deg, #C84B11, #E8722A)' }}>
              Хуудас дагах
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/achmagnaranllc"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-5 p-10 rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-warm-lg"
            style={{ backgroundColor: 'rgba(34,16,5,0.7)', borderColor: 'rgba(200,75,17,0.2)' }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(200,75,17,0.08), transparent 70%)' }} />
            <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(228,64,95,0.15), rgba(255,120,30,0.15))', border: '1px solid rgba(228,64,95,0.25)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="url(#igGrad)">
                <defs>
                  <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E4405F" />
                    <stop offset="100%" stopColor="#FF7820" />
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <div className="relative z-10 text-center">
              <div className="font-display font-bold text-xl text-cream mb-1">Instagram</div>
              <div className="text-[13px] text-cream-muted">@achmagnaranllc</div>
              <div className="text-[12px] text-cream-subtle mt-2">Фото, видео, шинэ бүтээгдэхүүн</div>
            </div>
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-[13px] font-semibold text-white relative z-10 transition-all duration-300 group-hover:shadow-warm" style={{ background: 'linear-gradient(135deg, #C84B11, #E8722A)' }}>
              Хуудас дагах
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </a>
        </div>

        {/* Microcopy */}
        <p className="text-cream-subtle text-[13px] mt-8 scroll-reveal" style={{ transitionDelay: '0.25s' }}>
          Шинэ бүтээгдэхүүн гарах үед хамгийн түрүүнд мэдэхийг хүсвэл дагаарай.
          Мэдээ, мэдээлэл болон тусгай үнийн саналыг мэдэхийг хүсвэл бидэнтэй яаралтай холбогдоно уу?.
        </p>
      </div>
    </section>
  );
}