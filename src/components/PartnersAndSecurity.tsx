import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, Plane, CreditCard, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface PartnersAndSecurityProps {
  language: Language;
}

export const PartnersAndSecurity: React.FC<PartnersAndSecurityProps> = ({ language }) => {
  const airlines = [
    { nameAr: 'الخطوط السعودية', nameEn: 'SAUDIA', code: 'SV' },
    { nameAr: 'طيران ناس', nameEn: 'flynas', code: 'XY' },
    { nameAr: 'طيران أديل', nameEn: 'flyadeal', code: 'F3' },
    { nameAr: 'طيران الإمارات', nameEn: 'Emirates', code: 'EK' },
    { nameAr: 'الخطوط القطرية', nameEn: 'Qatar Airways', code: 'QR' },
    { nameAr: 'الخطوط التركية', nameEn: 'Turkish Airlines', code: 'TK' },
  ];

  const paymentMethods = [
    { nameAr: 'مدى', nameEn: 'Mada', badge: 'بطاقة الدفع الوطنية' },
    { nameAr: 'أبل باي', nameEn: 'Apple Pay', badge: 'دفع بيومتري آمن' },
    { nameAr: 'فيزا', nameEn: 'Visa', badge: 'دولي ومحلي' },
    { nameAr: 'ماستركارد', nameEn: 'Mastercard', badge: 'حماية عالمية' },
    { nameAr: 'تمارا', nameEn: 'Tamara', badge: '4 دفعات 0% فوائد' },
    { nameAr: 'تابي', nameEn: 'Tabby', badge: 'تقسيط ميسر' },
  ];

  return (
    <section className="mb-14">
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 sm:p-8 card-soft-glow space-y-8">
        
        {/* Airlines Row */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#334155]">
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-[#DC2626]" />
              <h3 className="font-bold text-sm sm:text-base text-[#F8FAFC]">
                {language === 'ar' ? 'شركاء الطيران العالميون والمحليون' : 'Authorized Airline Partners'}
              </h3>
            </div>
            <span className="text-xs text-[#94A3B8]">
              {language === 'ar' ? 'ربط إلكتروني مباشر وتأكيد فوري' : 'Direct GDS Integration'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {airlines.map((air) => (
              <div
                key={air.code}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-center transition-all duration-300 hover:border-[#DC2626]/40 hover:scale-[1.02]"
              >
                <span className="block font-mono text-xs font-bold text-[#DC2626] mb-0.5">
                  [{air.code}]
                </span>
                <span className="font-bold text-xs text-[#F8FAFC] block">
                  {language === 'ar' ? air.nameAr : air.nameEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payments Row */}
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#334155]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#DC2626]" />
              <h3 className="font-bold text-sm sm:text-base text-[#F8FAFC]">
                {language === 'ar' ? 'بوابات الدفع الإلكتروني والتقسيط المعتمدة' : 'Verified Payment & Installment Gateways'}
              </h3>
            </div>
            <span className="text-xs text-[#94A3B8]">
              {language === 'ar' ? 'متوافق مع البنك المركزي السعودي' : 'SAMA Compliant'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {paymentMethods.map((pay) => (
              <div
                key={pay.nameEn}
                className="bg-[#0F172A] border border-[#334155] rounded-xl p-3 text-center transition-all duration-300 hover:border-[#DC2626]/40 hover:scale-[1.02]"
              >
                <span className="font-black text-sm text-[#F8FAFC] block mb-0.5">
                  {language === 'ar' ? pay.nameAr : pay.nameEn}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-medium block">
                  {pay.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Security & Encryption Banner */}
        <div className="pt-4 border-t border-[#334155] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8FAFC]">
                {language === 'ar' ? 'حماية مصرفية وتشفير كامل للبيانات (256-Bit SSL)' : 'Bank-Grade 256-Bit SSL Security'}
              </h4>
              <p className="text-[11px] text-[#94A3B8]">
                {language === 'ar'
                  ? 'جميع المعاملات المالية محمية وفق أعلى معايير الأمان المالي PCI-DSS وشهادات الحماية العالمية'
                  : 'All transactions adhere to PCI-DSS payment card industry security standards.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#334155] text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PCI-DSS Verified</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#334155] text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SSL 256-Bit</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
