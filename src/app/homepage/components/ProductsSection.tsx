'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import AppImage from '@/components/ui/AppImage';

const CATEGORIES = [
  { key: 'all', label: 'Бүгд' },
  { key: 'sausage', label: 'Зайдас, хиам' },
  { key: 'pork', label: 'Гахайн мах' },
  { key: 'chicken', label: 'Тахианы мах' },
  { key: 'special', label: 'Амталсан тусгай бүтээгдэхүүн' },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]['key'];

interface Product {
  id: number;
  name: string;
  price: string;
  priceNum: number;
  weight: string; // ← ADDED
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
  origin: string;
  ingredients: string;
}

const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Франкфуртер шардаг зайдас',
    price: '13,000₮',
    priceNum: 14000,
    weight: '450гр', // ← ADDED (fill in your actual weights)
    categoryKey: 'sausage',
    categoryLabel: 'Зайдас, хиам',
    image: '/assets/achmag/product-set-1.1.png',
    imageAlt: 'Франкфуртер шардаг зайдас',
    badge: 'featured',
    shortDesc: 'Германы уламжлалт жорын дагуу боловсруулсан, шарахад бэлэн нитритгүй зайдас.',
    detailDesc:
      'Франкфуртер зайдас нь Германы уламжлалт жорын дагуу боловсруулсан, үхэр болон гахайн махаар үйлдвэрлэгдсэн дээд зэргийн чанартай зөөлөн, жигд бүтэцтэй бүтээгдэхүүн юм. Нитрит болон хугацаа уртасгагч агуулаагуй тул эрүүл мэндэд сөрөг нөлөөгүй. Грилдэх болон шарах, жигнэх аргаар болгож хэрэглэхэд тохиромжтой тул өдөр тутмын хэрэглээ болон түргэн хоолны шийдэлд төгс нийцнэ.',
    suitableFor: ['Өрхийн хэрэглээ', 'Ресторан, кафе', 'Арга хэмжээ', 'Аялал зугаалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Үхэр болон гахайн мах, амтлагч, байгалийн амт оруулагч',
  },
  {
    id: 2,
    name: 'Чоризо шардаг зайдас',
    price: '13,000₮',
    priceNum: 11500,
    weight: '450гр',
    categoryKey: 'sausage',
    categoryLabel: 'Зайдас, хиам',
    image: '/assets/achmag/product-set-1.2.png',
    imageAlt: 'Чоризо шардаг зайдас',
    badge: 'popular',
    shortDesc: 'Паприка болон байгалийн амтлагчаар боловсруулсан, тогтмол эрэлттэй зайдас.',
    detailDesc:
      'Испанийн уламжлалт чоризо жорыг суурь болгон, Монгол хэрэглэгчдийн амтанд нийцүүлэн тусгайлан амталж боловсруулсан зайдас юм. Паприка болон байгалийн гаралтай ногооны амтлагчтай хослуулсан халуун ногооны зөөлөн хурц амт нь онцгой мэдрэмж төрүүлнэ. Шарахад өөрийн улаан өнгийг тод гаргаж, хоолны үзэмжийг нэмэгдүүлдэг давуу талтай. Грилдэх болон шарах, жигнэх аргаар болгож хэрэглэхэд тохиромжтой тул өдөр тутмын хэрэглээ болон түргэн хоолны шийдэлд төгс нийцнэ.',
    suitableFor: ['Өрхийн хэрэглээ', 'Ресторан, кафе', 'Арга хэмжээ', 'Аялал зугаалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Гахайн мах, паприка, халуун ногоо, байгалийн амтлагч',
  },
  {
    id: 3,
    name: 'Гахайн махан зайдас',
    price: '13,000₮',
    priceNum: 11500,
    weight: '450гр',
    categoryKey: 'sausage',
    categoryLabel: 'Зайдас, хиам',
    image: '/assets/achmag/product-set-1.3.png',
    imageAlt: 'Гахайн махан зайдас',
    shortDesc: 'Хиймэл нэмэлтгүй, цэвэр гахайн махаар хийсэн байгалийн амттай зайдас.',
    detailDesc:
      'Нитрит болон химийн нэмэлт бодис агуулаагүй, зөвхөн цэвэр гахайн мах, байгалийн гаралтай амтлагчаар боловсруулсан зайдас. Байгалийн цэвэр бүтээгдэхүүнийг эрхэмлэдэг хэрэглэгчдэд тохиромжтой бөгөөд зөөлөн амт, энгийн орц нь өдөр тутмын хэрэглээ, тэр дундаа хүүхэд хэрэглэхэд тохиромжтой. Грилдэх болон шарах, жигнэх аргаар болгож хэрэглэхэд тохиромжтой тул өдөр тутмын хэрэглээ болон түргэн хоолны шийдэлд төгс нийцнэ.',
    suitableFor: ['Өрхийн хэрэглээ', 'Ресторан, кафе', 'Арга хэмжээ', 'Аялал зугаалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Цэвэр гахайн мах, давс, байгалийн амтлагч',
  },
  {
    id: 4,
    name: 'Гахайн утсан мах',
    price: '28,000₮',
    priceNum: 15500,
    weight: '450гр',
    categoryKey: 'sausage',
    categoryLabel: 'Зайдас, хиам',
    image: '/assets/achmag/product-set-1.4.png',
    imageAlt: 'Гахайн утсан мах',
    badge: 'business',
    shortDesc: 'Утаж боловсруулсан, шууд хэрэглэх болон хоолонд ашиглахад тохиромжтой бүтээгдэхүүн.',
    detailDesc:
      'Алимны модны утаагаар утсан, байгалийн жимслэг үнэртэй гахайн мах. Өглөөний цай, BBQ болон өдөр тутмын хоолонд тохиромжтой, гэр бүлийн бүх гишүүдэд зориулагдсан.',
    suitableFor: ['Өдөр тутмын хэрэглээ', 'Зууш', 'Ресторан, кафе'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Гахайн мах, утлагын амт оруулагч, давс, амтлагч',
  },
  {
    id: 5,
    name: 'Ханип',
    price: '21,800₮',
    priceNum: 20000,
    weight: '1.2кг',
    categoryKey: 'pork',
    categoryLabel: 'Гахайн мах',
    image: '/assets/achmag/product-set-2.1.png',
    imageAlt: 'Ханип — боловсруулсан гахайн мах',
    badge: 'business',
    shortDesc: 'Мэргэжлийн боловсруулалттай, нийтийн хоол болон бизнесийн хэрэгцээнд тохиромжтой.',
    detailDesc:
      '  Гахайн хуйхгүй цоройн махаар бэлтгэсэн, урьдчилан цэвэрлэж жигд зүсэлттэй тул шууд хэрэглэхэд бэлэн, цаг хэмнэх хялбар шийдэл. Чанарын хяналтын дор боловсруулсан учир зөөлөн бүтэц, тогтвортой амттай. Өдөр тутмын хоол болон аялал зугаалгад тохиромжтой бөгөөд шарах, хуурах, жигнэх, гриллдэх зэрэгт ашиглах боломжтой.',
    suitableFor: ['Өрхийн хэрэглээ', 'Ресторан, кафе', 'Аялал зугаалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Гахайн хуйхгуй цоройн мах',
  },
  {
    id: 6,
    name: 'Самгёмсал',
    price: '17,500₮',
    priceNum: 16500,
    weight: '1кг',
    categoryKey: 'pork',
    categoryLabel: 'Гахайн мах',
    image: '/assets/achmag/product-set-2.2.png',
    imageAlt: 'Самгёмсал',
    shortDesc: 'Хэрэглэгч өөрийн жорын дагуу амтлаж болох цэвэр гахайн хэвлийн мах.',
    detailDesc:
      ' Нэмэлт амталгаагүй, цэвэр гахайн цоройн мах бөгөөд хэрэглэгч өөрийн дуртай жор, амталгааны дагуу чөлөөтэй боловсруулж, өдөр тутмын хоол болон шарж хэрэглэхэд тохиромжтой. Өөх, махны давхарга тэнцвэртэй тул шарахад гадна талаараа шаржигнасан, дотроо шүүслэг, зөөлөн бүтэцтэй болдог. Байгалийн цэвэр амт, чанарыг хадгалсан тул гэрийн хоол болон зочин дайлахад ч тохиромжтой, найдвартай сонголт юм.',
    suitableFor: ['Өрхийн хоол', 'BBQ, шарсан хоол', 'Аялал зугаалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Гахайн цоройн мах',
  },
  {
    id: 7,
    name: 'Задгай самгёмсал',
    price: '16,500₮',
    priceNum: 17500,
    weight: '1кг',
    categoryKey: 'pork',
    categoryLabel: 'Гахайн мах',
    image: '/assets/achmag/product-set-2.3.png',
    imageAlt: 'Задгай самгёмсал',
    badge: 'business',
    shortDesc: 'Албан байгууллага, худалдааны төвүүдэд худалдан авахад тохиромжтой задгай бүтээгдэхүүн.',
    detailDesc:
      ' Нэмэлт амталгаагүй, цэвэр гахайн цоройн мах бөгөөд хэрэглэгч өөрийн дуртай жор, амталгааны дагуу чөлөөтэй боловсруулж, өдөр тутмын хоол болон шарж хэрэглэхэд тохиромжтой. Өөх, махны давхарга тэнцвэртэй тул шарахад гадна талаараа шаржигнасан, дотроо шүүслэг, зөөлөн бүтэцтэй болдог. Байгалийн цэвэр амт, чанарыг хадгалсан тул гэрийн хоол болон зочин дайлахад ч тохиромжтой, найдвартай сонголт юм./Байгууллага болон хувь хүн их савалгаагүй их хэмжээгээр авахад тохиромжтой/',
    suitableFor: ['Өрхийн хоол', 'BBQ, шарсан хоол', 'Аялал зугаалга', 'Арга хэмжээ'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Цэвэр гахайн мах',
  },
  {
    id: 8,
    name: 'Гахайн гуяны мах',
    price: '17,500₮',
    priceNum: 16000,
    weight: '1кг',
    categoryKey: 'pork',
    categoryLabel: 'Гахайн мах',
    image: '/assets/achmag/product-set-2.4.png',
    imageAlt: 'Гахайн гуяны мах',
    badge: 'family',
    shortDesc: 'Тослог багатай, өдөр тутмын хоолонд тохиромжтой гахайн мах.',
    detailDesc:
      'Тослог багатай, өдөр тутмын хоолонд тохиромжтой. Ресторан, албан байгууллага болон гэр бүлийн хэрэглээнд нийцсэн, шарах, чанах, жигнэхэд тохиромжтой мах.',
    suitableFor: ['Өрхийн хоол', 'BBQ, шарсан хоол', 'Аялал зугаалга', 'Арга хэмжээ'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'ОХУ',
    origin: 'Монгол',
    ingredients: 'Гахайн гуяны мах',
  },
  {
    id: 9,
    name: 'Бугалга',
    price: '7,500₮',
    priceNum: 17500,
    weight: '1кг',
    categoryKey: 'chicken',
    categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-3.1.png',
    imageAlt: 'Бугалга',
    badge: 'family',
    shortDesc: 'Шарах, чанах аргаар болгоход тохиромжтой, хүүхдэд илүү тохиромжтой тахианы мах.',
    detailDesc:
      'Тахианы бугалга нь өөх, махны тэнцвэртэй бүтэцтэй тул шүүслэг, амтлаг бөгөөд шарах, жигнэх зэрэг бүх төрлийн хоолонд тохиромжтой, өргөн хэрэглээний мах юм. Мөн амьтныг хүмүүнлэг аргаар нядалж бэлтгэсэн, органик, антибиотикгүй түүхий эдээр үйлдвэрлэгдсэн тул хэрэглэгчдэд илүү аюулгүй, чанартай сонголт юм.',
    suitableFor: ['Өрхийн хэрэглээ', 'Ресторан, кафе'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'БНХАУ',
    origin: 'Монгол',
    ingredients: 'Цэвэр тахианы мах',
  },
  {
    id: 10,
    name: 'Тахианы гуя',
    price: '7,500₮',
    priceNum: 7500,
    weight: '1кг',
    categoryKey: 'chicken',
    categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-3.2.png',
    imageAlt: 'Тахианы гуя',
    shortDesc: 'Цэвэр боловсруулсан, антибиотикгүй тахиа.',
    detailDesc:
      'Тахиан гуяны мах нь яслаг бүтэцтэй, өөх махны зохистой харьцаатай тул шүүслэг, баялаг амттай бөгөөд шарах, жигнэх, грилл хийхэд тохиромжтой.Мөн амьтныг хүмүүнлэг аргаар нядалж бэлтгэсэн, органик, антибиотикгүй түүхий эдээр үйлдвэрлэгдсэн тул хэрэглэгчдэд илүү аюулгүй, чанартай сонголт юм.',
    suitableFor: ['Өдөр тутмын хоол', 'Хүүхдийн хоол', 'Том хэмжээний захиалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'БНХАУ',
    origin: 'Монгол',
    ingredients: 'Цэвэр тахианы мах',
  },
  {
    id: 11,
    name: 'Тахианы мөч',
    price: '7,500₮',
    priceNum: 7200,
    weight: '1кг',
    categoryKey: 'chicken',
    categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-3.3.png',
    imageAlt: 'Тахианы мөч',
    shortDesc: 'Гэр бүл, ресторан, албан байгууллагад тохиромжтой, хэрэглэхэд хялбар, антибиотикгүй.',
    detailDesc:
      'Тахианы мөч нь яс, мах, арьсны зохистой харьцаатай тул шүүслэг, баялаг амттай бөгөөд шарах, жигнэх, грилл хийх зэрэгт нэн тохиромжтой, өргөн хэрэглээний мах юм. Мөн амьтныг хүмүүнлэг аргаар бэлтгэсэн, органик, антибиотикгүй түүхий эдээр үйлдвэрлэгдсэн тул хэрэглэгчдэд илүү аюулгүй, чанартай сонголт юм.',
    suitableFor: ['Гэр бүл', 'Ресторан', 'Албан байгууллага'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'БНХАУ',
    origin: 'Монгол',
    ingredients: 'Цэвэр тахианы мах',
  },
  {
    id: 12,
    name: 'Тахианы гуяны цул',
    price: '8,900₮',
    priceNum: 8500,
    weight: '1кг',
    categoryKey: 'chicken',
    categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-3.4.png',
    imageAlt: 'Тахианы гуяны цул',
    badge: 'business',
    shortDesc: 'Гэр бүлийн болон албан байгууллагын хэрэгцээнд тохиромжтой ясгүй тахианы мах.',
    detailDesc:
      'Тахиан гуяны цул мах нь ясгүй, цэвэр зөөлөн бүтэцтэй бөгөөд өөх, махны тэнцвэртэй харьцаатай тул шүүслэг, баялаг амттай. Шарах, жигнэх, хуурах зэрэг бүх төрлийн хоолонд тохиромжтой, амтлагчийг сайн шингээдэг давуу талтай. Мөн амьтныг хүмүүнлэг аргаар бэлтгэсэн, органик, антибиотикгүй түүхий эдээр үйлдвэрлэгдсэн тул хэрэглэгчдэд илүү аюулгүй, чанартай сонголт юм.',
    suitableFor: ['Гэр бүлийн хоол', 'Албан байгууллага', 'Том хэмжээний захиалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'БНХАУ',
    origin: 'Монгол',
    ingredients: 'Цэвэр тахианы мах',
  },
  {
    id: 13,
    name: 'Тахианы цээж',
    price: '7,300₮',
    priceNum: 7000,
    weight: '1кг',
    categoryKey: 'chicken',
    categoryLabel: 'Тахианы мах',
    image: '/assets/achmag/product-set-3.5.png',
    imageAlt: 'Тахианы цээжний мах',
    shortDesc: 'Өөх тосгүй, уургаар баялаг тахианы цээжний мах. Эрүүл хоолонд хамгийн тохиромжтой.',
    detailDesc:
      'Тахиан цээж мах нь өөх тос багатай, цэвэр уураг ихтэй тул хөнгөн, эрүүл хооллолтод нэн тохиромжтой. Зөөлөн бүтэцтэй, амтлагчийг сайн шингээдэг учир шарах, жигнэх, чанах зэрэг бүх төрлийн хоолонд өргөн хэрэглэгддэг. Мөн амьтныг хүмүүнлэг аргаар бэлтгэсэн, органик, антибиотикгүй түүхий эдээр үйлдвэрлэгдсэн тул хэрэглэгчдэд илүү аюулгүй, чанартай сонголт юм.',
    suitableFor: ['Эрүүл хооллолт', 'Спорт хооллолт', 'Хурдан хоол'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'БНХАУ',
    origin: 'Монгол',
    ingredients: 'Цэвэр тахианы мах',
  },
  {
    id: 14,
    name: 'Амталсан самгёбсал',
    price: '19,500₮',
    priceNum: 18000,
    weight: '500г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.1.png',
    imageAlt: 'Амталсан самгёбсал',
    badge: 'featured',
    shortDesc: 'Солонгос уламжлалт самгёмсалын жорыг үндэслэн амталсан гахайн хэвлийн мах.',
    detailDesc:
      'Солонгос уламжлалт самгёмсалын жорыг үндэслэн боловсруулсан гахайн хэвлийн мах. Халуун чинжүү болон байгалийн амтлагчаар амталсан тул шарахад шүүслэг, баялаг амттай болдог.',
    suitableFor: ['Гэр бүлийн хоол', 'BBQ, найзуудтай цуглаан', 'Ресторан'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан тусгай бүтээгдэхүүн',
    origin: 'Монгол',
    ingredients: 'Гахайн хэвлийн мах, халуун чинжүү, байгалийн амтлагч',
  },
  {
    id: 15,
    name: 'Жэюүг',
    price: '15,000₮',
    priceNum: 15000,
    weight: '500г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.2.png',
    imageAlt: 'Жэюүг',
    shortDesc: 'Солонгос уламжлалт жороор амталсан, хэрэглэгчдэд танигдсан бүтээгдэхүүн.',
    detailDesc:
      'Солонгос уламжлалт жороор амталсан, 11 жилийн турш үйлдвэрлэгдэж байгаа, хэрэглэгчдэд танигдсан бүтээгдэхүүн. Шарах болон хуурах аргаар болгоход тохиромжтой, амт үнэр сайтай.',
    suitableFor: ['Гэр бүл', 'Аялал зугаалга', 'Албан байгууллага'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан тусгай бүтээгдэхүүн',
    origin: 'Монгол',
    ingredients: 'Гахайн мах, сармис, солонгос амтлагч, байгалийн амт оруулагч',
  },
  {
    id: 16,
    name: 'Стейк (гахайн мах)',
    price: '14,500₮',
    priceNum: 14500,
    weight: '300г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.3.png',
    imageAlt: 'Стейк (гахайн мах)',
    badge: 'featured',
    shortDesc: 'Сонгосон гахайн махаар бэлтгэсэн, шарахад тохиромжтой стейк.',
    detailDesc:
      'Сонгосон гахайн махаар бэлтгэсэн стейк нь шарахад тохиромжтой, өрх болон ресторан аль алинд нь ашиглах боломжтой бүтээгдэхүүн юм. Зөөлөн бүтэцтэй бөгөөд амтлагч багцтайгаа зохицсон.',
    suitableFor: ['Ресторан', 'Гэрийн тусгай хоол', 'Баяр найрын хоол'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан тусгай бүтээгдэхүүн',
    origin: 'Монгол',
    ingredients: 'Гахайн мах, давс, хар перец, амтлагч',
  },
  {
    id: 17,
    name: 'Моксал',
    price: '14,000₮',
    priceNum: 18000,
    weight: '500г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.4.png',
    imageAlt: 'Моксал',
    shortDesc: 'Тусгай Korean BBQ sauce-аар амталсан шүүслэг, зөөлөн гахайн хүзүү.',
    detailDesc:
      'Гахайн хүзүүг тусгайлан бэлтгэсэн Korean BBQ sauce-аар амталж бэлтгэсэн. Энэхүү бүтээгдэхүүн нь шарахад шүүслэг, зөөлөн амтыг мэдрүүлнэ.',
    suitableFor: ['Гэр бүл', 'Аялал зугаалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан гахайн хүзүү',
    origin: 'Монгол',
    ingredients: 'Гахайн хүзүү, Korean BBQ sauce, сармис, амтлагч',
  },
  {
    id: 18,
    name: 'Хамбагу',
    price: '18,100₮',
    priceNum: 13500,
    weight: '400г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.5.png',
    imageAlt: 'Хамбагу',
    shortDesc: 'Шарахад хялбар, өдөр тутмын болон түргэн хоолны хэрэглээнд тохиромжтой бүтээгдэхүүн.',
    detailDesc:
      'Хамбагу нь сонгомол мах, амтлагчийн тэнцвэртэй хольцоор бэлтгэсэн, шарахад хялбар бүтээгдэхүүн. Талхтай, будаатай, нухаштай болон олон төрлийн хачиртай зохицно.',
    suitableFor: ['Гэр бүлийн хоол', 'Кафе, түргэн хоол', 'Өдөр тутмын хэрэглээ'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан тусгай бүтээгдэхүүн',
    origin: 'Монгол',
    ingredients: 'Гахайн мах, сонгино, давс, хар перец, амтлагч',
  },
  {
    id: 19,
    name: 'Хамбагу мини стейк',
    price: '18,100₮',
    priceNum: 12500,
    weight: '250г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.6.png',
    imageAlt: 'Хамбагу мини стейк',
    shortDesc: 'Жижиг хэмжээтэй, хурдан болдог, хүүхэд болон өдөр тутмын хэрэглээнд тохиромжтой.',
    detailDesc:
      'Хамбагу мини стейк нь жижиг хэмжээтэй тул шарахад хурдан, хэрэглэхэд хялбар. Хүүхдийн хоол, бенто, өглөөний цай, түргэн хоолны хэрэглээнд тохиромжтой.',
    suitableFor: ['Хүүхдийн хоол', 'Өдөр тутмын хэрэглээ', 'Түргэн хоол'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан тусгай бүтээгдэхүүн',
    origin: 'Монгол',
    ingredients: 'Гахайн мах, сонгино, давс, амтлагч',
  },
  {
    id: 20,
    name: 'Мантуутай гахайн мах',
    price: '17,500₮',
    priceNum: 18000,
    weight: '500г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.7.png',
    imageAlt: 'Мантуутай гахайн мах',
    badge: 'family',
    shortDesc: 'Мантуутай хослуулан хэрэглэхэд тохиромжтой, тусгай боловсруулалттай гахайн мах.',
    detailDesc:
      'Мантуутай хослуулан хэрэглэхэд зориулсан, тусгай боловсруулалттай гахайн мах. Монгол хэрэглэгчдийн өдөр тутмын хоолтой хослоход хамгийн тохиромжтой бүтээгдэхүүн бөгөөд гэр бүлийн хоолонд өргөн хэрэглэгддэг.',
    suitableFor: ['Гэр бүл', 'Аялал зугаалга', 'Баяр ёслол'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан тусгай бүтээгдэхүүн',
    origin: 'Монгол',
    ingredients: 'Гахайн мах, сармис, сонгино, давс, амтлагч',
  },
  {
    id: 22,
    name: 'Тахиан амталсан мах',
    price: '12,500₮',
    priceNum: 12500,
    weight: '500г',
    categoryKey: 'special',
    categoryLabel: 'Амталсан тусгай бүтээгдэхүүн',
    image: '/assets/achmag/product-set-4.8.png',
    imageAlt: 'Тахиан амталсан мах',
    badge: 'featured',
    shortDesc: 'Тусгай жороор амталж, шарахад бэлэн болгосон шүүслэг тахианы мах.',
    detailDesc:
      'Тусгай жороор амталсан, шарахад бэлэн тахианы мах. Гэр бүлийн хоол, шарсан тахиа, аялал зугаалганд хэрэглэхэд тохиромжтой, амтлаг, шүүслэг бүтээгдэхүүн.',
    suitableFor: ['Гэр бүлийн хоол', 'BBQ, шарсан тахиа', 'Аялал зугаалга'],
    storageNote: '0–18°C-д хадгална.',
    productType: 'Амталсан тусгай бүтээгдэхүүн',
    origin: 'Монгол',
    ingredients: 'Тахианы мах, солонгос амтлагч, сармис, сонгино, байгалийн амт оруулагч',
  },
];

const BADGE_STYLE: Record<string, string> = {
  featured: 'badge-featured',
  popular: 'badge-popular',
  business: 'badge-business',
  family: 'badge-family',
};

const BADGE_LABEL: Record<string, string> = {
  featured: 'Онцлох',
  popular: 'Түгээмэл',
  business: 'Бизнест тохиромжтой',
  family: 'Гэр бүлд тохиромжтой',
};

export default function ProductsSection() {
  const [activeKey, setActiveKey] = useState<CategoryKey>('all');
  const [selected, setSelected] = useState<Product | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
              Чанарын өндөр хяналтан дор боловсруулсан олон нэр төрлийн махан бүтээгдэхүүнийг санал болгож байна.
              Айл өрх болон байгууллагын хэрэглээнд аль алинд тохиромжтой өргөн сонголттой бараа бүтээгдэхүүн санал болгодог.
            </p>
          </div>

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

          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center" role="status">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: 'rgba(200,75,17,0.08)', border: '1px solid rgba(200,75,17,0.18)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary-light">
                  <path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" />
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
            <div key={activeKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {visible.map((product, i) => {
                const cardRef = React.createRef<HTMLDivElement>();
                return (
                  <div
                    key={product.id}
                    ref={cardRef}
                    className="product-card spotlight-card bg-warm-card rounded-sm border overflow-hidden card-glow product-card-enter"
                    style={{
                      borderColor: 'rgba(200,75,17,0.15)',
                      animationDelay: `${(i % 8) * 0.05}s`,
                      '--mouse-x': '50%',
                      '--mouse-y': '50%',
                    } as React.CSSProperties}
                    onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
                  >
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

                    <div className="p-4 flex flex-col gap-3">
                      <div>
                        <h3 className="font-display font-semibold text-cream text-[15px] leading-tight mb-1">
                          {product.name} <span className="text-cream-muted opacity-60">\ {product.weight}</span>
                        </h3>
                        <p className="text-[12px] text-cream-subtle line-clamp-2 leading-relaxed">
                          {product.shortDesc}
                        </p>
                      </div>

                      <div
                        className="flex items-center justify-between pt-2"
                        style={{ borderTop: '1px solid rgba(250,240,230,0.06)' }}
                      >
                        {/* ← CHANGED: price + weight stacked */}
                        <div className="flex flex-col gap-0.5">
                          <span className="font-display font-bold text-primary-light text-lg">
                            {product.price}
                          </span>
                          <span className="text-[11px] text-cream-muted opacity-60">
                            {product.weight}
                          </span>
                        </div>
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

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
            <div
              className="relative h-[360px] md:h-[460px] overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: '#241109' }}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  className="w-full h-full object-cover scale-110"
                  style={{ filter: 'blur(22px)', opacity: 0.35, transform: 'scale(1.12)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(to bottom, rgba(30,13,6,0.48), rgba(30,13,6,0.18) 24%, rgba(30,13,6,0.18) 76%, rgba(30,13,6,0.58)),
                      linear-gradient(to right, rgba(30,13,6,0.52), rgba(30,13,6,0.08) 18%, rgba(30,13,6,0.08) 82%, rgba(30,13,6,0.52))
                    `,
                  }}
                />
              </div>

              <div className="relative z-10 w-full h-full flex items-center justify-center px-6 md:px-10 py-6 md:py-8">
                <img
                  src={selected.image}
                  alt={selected.imageAlt}
                  className="max-w-full max-h-full object-contain block"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>

              <div
                className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(30,13,6,0.92), rgba(30,13,6,0))' }}
              />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm border text-cream hover:text-white transition-colors"
                style={{ backgroundColor: 'rgba(26,10,4,0.7)', borderColor: 'rgba(200,75,17,0.3)' }}
                aria-label="Хаах"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>

              {selected.badge && (
                <div className={`absolute top-4 left-4 z-20 px-2.5 py-1 rounded-sm text-[10px] font-bold text-white ${BADGE_STYLE[selected.badge]}`}>
                  {BADGE_LABEL[selected.badge]}
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-cream mb-1">
                    {selected.name} <span className="text-[16px] text-cream-muted opacity-60">\ {selected.weight}</span>
                  </h2>
                  {/* ← CHANGED: weight inline next to price */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-primary-light">
                      {selected.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <div
                  className="p-3 rounded-sm"
                  style={{ backgroundColor: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.2)' }}
                >
                  <span className="text-[11px] text-accent font-semibold tracking-wide uppercase">
                    Түүхий эдийн гарал үүсэл:
                  </span>{' '}
                  <span className="text-[13px] text-cream-muted">{selected.productType}</span>
                </div>
                <div
                  className="p-3 rounded-sm"
                  style={{ backgroundColor: 'rgba(212,168,83,0.07)', border: '1px solid rgba(212,168,83,0.2)' }}
                >
                  <span className="text-[11px] text-accent font-semibold tracking-wide uppercase">
                    Үйлдвэрлсэн газар:
                  </span>{' '}
                  <span className="text-[13px] text-cream-muted">{selected.origin}</span>
                </div>
              </div>

              <div
                className="mb-5 p-3 rounded-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(250,240,230,0.06)' }}
              >
                <h3 className="text-[12px] font-semibold tracking-widest text-cream-subtle uppercase mb-1">
                  Орц
                </h3>
                <p className="text-[13px] text-cream-subtle">{selected.ingredients}</p>
              </div>

              <div className="mb-5">
                <h3 className="text-[12px] font-semibold tracking-widest text-accent uppercase mb-2">
                  Бүтээгдэхүүний онцлог
                </h3>
                <p className="text-cream-muted text-[14px] leading-[1.85]" style={{ textAlign: 'justify' }}>
                  {selected.detailDesc}
                </p>
              </div>

              <div className="mb-5">
                <h3 className="text-[12px] font-semibold tracking-widest text-accent uppercase mb-2">
                  Хэрэглэхэд тохиромжтой
                </h3>
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

              <div
                className="mb-6 p-3 rounded-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(250,240,230,0.06)' }}
              >
                <h3 className="text-[12px] font-semibold tracking-widest text-cream-subtle uppercase mb-1">
                  Хадгалалт
                </h3>
                <p className="text-[13px] text-cream-subtle">{selected.storageNote}</p>
              </div>

              <button
                onClick={() => {
                  setSelected(null);
                  scrollToContact();
                }}
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