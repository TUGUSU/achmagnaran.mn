'use client';

import React from 'react';

const partners = [
  { name: 'Номин холдинг',              logo: 'nomin' },
  { name: 'Оргил сүлжээ',               logo: 'orgil' },
  { name: 'Сансар сүлжээ',              logo: 'sansar' },
  { name: 'Emart / Immart',             logo: 'emart' },
  { name: 'Хаанбууз ХХК',               logo: 'khaanbuuz' },
  { name: 'Монбэйкери ХХК',             logo: 'monbakery' },
  { name: 'Номадс хоспиталити',         logo: 'nomads' },
  { name: 'Нордлайн ХХК',               logo: 'nordline' },
  { name: 'Алтан Жолоо Трейд',          logo: 'altanjoloot' },
  { name: 'Моннидер ХХК',               logo: 'monnider' },
  { name: 'Хархорин худалдааны төв',    logo: 'kharkhorin' },
  { name: 'Дүнжингарав худалдааны төв', logo: 'dunjingarav' },
  { name: 'Баялаг Ундраа',              logo: 'bayalag-undraa' },
  { name: 'Нарантуул худалдааны төв',   logo: 'narantuul' },
  { name: 'Хүчит Шонхор',              logo: 'khuchit-shonkhor' },
];

// Triple for truly seamless loop at slow speed
const tripled = [...partners, ...partners, ...partners];

export default function PartnersSection() {
  return (
    <section
      id="partners"
      className="relative overflow-hidden"
      style={{ padding: '56px 0 60px' }}
    >
      {/* Subtle background — slightly differentiated from hero dark */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #120604 0%, #1C0B05 50%, #120604 100%)',
        }}
      />

      {/* Top & bottom hairlines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.2), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.2), transparent)' }}
        />
      </div>

      <div className="relative z-10">
        {/* Centered section title */}
        <div className="text-center mb-10 px-4">
          <span
            className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: 'rgba(212,168,83,0.55)' }}
          >
            Хамтран ажилладаг байгууллагууд
          </span>
          <div
            className="mx-auto w-12 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.35), transparent)' }}
          />
        </div>

        {/* Scrolling row */}
        <div className="relative">
          {/* Left fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #120604 20%, transparent)' }}
          />
          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #120604 20%, transparent)' }}
          />

          <div className="overflow-hidden">
            <div
              className="partner-marquee flex items-center"
              style={{ width: 'max-content' }}
            >
              {tripled.map((p, i) => (
                <div
                  key={`${p.logo}-${i}`}
                  className="partner-item flex-shrink-0 flex items-center gap-3 px-7"
                >
                  {/* Logo container — shows logo image; falls back to styled text pill */}
                  <div className="partner-logo-wrap relative flex items-center justify-center"
                    style={{ width: 110, height: 44 }}>
                    <img
                      src={`/assets/partners/${p.logo}.png`}
                      alt={p.name}
                      width={110}
                      height={44}
                      className="partner-logo object-contain w-full h-full"
                      style={{ filter: 'grayscale(1) brightness(0.55)', transition: 'filter 0.3s ease' }}
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        const fallback = img.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Text fallback (hidden until img errors) */}
                    <span
                      className="partner-text-fallback absolute inset-0 items-center justify-center text-[12px] font-medium text-center leading-tight whitespace-nowrap"
                      style={{
                        display: 'none',
                        color: 'rgba(200,180,155,0.5)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {p.name}
                    </span>
                  </div>

                  {/* Vertical divider */}
                  <span
                    className="flex-shrink-0"
                    style={{
                      display: 'block',
                      width: 1,
                      height: 20,
                      backgroundColor: 'rgba(200,75,17,0.18)',
                      marginLeft: 20,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
