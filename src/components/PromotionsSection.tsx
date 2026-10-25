import React, { useState } from 'react';
import { Tag, Sparkles, Check, ArrowRight, ArrowLeft, Clock, ShieldCheck, Percent } from 'lucide-react';
import { Language, Currency } from '../types';
import { PROMO_COUPONS } from '../data/travelData';

interface PromotionsSectionProps {
  language: Language;
  currency: Currency;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
}

export const PromotionsSection: React.FC<PromotionsSectionProps> = ({
  language,
  currency,
  appliedCoupon,
  onApplyCoupon,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleApply = (code: string) => {
    onApplyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const promoCards = [
    {
      code: 'RED26',
      discountTag: language === 'ar' ? 'خصم 20% فوري' : 'Instant 20% OFF',
      titleAr: 'عرض الموسم الحصري - تذاكر الطيران والفنادق',
      titleEn: 'Exclusive Season Deal - Flights & Hotels',
      descAr: 'استمتع بخصم 20% فوري على جميع حجوزات الطيران المحلي والدولي وفنادق الـ 5 نجوم',
      descEn: 'Enjoy 20% instant off all domestic and international flights and 5-star hotels',
      validityAr: 'صالح حتى 31 ديسمبر 2026',
      validityEn: 'Valid until Dec 31, 2026',
      badgeAr: 'الأكثر استخداماً 🔥',
      badgeEn: 'Most Popular 🔥',
      bgImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    },
    {
      code: 'ALRAFEEQ20',
      discountTag: language === 'ar' ? 'خصم 20% ترحيبي' : '20% Welcome Gift',
      titleAr: 'باقة عطلات شتاء السعودية والشاليهات',
      titleEn: 'Saudi Winter & Chalet Escapes',
      descAr: 'احجز شاليهات الرياض الخاصة بمسابح دافئة أو منتجعات العلا واستفد من الخصم الفوري',
      descEn: 'Book luxury heated-pool chalets in Riyadh or AlUla resorts with direct discount',
      validityAr: 'صالح على جميع الفئات',
      validityEn: 'Valid across all categories',
      badgeAr: 'عرض الشتاء ❄️',
      badgeEn: 'Winter Deal ❄️',
      bgImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    },
    {
      code: 'HOTEL100',
      discountTag: language === 'ar' ? 'خصم 100 ر.س' : '100 SAR OFF',
      titleAr: 'إقامات مكة والمدينة المنورة الفاخرة',
      titleEn: 'Makkah & Madinah Luxury Stays',
      descAr: 'خصم نقدي مباشر عند حجز إقامتك في الفنادق المطلة على الحرمين الشريفين',
      descEn: 'Direct instant cash discount when booking hotels overlooking the Holy Harams',
      validityAr: 'للإقامات فوق 600 ر.س',
      validityEn: 'Stays above 600 SAR',
      badgeAr: 'إقامات الحرمين 🕋',
      badgeEn: 'Holy Sites 🕋',
      bgImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-[#334155]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-[rgba(220,38,38,0.15)] text-[#DC2626]">
              <Tag className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              {language === 'ar' ? 'عروض وخصومات الرفيق الحصرية' : 'Exclusive Al-Rafeeq Offers'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight">
            {language === 'ar' ? 'قسائم التوفير والصفقات الموسمية' : 'Seasonal Deals & Promo Codes'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
          {language === 'ar'
            ? 'اضغط على زر التطبيق لتفعيل الخصم فوراً في حاسبة السعر وحجوزاتك الحالية'
            : 'Click apply to instantly activate the coupon discount on your current booking calculation'}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {promoCards.map((promo) => {
          const isApplied = appliedCoupon?.toUpperCase() === promo.code.toUpperCase();
          const isJustCopied = copiedCode === promo.code;

          return (
            <div
              key={promo.code}
              className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden card-soft-glow flex flex-col justify-between group transition-all duration-300 hover:border-[#DC2626]/50"
            >
              {/* Top Banner Image with Overlay */}
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={promo.bgImage}
                  alt={language === 'ar' ? promo.titleAr : promo.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/60 to-transparent"></div>

                {/* Badge */}
                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[11px] font-bold shadow-md shadow-red-950/40 flex items-center gap-1">
                  <Percent className="w-3 h-3" />
                  <span>{promo.discountTag}</span>
                </div>

                <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-medium border border-white/10">
                  {language === 'ar' ? promo.badgeAr : promo.badgeEn}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#F8FAFC] leading-snug mb-1.5">
                    {language === 'ar' ? promo.titleAr : promo.titleEn}
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {language === 'ar' ? promo.descAr : promo.descEn}
                  </p>
                </div>

                {/* Bottom Row with Coupon Code & Action */}
                <div className="pt-3 border-t border-[#334155] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 bg-[#0F172A] px-3 py-1.5 rounded-lg border border-[#334155] font-mono font-bold text-xs text-[#F8FAFC]">
                    <Sparkles className="w-3 h-3 text-[#DC2626]" />
                    <span>{promo.code}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApply(promo.code)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isApplied || isJustCopied
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40'
                        : 'btn-accent-red hover:shadow-[0_4px_16px_rgba(220,38,38,0.5)]'
                    }`}
                  >
                    {isApplied || isJustCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'تم التطبيق بنجاح' : 'Applied'}</span>
                      </>
                    ) : (
                      <>
                        <span>{language === 'ar' ? 'تطبيق الكود' : 'Apply Code'}</span>
                        {language === 'ar' ? (
                          <ArrowLeft className="w-3 h-3" />
                        ) : (
                          <ArrowRight className="w-3 h-3" />
                        )}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
