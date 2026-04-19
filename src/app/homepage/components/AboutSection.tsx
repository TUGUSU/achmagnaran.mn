'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const philosophy = [
  {
    id: 'vision',
    tag: 'Алсын Хараа',
    title: 'Шинэлэг бүхнийг хүн бүрт',
    body: 'Монгол улсад олон улсын чанарын стандарт, дэвшилтэт технологийг нэвтрүүлэн, мах боловсруулах салбарт үлгэр жишээ тогтоох тэргүүлэгч байгууллага болох нь бидний зорилт.',
  },
  {
    id: 'mission',
    tag: 'Эрхэм Зорилго',
    title: 'Чанар дамжуулан итгэл олно',
    body: 'Дэвшилтэт технологийг ашиглан, олон улсын чанарын шаардлагыг хангасан мах, махан бүтээгдэхүүнийг тогтмол нийлүүлж, хэрэглэгч бүрт найдвартай, аюулгүй хоол хүнсийг хүргэхийг эрхэмлэдэг.',
  },
  {
    id: 'values',
    tag: 'Үнэт Зүйл',
    title: 'Аюулгүй байдал. Итгэл. Шударга байдал.',
    body: 'Байгаль орчинд ээлтэй, хэрэглэгчийн эрх ашгийг дээдэлсэн, ёс зүйтэй бизнес эрхлэх зарчмыг баримтлан, нийгмийн хариуцлагатай компани байхыг зорьдог.',
  },
];

const stats = [
  { value: '10+', label: 'Жилийн туршлага' },
  { value: '30+', label: 'Мэргэшсэн ажилтан' },
  { value: '2', label: 'Өөрийн салбар дэлгүүр' },
  { value: '300+', label: 'Гэрээт хамтрагч цэг' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 section-warm mongolian-pattern" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px ornament-divider" />
        <div className="absolute bottom-0 left-0 right-0 h-px ornament-divider" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">

        {/* ── Block 1: Overview ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="relative scroll-reveal">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
              <AppImage
                src="/assets/achmag/about-factory.png"
                alt="Ачмаг Наран ХХК үйлдвэр"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/60 to-transparent" />
            </div>

            <div
              className="absolute -bottom-6 -right-6 p-5 rounded-sm backdrop-blur-md border shadow-warm"
              style={{ backgroundColor: 'rgba(34,16,5,0.92)', borderColor: 'rgba(200,75,17,0.3)' }}
            >
              <div className="text-[10px] text-cream-subtle uppercase tracking-widest mb-1">Үүсгэн байгуулагдсан</div>
              <div className="font-display text-4xl font-bold text-gradient">2014</div>
              <div className="text-[12px] text-cream-muted mt-1">Улаанбаатар, Монгол</div>
            </div>

            <div
              className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2"
              style={{ borderColor: 'rgba(212,168,83,0.35)' }}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <div className="scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                <span className="w-8 h-px bg-accent" />
                Бидний тухай
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight">
                Монголын махны зах зээлийн
                <span className="block text-gradient">тэргүүлэгч компани</span>
              </h2>
            </div>

            <p
              className="text-cream-muted leading-[1.85] text-[15px] scroll-reveal"
              style={{ transitionDelay: '0.18s', textAlign: 'justify', hyphens: 'auto' } as React.CSSProperties}
            >
              Ачмаг Наран ХХК нь 2014 онд анхны 400 м² үйлдвэрийн байр, 4 ажилтантайгаар
              үйл ажиллагаагаа эхлүүлж байсан бол өнөөдөр Монголын мах, махан бүтээгдэхүүний зах зээлд
              тасралтгүй 12 жил амжилттай ажиллаж байна. Гахайн махны салбарт зах зээлийн
              10-20 хувийг эзэлдэг бөгөөд Монгол хэрэглэгчдийн шаардлагад нийцсэн мах зүсэх
              төхөөрөмжийг нэвтрүүлсэн пионер байгууллага юм.
            </p>

            <p
              className="text-cream-muted leading-[1.85] text-[15px] scroll-reveal"
              style={{ transitionDelay: '0.26s', textAlign: 'justify', hyphens: 'auto' } as React.CSSProperties}
            >
              Оросын Холбооны Улс болон Бүгд Найрамдах Хятад Улсын нийт 5 гэрээт нийлүүлэгчтэй
              хамтран ажилладаг. Дэвшилтэт технологи, олон улсын чанарын стандарт, нийгмийн
              хариуцлага нь бидний бизнесийн суурь юм.
            </p>

            <div className="grid grid-cols-2 gap-3 scroll-reveal" style={{ transitionDelay: '0.34s' }}>
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col p-4 rounded-sm"
                  style={{ backgroundColor: 'rgba(200,75,17,0.07)', border: '1px solid rgba(200,75,17,0.14)' }}
                >
                  <span className="font-display text-2xl font-bold text-gradient">{s.value}</span>
                  <span className="text-[12px] text-cream-subtle mt-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Block 2: Philosophy ── */}
        <div>
          <div className="text-center mb-12 scroll-reveal">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              <span className="w-6 h-px bg-accent" />
              Бизнесийн философи
              <span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mt-2">
              Бидний баримтладаг <span className="text-gradient">үнэт зүйлс</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {philosophy.map((item, i) => (
              <div
                key={item.id}
                className="relative flex flex-col gap-4 p-7 rounded-sm border scroll-reveal"
                style={{
                  backgroundColor: 'rgba(26,10,4,0.7)',
                  borderColor: 'rgba(200,75,17,0.14)',
                  transitionDelay: `${0.08 + i * 0.1}s`,
                }}
              >
                <div
                  className="absolute top-0 left-7 right-7 h-px"
                  style={{ background: 'linear-gradient(to right, rgba(212,168,83,0.45), transparent)' }}
                />
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-accent">
                  {item.tag}
                </span>
                <h3 className="font-display font-bold text-cream text-[16px] leading-snug">
                  {item.title}
                </h3>
                <p
                  className="text-cream-subtle text-[13px] leading-[1.8]"
                  style={{ textAlign: 'justify', hyphens: 'auto' } as React.CSSProperties}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
