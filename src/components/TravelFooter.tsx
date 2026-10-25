import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Plane, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard,
  Clock,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { travelTranslations } from '../utils/travelTranslations';
import { STORE_CONTACT } from '../data/travelData';

interface TravelFooterProps {
  language: Language;
}

export const TravelFooter: React.FC<TravelFooterProps> = ({ language }) => {
  const t = travelTranslations[language];

  return (
    <footer className="bg-[#1E293B] border-t border-[#334155] text-[#94A3B8] text-xs pt-12 pb-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-10 border-b border-[#334155]">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A]/70 border border-[#334155]">
            <div className="p-2.5 rounded-xl bg-[rgba(220,38,38,0.12)] border border-[#DC2626]/20 text-[#DC2626] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8FAFC] text-sm">
                {language === 'ar' ? 'اعتماد هيئة الطيران (GACA)' : 'GACA Certified'}
              </h4>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                {t.gacaLicensed}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A]/70 border border-[#334155]">
            <div className="p-2.5 rounded-xl bg-[rgba(220,38,38,0.12)] border border-[#DC2626]/20 text-[#DC2626] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8FAFC] text-sm">
                {language === 'ar' ? 'ترخيص وزارة السياحة' : 'Ministry of Tourism'}
              </h4>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                {t.tourismLicensed}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A]/70 border border-[#334155]">
            <div className="p-2.5 rounded-xl bg-[rgba(220,38,38,0.12)] border border-[#DC2626]/20 text-[#DC2626] shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8FAFC] text-sm">
                {language === 'ar' ? 'تقسيط تابي وتمارا' : 'Tabby & Tamara'}
              </h4>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                {t.tamaraTabbyBadge}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0F172A]/70 border border-[#334155]">
            <div className="p-2.5 rounded-xl bg-[rgba(220,38,38,0.12)] border border-[#DC2626]/20 text-[#DC2626] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#F8FAFC] text-sm">
                {language === 'ar' ? 'دعم وحجوزات 24/7' : '24/7 Live Support'}
              </h4>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                {t.support247}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Hotline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center text-white">
                <Plane className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-[#F8FAFC]">
                {t.brandName}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#94A3B8]">
              {language === 'ar'
                ? 'منصة السفر والسياحة المتكاملة في المملكة العربية السعودية، نقدم حجوزات الطيران الداخلي والدولي والفنادق والشاليهات بأفضل الأسعار.'
                : 'Your comprehensive Saudi travel platform for domestic and international flights, luxury hotels, and private vacation chalets.'}
            </p>

            {/* Prominent Hotline */}
            <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#334155] space-y-2">
              <span className="text-[11px] text-[#94A3B8] font-medium block">
                {t.supportHotline}
              </span>
              <a
                href={`tel:${STORE_CONTACT.phone}`}
                className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC] hover:text-[#DC2626] transition-colors font-mono dir-ltr"
              >
                <Phone className="w-4 h-4 text-[#DC2626]" />
                <span>{STORE_CONTACT.phoneFormatted}</span>
              </a>
              <a
                href={`${STORE_CONTACT.whatsappUrl}${encodeURIComponent('مرحباً منصة الرفيق، أود الاستفسار وطلب حجز')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'محادثة فورية عبر الواتساب' : 'Chat via WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Travel Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#F8FAFC] text-sm">
              {language === 'ar' ? 'خدمات السفر' : 'Travel Services'}
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-[#F8FAFC] transition-colors cursor-pointer">{language === 'ar' ? 'حجوزات طيران الخطوط السعودية' : 'Saudia Flight Bookings'}</span></li>
              <li><span className="hover:text-[#F8FAFC] transition-colors cursor-pointer">{language === 'ar' ? 'طيران ناس وأديل الاقتصادي' : 'Flynas & Flyadeal Flights'}</span></li>
              <li><span className="hover:text-[#F8FAFC] transition-colors cursor-pointer">{language === 'ar' ? 'فنادق مكة المكرمة المطلة على الحرم' : 'Makkah Haram View Hotels'}</span></li>
              <li><span className="hover:text-[#F8FAFC] transition-colors cursor-pointer">{language === 'ar' ? 'فنادق المدينة المنورة المركزية' : 'Madinah Central Hotels'}</span></li>
              <li><span className="hover:text-[#F8FAFC] transition-colors cursor-pointer">{language === 'ar' ? 'شاليهات شمال الرياض والدرعية' : 'Riyadh Private Pool Chalets'}</span></li>
            </ul>
          </div>

          {/* Licenses & Official Accreditation */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#F8FAFC] text-sm">
              {language === 'ar' ? 'التراخيص والاعتمادات' : 'Licensing & Badges'}
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{language === 'ar' ? 'ترخيص الطيران المدني: GACA-LIC-78921' : 'GACA License: 78921'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{language === 'ar' ? 'ترخيص وزارة السياحة: MOT-LIC-44109' : 'Tourism License: 44109'}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.crNumber}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.vatNumber}</span>
              </li>
            </ul>
          </div>

          {/* Payment & Installments */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#F8FAFC] text-sm">
              {language === 'ar' ? 'بوابات الدفع والتقسيط' : 'Payments & Installments'}
            </h4>
            <p className="text-[11px] leading-relaxed">
              {language === 'ar'
                ? 'قسّم تذاكر الطيران والفنادق على 4 دفعات بدون فوائد مع تابي أو تمارا بكل يسر وأمان.'
                : 'Split all your travel bookings into 4 interest-free payments via Tabby and Tamara.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['مدى Mada', 'Apple Pay', 'Visa', 'Mastercard', 'Tamara', 'Tabby'].map((partner) => (
                <span
                  key={partner}
                  className="px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#334155] text-[10px] font-bold text-[#F8FAFC]"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>
            © 2026 {t.brandName} - {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}.
          </p>
          <div className="flex items-center gap-4 text-[#94A3B8]">
            <span>{STORE_CONTACT.addressAr}</span>
            <span>|</span>
            <a href={`tel:${STORE_CONTACT.phone}`} className="hover:text-[#DC2626] font-mono dir-ltr">
              {STORE_CONTACT.phoneFormatted}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
