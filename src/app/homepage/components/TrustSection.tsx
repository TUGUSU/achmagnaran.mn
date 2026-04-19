'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const advantages = [
  {
    title: 'Зах зээлийн тэргүүлэгч',
    desc: 'Гахайн махны салбарт зах зээлийн 20 гаруй хувийг эзэлдэг бөгөөд Монголын мах боловсруулах үйлдвэрлэлд тасралтгүй 10 гаруй жил тэргүүлэн ажиллаж байна.',
  },
  {
    title: 'Монголд анхдагч технологи',
    desc: 'Цагт 2 тонн мах зүсэх хүчин чадалтай аюулгүй автомат тоног төхөөрөмжийг Монголд анх удаа нэвтрүүлснээр боловсруулалтын хурд, чанар, аюулгүй байдлыг нэгэн зэрэг дээшлүүлсэн.',
  },
  {
    title: '16 өөрийн салбар дэлгүүр',
    desc: 'Номин, Оргил, Сансар сүлжээний дэлгүүрүүдэд өөрийн 16 брэнд салбараар үйлчилж байна.',
  },
  {
    title: '300+ гэрээт хамтрагч',
    desc: 'Улаанбаатар болон орон нутгийн зах, худалдааны төвүүдтэй нийт 300 гаруй гэрээт цэгтэйгээр хамтарч ажилладаг.',
  },
  {
    title: 'Олон улсын нийлүүлэгчид',
    desc: 'ОХУ-н Сибагро, Мироторг, Чиркизов болон БНХАУ-н 2 үйлдвэртэй гэрээт хамтын ажиллагаатай — нийт 5 гадаад түнш.',
  },
  {
    title: 'Уян хатан нийлүүлэлт',
    desc: 'Жижиглэнгийн хэрэглэгчээс байгууллагын том захиалга хүртэл тогтмол нийлүүлэлт хийж, уян хатан төлбөрийн нөхцөл болон хариуцлагатай хэрэгжүүлэлтийг баталгаажуулдаг.',
  },
];

