import React from 'react';
import { 
  ShieldCheck, 
  BadgePercent, 
  CreditCard, 
  Headphones, 
  Award, 
  CheckCircle2, 
  Zap, 
  FileCheck2 
} from 'lucide-react';
import { Language } from '../types';
import { STORE_CONTACT } from '../data/travelData';

interface WhyAlRafeeqProps {
  language: Language;
}

export const WhyAlRafeeq: React.FC<WhyAlRafeeqProps> = ({ language }) => {
  const pillars = [
    {
      icon: <BadgePercent className="w-6 h-6 text-[#DC2626]" />,
      titleAr: 'ضمان أفضل الأسعار والتوفير',
      titleEn: 'Best Price & Savings Guarantee',
      descAr: 'مقارنة حية لأسعار أكثر من 500 شركة طيران وآلاف الفنادق المعتمدة مع أسعار حصرية للمنصة بدون رسوم خفية.',
      descEn: 'Real-time fare comparison across 500+ airlines and certified hotels with transparent rates and no hidden fees.',
      tagAr: 'وفر حتى 30%',
      tagEn: 'Save up to 30%',
    },
    {
      icon: <Award className="w-6 h-6 text-[#DC2626]" />,
      titleAr: 'مرخص رسمياً من هيئة الطيران المدني',
      titleEn: 'GACA & Tourism Ministry Licensed',
      descAr: `حجوزاتك آمنة بموجب ترخيص الهيئة العامة للطيران المدني (${STORE_CONTACT.gacaLicense}) وترخيص وزارة السياحة بالسعودية.`,
      descEn: `Your bookings are legally backed by GACA License (${STORE_CONTACT.gacaLicense}) and Saudi Ministry of Tourism approval.`,
      tagAr: 'موثوق 100%',
      tagEn: '100% Verified',
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#DC2626]" />,
      titleAr: 'تقسيط مريح عبر تمارا وتابي',
      titleEn: 'Flexible 4-Installment Plans',
      descAr: 'قسّم تكلفة تذاكرك وإقاماتك على 4 دفعات شهرية ميسرة بدون أي فوائد أو رسوم إضافية عبر تابي وتمارا ومدى.',
      descEn: 'Split your travel cost into 4 monthly zero-interest payments with Tabby, Tamara, Apple Pay, and Mada.',
      tagAr: '0% فوائد',
      tagEn: '0% Interest',
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#DC2626]" />,
      titleAr: 'خدمة عملاء وخط ساخن 24/7',
      titleEn: '24/7 Local Saudi Support Hotline',
      descAr: `فريق استشاري سعودي متخصص في خدمتك ومساعدتك في تعديل أو استرجاع الحجوزات عبر الهاتف والواتساب (${STORE_CONTACT.phoneFormatted}).`,
      descEn: `Dedicated Saudi support specialists ready to assist with reservations, modifications, and emergency flights (${STORE_CONTACT.phoneFormatted}).`,
      tagAr: 'مباشر 24 ساعة',
      tagEn: '24/7 Direct',
    },
  ];

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-3 border-b border-[#334155]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-[rgba(220,38,38,0.15)] text-[#DC2626]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              {language === 'ar' ? 'معايير الثقة والتميز' : 'Trust & Value Standards'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight">
            {language === 'ar' ? 'لماذا يختار المسافرون الرفيق للسياحة؟' : 'Why Travelers Choose Al-Rafeeq?'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
          {language === 'ar'
            ? 'نقدم لك تجربة حجز متكاملة تجمع بين أفضل عروض الأسعار والاعتمادات الرسمية وأرقى معايير خدمة العملاء'
            : 'We provide an integrated booking experience combining premier rates, government licensing, and world-class care'}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 card-soft-glow flex flex-col justify-between transition-all duration-300 hover:border-[#DC2626]/40 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center justify-center shadow-inner">
                  {pillar.icon}
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#0F172A] border border-[#334155] text-[10px] font-bold text-[#DC2626]">
                  {language === 'ar' ? pillar.tagAr : pillar.tagEn}
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-[#F8FAFC] mb-2 leading-snug">
                {language === 'ar' ? pillar.titleAr : pillar.titleEn}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {language === 'ar' ? pillar.descAr : pillar.descEn}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#334155] flex items-center gap-1.5 text-[11px] text-[#DC2626] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>{language === 'ar' ? 'خدمة معتمدة ومضمونة' : 'Certified Service'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
