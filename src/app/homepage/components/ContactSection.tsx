'use client';

import React, { useEffect, useRef, useState } from 'react';

type FormState = { name: string; phone: string; message: string };
type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAILJS_SERVICE_ID = 'service_obum1ml';
const EMAILJS_TEMPLATE_ID = 'template_1jazuod';
const EMAILJS_PUBLIC_KEY = 'gHA-jWH5ADQaXNmRA';

function validate(f: FormState): string | null {
  if (!f.name.trim()) return 'Нэрээ оруулна уу.';
  if (!f.phone.trim()) return 'Утасны дугаараа оруулна уу.';
  if (f.phone.trim().replace(/\D/g, '').length < 8) return 'Утасны дугаар буруу байна.';
  if (!f.message.trim()) return 'Мэдэгдлээ бичнэ үү.';
  return null;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [fieldErr, setFieldErr] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((s) => ({ ...s, [field]: e.target.value }));
    if (fieldErr) setFieldErr(null);
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(form);
    if (err) {
      setFieldErr(err);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: form.name.trim(),
            phone: form.phone.trim(),
            message: form.message.trim(),
            reply_to: form.name.trim(),
          },
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const contactInfo = [
    {
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Утас',
      value: '7505-0506, 9907-3583',
      href: 'tel:75050506',
    },
    {
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: 'И-мэйл',
      value: 'achmagnaran@gmail.com',
      href: 'mailto:officer@achmagnaran.mn',
    },
    {
      svg: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Хаяг',
      value: 'Улаанбаатар, Сонгино хайрхан дүүрэг, 11-р хороо, АОС, 3-32 Б, Ачмаг Наран компаний байр',
      href: null,
    },
  ];

  const workingHours = [
    { label: 'Даваа–Баасан', value: '09:00–18:00' },
    { label: 'Бямба', value: '10:00–15:00' },
    { label: 'Ням', value: 'Амарна' },
  ];

  const inputStyle = {
    backgroundColor: 'rgba(26,10,4,0.6)',
    border: '1px solid rgba(200,75,17,0.2)',
  };

  const inputClass =
    'w-full px-4 py-3 rounded-sm text-[14px] text-cream placeholder-cream-subtle/40 outline-none transition-all duration-200 focus:border-primary/60 disabled:opacity-50';

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#1A0A04 0%,#221005 100%)' }} />
      <div className="absolute inset-0 mongolian-pattern pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px ornament-divider" />
      </div>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-64 opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #C84B11, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            <span className="w-6 h-px bg-accent" />
            Холбоо барих
            <span className="w-6 h-px bg-accent" />
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream leading-tight mb-4">
            Бидэнтэй <span className="text-gradient">холбогдох</span>
          </h2>
          <p className="text-cream-muted text-[15px] max-w-xl mx-auto leading-[1.85]" style={{ textAlign: 'justify' }}>
            Бүтээгдэхүүний захиалга, бөөний нийлүүлэлт, хамтын ажиллагааны санал болон бусад
            асуулгаар бидэнтэй холбоо барина уу. Ажлын 1–2 өдрийн дотор хариу өгнө.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-7">
            <div className="scroll-reveal" style={{ transitionDelay: '0.02s' }}>
              <h3 className="font-display font-semibold text-cream text-lg mb-5">Ажлын цаг</h3>
              <div
                className="p-4 rounded-sm border transition-all duration-250 hover:border-primary/35 hover:bg-primary/5"
                style={{ borderColor: 'rgba(200,75,17,0.14)', backgroundColor: 'rgba(34,16,5,0.5)' }}
              >
                <div className="flex flex-col gap-3">
                  {workingHours.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-4 border-b last:border-b-0 pb-3 last:pb-0" style={{ borderColor: 'rgba(200,75,17,0.10)' }}>
                      <span className="text-[13px] text-cream-subtle">{item.label}</span>
                      <span className="text-[14px] text-cream font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: '0.06s' }}>
              <h3 className="font-display font-semibold text-cream text-lg mb-5">Холбоо барих мэдээлэл</h3>
              <div className="flex flex-col gap-3">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 p-4 rounded-sm border transition-all duration-250 hover:border-primary/35 hover:bg-primary/5"
                    style={{ borderColor: 'rgba(200,75,17,0.14)', backgroundColor: 'rgba(34,16,5,0.5)' }}
                  >
                    <div
                      className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 text-primary-light"
                      style={{ backgroundColor: 'rgba(200,75,17,0.1)', border: '1px solid rgba(200,75,17,0.18)' }}
                    >
                      {info.svg}
                    </div>
                    <div>
                      <div className="text-[10px] text-cream-subtle uppercase tracking-widest font-semibold mb-1">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a href={info.href} className="text-[14px] text-cream hover:text-primary-light transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[14px] text-cream leading-snug">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroll-reveal" style={{ transitionDelay: '0.1s' }}>
              <h3 className="font-display font-semibold text-cream text-base mb-4">Сошиаля сүлжээ</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61557235019083"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-sm border text-[13px] font-medium text-cream-muted hover:text-cream hover:border-primary/35 hover:bg-primary/5 transition-all duration-250"
                  style={{ borderColor: 'rgba(200,75,17,0.18)', backgroundColor: 'rgba(34,16,5,0.5)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/achmagnaranllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-sm border text-[13px] font-medium text-cream-muted hover:text-cream hover:border-primary/35 hover:bg-primary/5 transition-all duration-250"
                  style={{ borderColor: 'rgba(200,75,17,0.18)', backgroundColor: 'rgba(34,16,5,0.5)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#E4405F">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="scroll-reveal" style={{ transitionDelay: '0.08s' }}>
            <div
              className="p-8 rounded-sm border"
              style={{ backgroundColor: 'rgba(34,16,5,0.6)', borderColor: 'rgba(200,75,17,0.18)' }}
            >
              <h3 className="font-display font-semibold text-cream text-xl mb-6">Хүсэлт илгээх</h3>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-primary-light"
                    style={{ backgroundColor: 'rgba(200,75,17,0.14)', border: '2px solid rgba(200,75,17,0.4)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-cream text-xl">Таны хүсэлт амжилттай илгээгдлээ!</h4>
                  <p className="text-cream-muted text-[14px] leading-relaxed max-w-xs">
                    Бид ажлын 1–2 өдрийн дотор тантай холбоо барих болно. Баярлалаа.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-1 text-[13px] text-cream-subtle hover:text-cream transition-colors underline underline-offset-4"
                  >
                    Дахин илгээх
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[11px] text-cream-subtle uppercase tracking-widest font-semibold mb-2">
                      Нэр <span className="text-primary-light">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Таны нэр"
                      required
                      disabled={status === 'loading'}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-cream-subtle uppercase tracking-widest font-semibold mb-2">
                      Утасны дугаар <span className="text-primary-light">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="9900 0000"
                      required
                      disabled={status === 'loading'}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-cream-subtle uppercase tracking-widest font-semibold mb-2">
                      Мэдэгдэл / Захиалга <span className="text-primary-light">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={handleChange('message')}
                      placeholder="Захиалгын дэлгэрэнгүй мэдээлэл, асуулт болон бусад мэдэгдлийг бичнэ үү..."
                      rows={5}
                      required
                      disabled={status === 'loading'}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  {fieldErr && (
                    <div
                      className="px-4 py-2.5 rounded-sm border text-[13px] text-yellow-300"
                      style={{ borderColor: 'rgba(253,224,71,0.25)', backgroundColor: 'rgba(253,224,71,0.06)' }}
                    >
                      {fieldErr}
                    </div>
                  )}

                  {status === 'error' && (
                    <div
                      className="px-4 py-2.5 rounded-sm border text-[13px] text-red-300"
                      style={{ borderColor: 'rgba(239,68,68,0.28)', backgroundColor: 'rgba(239,68,68,0.07)' }}
                    >
                      Алдаа гарлаа. Дахин оролдоно уу эсвэл утсаар холбоо барина уу.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-orange-gradient text-white font-semibold text-[15px] rounded-sm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Илгээж байна...
                      </>
                    ) : (
                      <>
                        Хүсэлт илгээх
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-cream-subtle/60 text-center">
                    Таны мэдээлэл нууцална. Бид таньд ажлын 1–2 өдрийн дотор хариу өгөх болно.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}