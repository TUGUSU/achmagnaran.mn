'use client';

import React, { useState } from 'react';

const partners = [
  { name: 'Номин холдинг',              logo: 'nomin' },
  { name: 'Оргил сүлжээ',               logo: 'orgil' },
  { name: 'Сансар сүлжээ',              logo: 'sansar' },
  { name: 'Emart',                      logo: 'emart' },
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
  { name: 'Хүчит Шонхор',               logo: 'khuchit-shonkhor' },
];

const tripled = [...partners, ...partners, ...partners];

export default function PartnersSection() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({});

  const getKey = (name: string, logo?: string) => `${logo || 'no-logo'}-${name}`;

  return (
    <section
      id="partners"
      className="relative overflow-hidden"
      style={{ padding: '60px 0 64px' }}
    >
      {/* lighter warm theme */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #2A1008 0%, #321408 50%, #2A1008 100%)',
        }}
      />

      {/* subtle center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,75,17,0.07), transparent)',
        }}
      />

      {/* top / bottom lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.3), transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.3), transparent)' }}
        />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-10 px-4">
          <span
            className="inline-block text-[11px] font-semibold tracking-[0.22em] uppercase mb-3"
            style={{ color: 'rgba(212,168,83,0.75)' }}
          >
            Хамтран ажилладаг байгууллагууд
          </span>
          <div
            className="mx-auto h-px"
            style={{
              width: 40,
              background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.45), transparent)',
            }}
          />
        </div>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #2A1008 30%, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #2A1008 30%, transparent)' }}
          />

          <div className="overflow-hidden">
            <div
              className="partner-marquee flex items-center"
              style={{ width: 'max-content' }}
            >
              {tripled.map((p, i) => {
                const itemKey = getKey(p.name, p.logo);
                const hasLogo = !!p.logo && !brokenLogos[itemKey];
                const isHighlighted = hoveredKey === itemKey || activeKey === itemKey;

                return (
                  <div
                    key={`${itemKey}-${i}`}
                    className="partner-item flex-shrink-0 flex items-center gap-3 px-7"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveKey(itemKey)}
                      onMouseEnter={() => setHoveredKey(itemKey)}
                      onMouseLeave={() => setHoveredKey(null)}
                      className="flex flex-col items-center justify-center text-center"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: 110,
                          height: 44,
                        }}
                      >
                        {hasLogo ? (
                          <img
                            src={`/assets/partners/${p.logo}.png`}
                            alt={p.name}
                            width={110}
                            height={44}
                            className="object-contain"
                            style={{
                              width: 'auto',
                              height: 'auto',
                              maxWidth: '110px',
                              maxHeight: '44px',
                              display: 'block',
                              background: 'transparent',
                              border: 'none',
                              outline: 'none',
                              filter: isHighlighted
                                ? 'grayscale(0) brightness(1.08)'
                                : 'grayscale(1) brightness(0.78)',
                              opacity: isHighlighted ? 1 : 0.9,
                              transition: 'filter 0.25s ease, opacity 0.25s ease',
                            }}
                            onError={() => {
                              setBrokenLogos((prev) => ({ ...prev, [itemKey]: true }));
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              color: isHighlighted
                                ? 'rgba(235,205,140,0.95)'
                                : 'rgba(220,198,170,0.82)',
                              fontSize: '12px',
                              fontWeight: 500,
                              lineHeight: 1.35,
                              textAlign: 'center',
                              transition: 'color 0.25s ease',
                              maxWidth: 110,
                            }}
                          >
                            {p.name}
                          </span>
                        )}
                      </div>

                      {hasLogo && (
                        <span
                          className="mt-3"
                          style={{
                            color: isHighlighted
                              ? 'rgba(235,205,140,0.95)'
                              : 'rgba(220,198,170,0.82)',
                            fontSize: '12px',
                            fontWeight: 500,
                            lineHeight: 1.35,
                            textAlign: 'center',
                            transition: 'color 0.25s ease',
                            maxWidth: 140,
                          }}
                        >
                          {p.name}
                        </span>
                      )}
                    </button>

                    <span
                      className="flex-shrink-0"
                      style={{
                        display: 'block',
                        width: 1,
                        height: 20,
                        backgroundColor: 'rgba(200,75,17,0.12)',
                        marginLeft: 20,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}