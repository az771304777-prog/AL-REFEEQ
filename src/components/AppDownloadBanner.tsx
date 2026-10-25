import React from 'react';
import { Smartphone, QrCode, Bell, Zap, Gift, ShieldCheck, Download, Star } from 'lucide-react';
import { Language } from '../types';

interface AppDownloadBannerProps {
  language: Language;
}

export const AppDownloadBanner: React.FC<AppDownloadBannerProps> = ({ language }) => {
  return (
    <section className="mb-14">
      <div className="relative bg-gradient-to-r from-[#1E293B] via-[#1E293B] to-[#0F172A] border border-[#334155] rounded-xl p-6 sm:p-8 lg:p-10 card-soft-glow overflow-hidden">
        {/* Accent background glow */}
        <div className="absolute top-0 -left-20 w-80 h-80 bg-[#DC2626]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text Column */}
          <div className="space-y-4 max-w-2xl text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(220,38,38,0.15)] border border-[#DC2626]/30 text-[#DC2626] text-xs font-bold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تطبيق الرفيق الذكي للهواتف' : 'Al-Rafeeq Mobile App'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#F8FAFC] tracking-tight leading-tight">
              {language === 'ar' ? (
                <>
                  سافر بذكاء وراحة تامة مع <span className="text-[#DC2626]">تطبيق الرفيق VIP</span>
                </>
              ) : (
                <>
                  Travel smarter with <span className="text-[#DC2626]">Al-Rafeeq VIP App</span>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {language === 'ar'
                ? 'حمّل التطبيق واستمتع بتحديثات حية لبوابات الطيران، إصدار بطاقات الصعود بدون إنترنت، إشعارات انخفاض الأسعار، ونقاط مكافآت مضاعفة على كل حجز.'
                : 'Download the app for live flight gate updates, offline boarding passes, fare alerts, and 2x reward points on every trip.'}
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#F8FAFC] font-medium justify-center lg:justify-start">
                <Bell className="w-4 h-4 text-[#DC2626]" />
                <span>{language === 'ar' ? 'تنبيهات الأسعار اللحظية' : 'Instant Fare Alerts'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F8FAFC] font-medium justify-center lg:justify-start">
                <Zap className="w-4 h-4 text-[#DC2626]" />
                <span>{language === 'ar' ? 'بطاقة صعود بدون نت' : 'Offline Boarding Pass'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F8FAFC] font-medium justify-center lg:justify-start">
                <Gift className="w-4 h-4 text-[#DC2626]" />
                <span>{language === 'ar' ? 'خصومات حصرية 20%' : '20% Mobile Deals'}</span>
              </div>
            </div>

            {/* Store Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3 justify-center lg:justify-start">
              <div className="px-4 py-2.5 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center gap-3 hover:border-[#DC2626] transition-colors cursor-pointer">
                <div className="text-start">
                  <span className="block text-[10px] text-[#94A3B8] uppercase">Download on</span>
                  <span className="text-xs font-bold text-[#F8FAFC]">App Store (iOS)</span>
                </div>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center gap-3 hover:border-[#DC2626] transition-colors cursor-pointer">
                <div className="text-start">
                  <span className="block text-[10px] text-[#94A3B8] uppercase">Get it on</span>
                  <span className="text-xs font-bold text-[#F8FAFC]">Google Play (Android)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Mock Visual */}
          <div className="flex flex-col sm:flex-row items-center gap-5 bg-[#0F172A] border border-[#334155] rounded-xl p-5 shrink-0 text-center sm:text-start">
            <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-black/40">
              <QrCode className="w-full h-full text-[#0F172A]" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-1 justify-center sm:justify-start">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs font-bold text-white ml-1 rtl:mr-1">4.9 / 5</span>
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#F8FAFC]">
                {language === 'ar' ? 'امسح الرمز للتحميل الفوري' : 'Scan to Download Instantly'}
              </h4>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">
                {language === 'ar' ? 'متوافق مع جميع أجهزة آيفون وأندرويد' : 'Compatible with iOS & Android'}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