const qualityPoints = [
  {
    num: '01',
    title: 'Автомат зүсэх технологи',
    desc: 'Цагт 2 тонн мах зүсэх хүчин чадалтай, аюулгүй ажиллагааг бүрэн хангасан автомат тоног төхөөрөмжийг ашигладаг. Зүсэлтийн нарийвчлал, тогтмол байдал нь гарын ажиллагаатай харьцуулшгүй.',
  },
  {
    num: '02',
    title: 'Зориулалтын хөлдөөлт',
    desc: '40 тонн багтаамжтай 2 тусгай хөлдөөгч болон 20 тонн үйлдвэрийн хөлдөөгчтэй. Хадгалалтын бүх шатанд температурын нарийн хяналт тасралтгүй хийгддэг.',
  },
  {
    num: '03',
    title: '500 м² эрүүл ахуйн үйлдвэр',
    desc: 'Шинэчлэгдсэн 500 м² үйлдвэрийн байранд эрүүл ахуйн болон аюулгүй ажиллагааны стандартыг бүрэн хангасан орчинд боловсруулалт хийгддэг.',
  },
  {
    num: '04',
    title: 'Тусгай жорын амталгаа',
    desc: 'Олон жилийн туршлагаас гарган тогтоосон өөрийн тусгай жорын дагуу амталсан гахай, тахианы мах нь тогтмол амт, өндөр чанараар онцлогддог.',
  },
  {
    num: '05',
    title: 'Хөргөлттэй тээвэрлэлт',
    desc: 'Зориулалтын хөргөлттэй тээврийн хэрэгслэлийг ашиглан, бүтээгдэхүүний хэлхээний температурын нөхцөлийг алдагдуулалгүй цаг хугацааны дотор хүргэдэг.',
  },
  {
    num: '06',
    title: 'Нитритгүй зайдас',
    desc: 'Гахайн махан зайдасыг нитрит агуулалгүй технологиор үйлдвэрлэдэг тул хэрэглэгчийн эрүүл мэндэд аюулгүй, байгалийн цэвэр амттай.',
  },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.06 }
    );
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="trust" ref={sectionRef} className="relative overflow-hidden">

      {/* ── Part 1: Давуу тал ── */}
      <div className="py-24" style={{ background: 'linear-gradient(180deg, #1A0A04 0%, #220C06 50%, #1A0A04 100%)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px ornament-divider" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />
              Давуу тал
              <span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
              Яагаад <span className="text-gradient">АЧМАГ НАРАН</span> гэж?
            </h2>
            <p className="text-cream-muted text-[15px] max-w-xl mx-auto leading-[1.85]" style={{ textAlign: 'justify' }}>
              Арван жилийн тасралтгүй туршлага, дэвшилтэт технологи, олон улсын найдвартай
              нийлүүлэгчидтэй хамтын ажиллагааг нэгтгэн хэрэглэгчдийн итгэлийг олж авсан компани.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((item, i) => (
              <div
                key={item.title}
                className="spotlight-card rounded-sm border p-6 scroll-reveal"
                style={{
                  backgroundColor: 'rgba(34,16,5,0.8)',
                  borderColor: 'rgba(200,75,17,0.15)',
                  transitionDelay: `${i * 0.07}s`,
                  '--mouse-x': '50%',
                  '--mouse-y': '50%',
                } as React.CSSProperties}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center mb-5 font-mono text-[11px] font-bold text-primary-light"
                  style={{ backgroundColor: 'rgba(200,75,17,0.1)', border: '1px solid rgba(200,75,17,0.2)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-semibold text-cream text-[16px] mb-2">{item.title}</h3>
                <p className="text-cream-subtle text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Stat strip */}
          <div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px scroll-reveal rounded-sm overflow-hidden"
            style={{ backgroundColor: 'rgba(200,75,17,0.15)', transitionDelay: '0.28s' }}
          >
            {[
              { value: '2014', label: 'Үүсгэн байгуулагдсан' },
              { value: '29+', label: 'Бүтээгдэхүүний нэр төрөл' },
              { value: '5', label: 'Гадаад нийлүүлэгч' },
              { value: '20%+', label: 'Гахайн махны зах зээл' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 text-center" style={{ backgroundColor: '#1A0A04' }}>
                <div className="font-display text-4xl font-bold text-gradient mb-1">{s.value}</div>
                <div className="text-[12px] text-cream-subtle tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 2: Чанарын баталгаа (merged) ── */}
      <div id="quality" className="py-24 section-warm mongolian-pattern">
        <div className="absolute left-0 right-0 h-px ornament-divider" style={{ top: 0 }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div className="flex flex-col gap-8">
              <div className="scroll-reveal">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-4">
                  <span className="w-8 h-px bg-accent" />
                  Чанарын баталгаа
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight">
                  Чанар, технологи,
                  <span className="block text-gradient">стандартын нэгдэл</span>
                </h2>
              </div>

              <p className="text-cream-muted text-[15px] leading-[1.85] scroll-reveal" style={{ transitionDelay: '0.08s', textAlign: 'justify' } as React.CSSProperties}>
                Дэвшилтэт технологи нэвтрүүлж, олон улсын чанарын өндөр стандартыг хангасан мах,
                махан бүтээгдэхүүнийг үйлдвэрлэн хэрэглэгчийн гарт тогтмол хүргэдэг. Бүтээгдэхүүн
                бүрийн аюулгүй байдал, ариун цэвэр, тогтмол чанар нь бидний хамгийн тэргүүлэх
                зорилт бөгөөд хэзээ ч буулт хийхгүй асуудал юм.
              </p>

              <div
                className="flex flex-col gap-0 scroll-reveal"
                style={{ transitionDelay: '0.16s', border: '1px solid rgba(200,75,17,0.14)', borderRadius: '2px' }}
              >
                {qualityPoints.map((qp, i) => (
                  <div
                    key={qp.num}
                    className="group flex items-start gap-5 p-5 hover:bg-primary/5 transition-colors"
                    style={{ borderBottom: i < qualityPoints.length - 1 ? '1px solid rgba(200,75,17,0.08)' : 'none' }}
                  >
                    <span className="font-mono text-[11px] text-primary-light/50 group-hover:text-primary-light transition-colors mt-0.5 font-semibold tracking-wider shrink-0">
                      {qp.num}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-cream text-[14px] mb-1 group-hover:text-primary-light transition-colors">
                        {qp.title}
                      </h3>
                      <p className="text-cream-subtle text-[13px] leading-relaxed">{qp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative scroll-reveal" style={{ transitionDelay: '0.12s' }}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-sm overflow-hidden">
                  <AppImage
                    src="/assets/achmag/quality-factory.png"
                    alt="Ачмаг Наран ХХК — чанарт үйлдвэр"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/50 to-transparent" />
                </div>

                <div
                  className="absolute -top-5 -right-5 p-5 rounded-sm animate-pulse-glow"
                  style={{ backgroundColor: '#C84B11', border: '2px solid rgba(212,168,83,0.35)' }}
                >
                  <div className="font-display text-2xl font-bold text-white text-center">400 м²</div>
                  <div className="text-[11px] text-white/75 text-center mt-0.5">Үйлдвэрийн байр</div>
                </div>

                <div
                  className="absolute -bottom-5 -left-5 p-4 rounded-sm backdrop-blur-md border"
                  style={{ backgroundColor: 'rgba(34,16,5,0.95)', borderColor: 'rgba(212,168,83,0.28)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-accent"
                      style={{ backgroundColor: 'rgba(212,168,83,0.1)' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-[12px] font-semibold text-cream">Эрүүл ахуйн стандарт</div>
                      <div className="text-[10px] text-cream-subtle">Бүрэн хангагдсан</div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 -right-4 w-14 h-14 border-b-2 border-r-2"
                  style={{ borderColor: 'rgba(212,168,83,0.28)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
