'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import AppImage from '@/components/ui/AppImage';

// ─── Category definitions ────────────────────────────────────────────────────
// key   = internal stable value used for filtering (never displayed directly)
// label = human-readable Mongolian label shown in the UI
const CATEGORIES = [
  { key: 'all',     label: 'Бүгд' },
  { key: 'sausage', label: 'Зайдас, хиам' },
  { key: 'pork',    label: 'Гахайн мах' },
  { key: 'chicken', label: 'Тахианы мах' },
  { key: 'beef',    label: 'Үхрийн мах' },
  { key: 'special', label: 'Амталсан / тусгай бүтээгдэхүүн' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

// ─── Product type ─────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  categoryKey: CategoryKey;
  categoryLabel: string;
  image: string;
  imageAlt: string;
  badge?: 'featured' | 'popular' | 'business' | 'family';
  shortDesc: string;
  detailDesc: string;
  suitableFor: string[];
  storageNote: string;
  productType: string;
}

// ─── Product data (stable source of truth — never mutated) ───────────────────
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Франкфуртер шардаг зайдас',
    price: '14,000₮', priceNum: 14000,
    categoryKey: 'sausage', categoryLabel: 'Зайдас, хиам',
    image: '/assets/achmag/product-set-1.png',
    imageAlt: 'Франкфуртер шардаг зайдас',
    badge: 'featured',
    shortDesc: 'Германы уламжлалт жорын дагуу боловсруулсан, шарахад бэлэн нитритгүй зайдас.',
    detailDesc: 'Ачмаг Наран ХХК-ийн Франкфуртер зайдас нь Германы уламжлалт жор дагуу, цэвэр гахайн махаар хийгдсэн өндөр чанарын бүтээгдэхүүн юм. Нитрит агуулаагүй тул хэрэглэгчийн эрүүл мэндэд аюулгүй. Тосон дэвсгэр дээр шарахад, буцалгахад болон жигнэхэд аль алинд нь тохиромжтой.',
    suitableFor: ['Өрхийн хоол', 'Ресторан, кафе', 'Гэр бүлийн баяр найр'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. Нэгэнт нээсний дараа 2 хоногт хэрэглэнэ.',
    productType: 'Шарж болгоход бэлэн зайдас',
  },
  {
    id: 2,
    name: 'Чиризо шардаг зайдас',
    price: '11,500₮', priceNum: 11500,
    categoryKey: 'sausage', categoryLabel: 'Зайдас, хиам',
    image: '/assets/achmag/product-set-1.png',
    imageAlt: 'Чиризо шардаг зайдас',
    badge: 'popular',
    shortDesc: 'Паприка болон байгалийн амтлагчаар боловсруулсан, тогтмол эрэлттэй зайдас.',
    detailDesc: 'Испанийн чиризо жортой өнгийн, Монгол хэрэглэгчдэд тохируулсан амтлалтаар бэлтгэсэн зайдас. Паприка болон байгалийн ногооны амтлагчаар боловсруулсан бөгөөд шарахад улаан өнгийн гоё харагддаг.',
    suitableFor: ['Өрхийн хоол', 'Пицца, бутерброд', 'Ресторан хоол'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. Нэгэнт нээсний дараа 2 хоногт хэрэглэнэ.',
    productType: 'Амталсан зайдас',
  },
  {
    id: 3,
    name: 'Цэвэр гахайн махан зайдас',
    price: '11,500₮', priceNum: 11500,
    categoryKey: 'sausage', categoryLabel: 'Зайдас, хиам',
    image: '/assets/achmag/product-set-1.png',
    imageAlt: 'Цэвэр гахайн махан зайдас',
    shortDesc: 'Хиймэл нэмэлтгүй, цэвэр гахайн махаар хийсэн байгалийн амттай зайдас.',
    detailDesc: 'Ямар нэгэн хиймэл нэмэлт, нитрит агуулаагүй, зөвхөн цэвэр гахайн мах болон байгалийн амтлагчаар хийсэн зайдас. Байгалийн цэвэр гарал үүслийг эрхэмлэдэг хэрэглэгчдэд болон хүүхдийн хоолонд тохиромжтой.',
    suitableFor: ['Өрхийн хоол', 'Хүүхдийн хоол', 'Өдөр тутмын хэрэглээ'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална.',
    productType: 'Байгалийн цэвэр зайдас',
  },
  {
    id: 4,
    name: 'Амталсан самгёпсал',
    price: '18,000₮', priceNum: 18000,
    categoryKey: 'special', categoryLabel: 'Амталсан / тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-2.png',
    imageAlt: 'Амталсан самгёпсал',
    badge: 'featured',
    shortDesc: 'Солонгос хоолны жорын дагуу, тусгай амтлалтаар боловсруулсан гахайн хэвлийн мах.',
    detailDesc: 'Солонгосын уламжлалт самгёпсалын жорыг үндэслэн боловсруулсан гахайн хэвлийн мах. Цайны хавтан, чинжүүн болон байгалийн амтлагчаар нэвтрүүлсэн бөгөөд шарахад тос нь гоёхон ялгарч, гүнзгий амт гардаг.',
    suitableFor: ['Гэр бүлийн хоол', 'BBQ, найзуудтай цуглаан', 'Ресторан'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. 24 цагт хэрэглэхийг зөвлөнө.',
    productType: 'Амталсан гахайн мах',
  },
  {
    id: 5,
    name: 'Ханип',
    price: '20,000₮', priceNum: 20000,
    categoryKey: 'pork', categoryLabel: 'Гахайн мах',
    image: '/assets/achmag/product-set-2.png',
    imageAlt: 'Ханип — боловсруулсан гахайн мах',
    badge: 'business',
    shortDesc: 'Мэргэжлийн боловсруулалттай, нийтийн хоол болон бизнесийн хэрэгцээнд тохиромжтой.',
    detailDesc: 'Ханип бол нийтийн хоол болон байгууллагын хэрэгцээнд өргөн хэрэглэгддэг, хэд хэдэн шатаар чанарын хяналттайгаар боловсруулсан гахайн мах. Буцалгах, шарах, жигнэх аль ч аргад тохиромжтой. Ресторан, зочид буудал, хоолны үйлдвэрт тогтмол нийлүүлдэг.',
    suitableFor: ['Ресторан, кафе', 'Зочид буудал', 'Том хэмжээний захиалга'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. Хөлдөөсөн байдалд 3 сар хүртэл хадгална.',
    productType: 'Байгууллагын хэрэгцээний гахайн мах',
  },
  {
    id: 6,
    name: 'Порк самгёпсал',
    price: '16,500₮', priceNum: 16500,
    categoryKey: 'pork', categoryLabel: 'Гахайн мах',
    image: '/assets/achmag/product-set-2.png',
    imageAlt: 'Порк самгёпсал',
    shortDesc: 'Хэрэглэгч өөрийн жорын дагуу амтлаж болох цэвэр гахайн хэвлийн мах.',
    detailDesc: 'Амтлалт нэмэлтгүй, цэвэр гахайн хэвлийн мах бөгөөд хэрэглэгч өөрийн дуртай жорын дагуу боловсруулах боломжтой. Тосны давхарга тэнцвэртэй байгаа тул шарахад гоё, шүүслэг болдог.',
    suitableFor: ['Гэр бүлийн хоол', 'BBQ, шарсан хоол', 'Өөрийн жор туршихад'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. 24 цагт хэрэглэхийг зөвлөнө.',
    productType: 'Цэвэр гахайн хэвлийн мах',
  },
  {
    id: 7,
    name: 'Жэюг',
    price: '15,000₮', priceNum: 15000,
    categoryKey: 'special', categoryLabel: 'Амталсан / тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.png',
    imageAlt: 'Жэюг — амталсан гахайн мах',
    shortDesc: 'Солонгосын жэюг жорыг үндэслэн, сармис, цайны хавтанаар амталсан гахайн мах.',
    detailDesc: 'Солонгосын уламжлалт жэюг жорыг үндэслэн боловсруулсан, цайны хавтан болон сармисаар амталсан гахайн мах. Халуун тогоо болон шарсан хоолд ашиглахад тохиромжтой бөгөөд гүнзгий амт, сайхан үнэртэй.',
    suitableFor: ['Монгол-Солонгос хоол', 'Ресторан', 'Гэр бүлийн хоол'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. 24 цагт хэрэглэнэ.',
    productType: 'Амталсан гахайн мах',
  },
  {
    id: 8,
    name: 'Зөөлөн тахиа',
    price: '17,500₮', priceNum: 17500,
    categoryKey: 'chicken', categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-3.png',
    imageAlt: 'Зөөлөн тахиа',
    badge: 'family',
    shortDesc: 'Зөөлөн, чанарт боловсруулалттай тахиа. Шөл, шарсан хоол аль алинд тохиромжтой.',
    detailDesc: 'Мэргэжлийн боловсруулалтаар хийгдсэн зөөлөн тахиа нь шөл чанах, шарах, жигнэх аль аргад тохиромжтой. Хүүхдийн хоол болон өдөр тутмын хоолонд өргөн хэрэглэгддэг, хялбар боловсруулалттай.',
    suitableFor: ['Өрхийн хоол', 'Хүүхдийн хоол', 'Шөл, хоол хийх'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. 2 хоногт хэрэглэнэ.',
    productType: 'Өдөр тутмын тахианы мах',
  },
  {
    id: 9,
    name: 'Тахианы гуя',
    price: '7,500₮', priceNum: 7500,
    categoryKey: 'chicken', categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-4.png',
    imageAlt: 'Тахианы гуя',
    shortDesc: 'Цэвэр тахианы гуяны мах. Өдөр тутмын хоолонд хамгийн өргөн хэрэглэгддэг.',
    detailDesc: 'Цэвэр боловсруулсан тахианы гуяны мах нь шарах, чанах, жигнэх аль аргад тохиромжтой. Эдийн засгийн хувьд ашигтай, хэрэглэхэд хялбар бөгөөд өдөр тутмын хоолонд хамгийн өргөн хэрэглэгддэг бүтээгдэхүүний нэг.',
    suitableFor: ['Өдөр тутмын хоол', 'Хүүхдийн хоол', 'Том хэмжээний захиалга'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. 2 хоногт хэрэглэнэ.',
    productType: 'Өдөр тутмын тахианы мах',
  },
  {
    id: 10,
    name: 'Тахианы мөч',
    price: '7,200₮', priceNum: 7200,
    categoryKey: 'chicken', categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-5.png',
    imageAlt: 'Тахианы мөч',
    shortDesc: 'Шарахад, буцалгахад аль алинд тохиромжтой тахианы мөчний мах.',
    detailDesc: 'Цэвэр боловсруулсан тахианы мөчний мах нь шарах, чанах аль аргаар ч гоё болдог. Хялбар боловсруулалт шаарддаг, хурдан хоол хийхэд тохиромжтой бөгөөд эдийн засгийн хувьд ашигтай.',
    suitableFor: ['Өдөр тутмын хоол', 'Ресторан', 'Хурдан хоол'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална.',
    productType: 'Өдөр тутмын тахианы мах',
  },
  {
    id: 11,
    name: 'Тахианы гуяны цул',
    price: '8,500₮', priceNum: 8500,
    categoryKey: 'chicken', categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-5.png',
    imageAlt: 'Тахианы гуяны цул',
    badge: 'business',
    shortDesc: 'Ясгүй тахианы гуяны цул мах. Ресторан болон байгууллагын хэрэгцээнд.',
    detailDesc: 'Ясгүй, цэвэрлэсэн тахианы гуяны цул мах нь ресторан болон өрхийн хэрэгцээнд тохиромжтой. Шарах, жигнэх, чанах аль аргаар ч хурдан, амттай болдог. Нийтийн хоол болон гэрийн хоолонд өргөн хэрэглэгддэг.',
    suitableFor: ['Ресторан, кафе', 'Гэр бүлийн хоол', 'Том хэмжээний захиалга'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. 2 хоногт хэрэглэнэ.',
    productType: 'Байгууллагын хэрэгцээний тахианы мах',
  },
  {
    id: 12,
    name: 'Тахианы цээж',
    price: '7,000₮', priceNum: 7000,
    categoryKey: 'chicken', categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-3.png',
    imageAlt: 'Тахианы цээжний мах',
    shortDesc: 'Өөх тосгүй, уургаар баялаг тахианы цээжний мах. Эрүүл хоолонд хамгийн тохиромжтой.',
    detailDesc: 'Өөх тосгүй, уургаар баялаг тахианы цээжний мах нь эрүүл хоолны дэглэм баримталдаг хэрэглэгчдэд хамгийн тохиромжтой. Спорт хооллолт, диет хоол болон өдөр тутмын хоолонд өргөн хэрэглэгддэг.',
    suitableFor: ['Эрүүл хооллолт', 'Спорт хооллолт', 'Хурдан хоол'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. 2 хоногт хэрэглэнэ.',
    productType: 'Өдөр тутмын тахианы мах',
  },
  {
    id: 13,
    name: 'Стейк',
    price: '14,500₮', priceNum: 14500,
    categoryKey: 'beef', categoryLabel: 'Үхрийн мах',
    image: '/assets/achmag/product-set-3.png',
    imageAlt: 'Стейк — үхрийн цул мах',
    badge: 'featured',
    shortDesc: 'Ресторан зэрэглэлийн, сонгосон үхрийн цул махаар хийсэн стейк.',
    detailDesc: 'Сонгосон үхрийн цул махаар хийсэн стейк нь ресторан болон гэрийн хоолонд аль алинд тохиромжтой. Зузааралт, мах сонголт нь гүйцэд хийгдсэн бөгөөд medium rare болон well done хоёуланд тохиромжтой.',
    suitableFor: ['Ресторан', 'Гэрийн тусгай хоол', 'Баяр найрын хоол'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. Нэгэнт нээсний дараа 24 цагт хэрэглэнэ.',
    productType: 'Шарж болгоход бэлэн үхрийн мах',
  },
  {
    id: 14,
    name: 'Мантуутай гахайн мах',
    price: '18,000₮', priceNum: 18000,
    categoryKey: 'special', categoryLabel: 'Амталсан / тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.png',
    imageAlt: 'Мантуутай гахайн мах',
    badge: 'featured',
    shortDesc: 'Монгол уламжлалт хоолтой хослуулах зориулалттай тусгай боловсруулалттай гахайн мах.',
    detailDesc: 'Мантуутай хослуулан хэрэглэхэд зориулсан, тусгай боловсруулалттай гахайн мах. Монгол хэрэглэгчдийн өдөр тутмын хоолтой хослоход хамгийн тохиромжтой бүтээгдэхүүн бөгөөд гэр бүлийн хоолонд өргөнөөр хэрэглэгддэг.',
    suitableFor: ['Монгол уламжлалт хоол', 'Гэр бүлийн хоол', 'Баяр найр'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална.',
    productType: 'Тусгай боловсруулалттай гахайн мах',
  },
  {
    id: 15,
    name: 'Хүнг шао роу',
    price: '21,000₮', priceNum: 21000,
    categoryKey: 'special', categoryLabel: 'Амталсан / тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-5.png',
    imageAlt: 'Хүнг шао роу',
    badge: 'featured',
    shortDesc: 'Хятадын уламжлалт жорыг үндэслэн, соёос, сармисаар амталсан тусгай гахайн мах.',
    detailDesc: 'Хятадын уламжлалт хүнг шао роу хоолны жорыг үндэслэн боловсруулсан, бэлэн болон хагас бэлэн байдалд нийлүүлдэг тусгай бүтээгдэхүүн. Соёос, сармис болон байгалийн амтлагчаар нэвтрүүлсэн, баян амт, зөөлөн бүтэцтэй.',
    suitableFor: ['Азийн хоолны ресторан', 'Тусгай хоол хийх', 'Баяр найрын хоол'],
    storageNote: 'Хөргөгчинд 0–4°C-д хадгална. Нэгэнт нээсний дараа 24 цагт хэрэглэнэ.',
    productType: 'Тусгай амталсан бүтээгдэхүүн',
  },
];

// ─── Badge config ─────────────────────────────────────────────────────────────
const BADGE_STYLE: Record<string, string> = {
  featured: 'badge-featured',
  popular:  'badge-popular',
  business: 'badge-business',
  family:   'badge-family',
};
const BADGE_LABEL: Record<string, string> = {
  featured: 'Онцлох',
  popular:  'Түгээмэл',
  business: 'Бизнест тохиромжтой',
  family:   'Гэр бүлд тохиромжтой',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProductsSection() {
  const [activeKey, setActiveKey] = useState<CategoryKey>('all');
  const [selected, setSelected]   = useState<Product | null>(null);
  const sectionRef                 = useRef<HTMLElement>(null);

  // Single stable filter — always reads from ALL_PRODUCTS, never from derived state
  const visible = useMemo<Product[]>(() => {
    if (activeKey === 'all') return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((p) => p.categoryKey === activeKey);
  }, [activeKey]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, el: HTMLDivElement | null) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    },
    []
  );

  const scrollToContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <section id="products" ref={sectionRef} className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-warm-dark mongolian-pattern" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px ornament-divider" />
        </div>

        {/* Animated beams */}
        <div className="absolute inset-0 pointer-events-none flex justify-between px-8 md:px-16">
          {[3, 1, 2].map((d) => (
            <div
              key={d}
              className={`relative w-px h-full overflow-hidden${d === 1 ? ' hidden lg:block' : ''}`}
              style={{ backgroundColor: 'rgba(200,75,17,0.04)' }}
            >
              <div className={`beam beam-delay-${d}`} />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12 scroll-reveal">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-4">
              <span className="w-6 h-px bg-accent" />
              Бүтээгдэхүүн
              <span className="w-6 h-px bg-accent" />
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
              Манай <span className="text-gradient">бүтээгдэхүүнүүд</span>
            </h2>
            <p className="text-cream-muted text-[15px] max-w-xl mx-auto leading-[1.8]" style={{ textAlign: 'justify' }}>
              Чанарын өндөр хяналттай, цэвэр боловсруулалттай 15 нэр төрлийн махан бүтээгдэхүүн.
              Өрх болон байгууллагын хэрэглэгч аль алинд тохиромжтой өргөн сонголт.
            </p>
          </div>

          {/* ─── Filter bar ─────────────────────────────────────────────── */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-12 scroll-reveal"
            style={{ transitionDelay: '0.1s' }}
            role="group"
            aria-label="Бүтээгдэхүүний ангилал"
          >
            {CATEGORIES.map(({ key, label }) => {
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  aria-pressed={isActive}
                  className={[
                    'filter-btn px-5 py-2.5 rounded-sm text-[13px] font-medium border',
                    'transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'active text-white border-transparent'
                      : 'text-cream-muted border-warm-light hover:border-primary/40 hover:text-cream',
                  ].join(' ')}
                  style={!isActive ? { backgroundColor: 'rgba(255,255,255,0.02)' } : undefined}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* ─── Product grid OR empty state ────────────────────────────── */}
          {visible.length === 0 ? (
            /* Safe empty state — never shows a blank area */
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              role="status"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(200,75,17,0.08)', border: '1px solid rgba(200,75,17,0.18)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary-light">
                  <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
                </svg>
              </div>
              <p className="text-cream-muted text-[15px] font-medium mb-2">
                Тухайн ангилалд бүтээгдэхүүн бүртгэгдээгүй байна.
              </p>
              <button
                onClick={() => setActiveKey('all')}
                className="mt-3 text-[13px] text-accent hover:text-primary-light underline underline-offset-4 transition-colors"
              >
                Бүх бүтээгдэхүүн харах
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visible.map((product, i) => {
                const cardRef = React.createRef<HTMLDivElement>();
                return (
                  <div
                    key={product.id}
                    ref={cardRef}
                    className="product-card spotlight-card bg-warm-card rounded-sm border overflow-hidden card-glow scroll-reveal"
                    style={{
                      borderColor: 'rgba(200,75,17,0.15)',
                      transitionDelay: `${(i % 4) * 0.07}s`,
                      '--mouse-x': '50%',
                      '--mouse-y': '50%',
                    } as React.CSSProperties}
                    onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <AppImage
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-warm-card/80 to-transparent" />

                      {product.badge && (
                        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-sm text-[10px] font-bold text-white tracking-wide ${BADGE_STYLE[product.badge]}`}>
                          {BADGE_LABEL[product.badge]}
                        </div>
                      )}

                      <div
                        className="absolute bottom-3 right-3 px-2 py-0.5 rounded-sm text-[10px] font-medium text-cream-muted backdrop-blur-sm"
                        style={{ backgroundColor: 'rgba(26,10,4,0.7)', border: '1px solid rgba(200,75,17,0.2)' }}
                      >
                        {product.categoryLabel}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <h3 className="font-display font-semibold text-cream text-[15px] leading-tight mb-1">
                          {product.name}
                        </h3>
                        <p className="text-[12px] text-cream-subtle line-clamp-2 leading-relaxed">
                          {product.shortDesc}
                        </p>
                      </div>
                      <div
                        className="flex items-center justify-between pt-2"
                        style={{ borderTop: '1px solid rgba(250,240,230,0.06)' }}
                      >
                        <span className="font-display font-bold text-primary-light text-lg">{product.price}</span>
                        <button
                          onClick={() => setSelected(product)}
                          className="px-3 py-1.5 text-[12px] font-semibold text-cream border rounded-sm hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
                          style={{ borderColor: 'rgba(200,75,17,0.3)' }}
                        >
                          Дэлгэрэнгүй
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center mt-14 scroll-reveal" style={{ transitionDelay: '0.2s' }}>
            <p className="text-cream-muted text-[14px] mb-5">
              Бөөний болон байгууллагын захиалгын нөхцөл, үнийн мэдээлэл авахыг хүсвэл холбоо барина уу.
            </p>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-gradient text-white font-semibold text-[14px] rounded-sm hover:shadow-warm transition-all duration-300 hover:-translate-y-0.5"
            >
              Захиалгын мэдээлэл авах
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ─── Product detail modal ──────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="modal-backdrop absolute inset-0" />
          <div
            className="relative z-10 w-full max-w-2xl rounded-sm border overflow-hidden shadow-warm-xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#1E0D06', borderColor: 'rgba(200,75,17,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div className="relative h-56 overflow-hidden">
              <AppImage
                src={selected.image}
                alt={selected.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 672px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E0D06] via-transparent to-transparent" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm border text-cream hover:text-white transition-colors"
                style={{ backgroundColor: 'rgba(26,10,4,0.7)', borderColor: 'rgba(200,75,17,0.3)' }}
                aria-label="Хаах"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
              {selected.badge && (
                <div className={`absolute top-4 left-4 px-2.5 py-1 rounded-sm text-[10px] font-bold text-white ${BADGE_STYLE[selected.badge]}`}>
                  {BADGE_LABEL[selected.badge]}
                </div>
              )}
            </div>

            {/* Modal content */}
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-cream mb-1">{selected.name}</h2>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold text-primary-light">{selected.price}</span>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-sm text-cream-subtle border"
                      style={{ borderColor: 'rgba(200,75,17,0.2)', backgroundColor: 'rgba(200,75,17,0.06)' }}
                    >
                      {selected.categoryLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5 p-3 rounded-sm" style={{ backgroundColor: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.2)' }}>
                <span className="text-[11px] text-accent font-semibold tracking-wide uppercase">Бүтээгдэхүүний төрөл: </span>
                <span className="text-[13px] text-cream-muted">{selected.productType}</span>
              </div>

              <div className="mb-5">
                <h3 className="text-[12px] font-semibold tracking-widest text-accent uppercase mb-2">Бүтээгдэхүүний онцлог</h3>
                <p className="text-cream-muted text-[14px] leading-[1.85]" style={{ textAlign: 'justify' }}>
                  {selected.detailDesc}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="text-[12px] font-semibold tracking-widest text-accent uppercase mb-2">Хэрэглэхэд тохиромжтой</h3>
                <div className="flex flex-wrap gap-2">
                  {selected.suitableFor.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-[12px] text-cream-muted rounded-sm border"
                      style={{ borderColor: 'rgba(200,75,17,0.2)', backgroundColor: 'rgba(200,75,17,0.06)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6 p-3 rounded-sm" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(250,240,230,0.06)' }}>
                <h3 className="text-[12px] font-semibold tracking-widest text-cream-subtle uppercase mb-1">Хадгалалт</h3>
                <p className="text-[13px] text-cream-subtle">{selected.storageNote}</p>
              </div>

              <button
                onClick={() => { setSelected(null); scrollToContact(); }}
                className="w-full py-3.5 bg-orange-gradient text-white font-semibold text-[14px] rounded-sm hover:shadow-warm transition-all duration-300"
              >
                Захиалга өгөх
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
