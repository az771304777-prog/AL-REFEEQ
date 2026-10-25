import React, { useState } from 'react';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  Luggage, 
  Car, 
  Globe, 
  Phone, 
  MessageCircle, 
  Ticket, 
  Sparkles, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Headphones,
  Tag,
  Menu
} from 'lucide-react';
import { Language, Currency, ServiceTab } from '../types';
import { CURRENCIES, STORE_CONTACT } from '../data/travelData';
import { travelTranslations } from '../utils/travelTranslations';

interface TravelHeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  currentCurrency: Currency;
  onSelectCurrency: (c: Currency) => void;
  activeTab: ServiceTab;
  onSelectTab: (t: ServiceTab) => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onOpenSupport?: () => void;
  onToggleSidebar?: () => void;
}

export const TravelHeader: React.FC<TravelHeaderProps> = ({
  language,
  onToggleLanguage,
  currentCurrency,
  onSelectCurrency,
  activeTab,
  onSelectTab,
  onOpenMyBookings,
  bookingsCount,
  appliedCoupon,
  onApplyCoupon,
  onOpenSupport,
  onToggleSidebar,
}) => {
  const t = travelTranslations[language];
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  const handleQuickApply = (code: string) => {
    const ok = onApplyCoupon(code);
    if (ok) {
      setCouponFeedback(t.couponSuccess);
      setTimeout(() => setCouponFeedback(null), 3000);
    }
  };

  const isRed26Active = appliedCoupon?.toUpperCase() === 'RED26';

  const navTabs = [
    { id: 'flights' as ServiceTab, label: t.flightsTab, icon: <Plane className="w-3.5 h-3.5" /> },
    { id: 'hotels' as ServiceTab, label: t.hotelsTab, icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'chalets' as ServiceTab, label: t.chaletsTab, icon: <Palmtree className="w-3.5 h-3.5" /> },
    { id: 'packages' as ServiceTab, label: t.packagesTab, icon: <Luggage className="w-3.5 h-3.5" /> },
    { id: 'cars' as ServiceTab, label: t.carsTab, icon: <Car className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-lg">
      
      {/* 1. Sleek, Polished Top Red Announcement Bar (#DC2626) */}
      <div className="bg-[#DC2626] text-[#F8FAFC] py-2 px-3 sm:px-6 text-xs shadow-md border-b border-red-700/60 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Tidy, Clean Headline with Promo Pill */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/25 text-white font-bold text-[11px] border border-white/20 shrink-0">
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>{language === 'ar' ? 'عرض خاص' : 'Exclusive Deal'}</span>
            </span>

            <div className="flex items-center gap-2 text-xs font-semibold tracking-normal text-white">
              <span className="font-bold underline decoration-white/40 underline-offset-2">
                {language === 'ar' ? 'كود RED26' : 'Code RED26'}
              </span>
              <span className="text-white/90 hidden md:inline">
                {language === 'ar'
                  ? '• يمنحك خصم 20% فوري على كافة رحلات الطيران والفنادق والشاليهات'
                  : '• Instant 20% discount on flights, hotels & luxury stays'}
              </span>
              <span className="text-white/90 md:hidden text-[11px]">
                {language === 'ar' ? 'خصم 20% فوري' : '20% OFF'}
              </span>
            </div>
          </div>

          {/* Right: Quick Apply Button + Hotline Shortcut */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Instant Coupon Action Button */}
            <button
              type="button"
              onClick={() => handleQuickApply('RED26')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isRed26Active
                  ? 'bg-black/30 text-white border border-white/40 hover:bg-black/40'
                  : 'bg-white text-[#DC2626] hover:bg-red-50 hover:scale-[1.03] active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
              }`}
            >
              {isRed26Active ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-[11px] font-mono">RED26 ({language === 'ar' ? 'مطبّق' : 'Applied'})</span>
                </>
              ) : (
                <>
                  <Tag className="w-3 h-3 text-[#DC2626]" />
                  <span>{language === 'ar' ? 'تطبيق الكود' : 'Apply Code'}</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={`${STORE_CONTACT.whatsappUrl}${encodeURIComponent(
                language === 'ar'
                  ? 'مرحباً، أود الاستفسار عن عروض وتذاكر الرفيق للسياحة'
                  : 'Hello, inquiring about Al-Rafeeq travel bookings.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/25 hover:bg-black/40 text-white text-[11px] font-medium transition-all border border-white/20"
              title={STORE_CONTACT.phoneFormatted}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span className="hidden sm:inline font-mono dir-ltr">{STORE_CONTACT.phoneFormatted}</span>
              <span className="sm:hidden font-medium">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>
          </div>

        </div>

        {/* Floating feedback toast */}
        {couponFeedback && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 bg-[#1E293B] border border-[#334155] text-[#F8FAFC] px-4 py-2 rounded-xl text-xs shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{couponFeedback}</span>
          </div>
        )}
      </div>

      {/* 2. Glassmorphic Main Navbar (#1E293B with backdrop-blur-md) */}
      <div className="glass-nav border-b border-[#334155]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            
            {/* Sidebar Toggle & Brand Logo */}
            <div className="flex items-center gap-3">
              {onToggleSidebar && (
                <button
                  type="button"
                  onClick={onToggleSidebar}
                  aria-label="Open navigation sidebar"
                  className="p-2 rounded-xl bg-[#0F172A] border border-[#334155] text-[#F8FAFC] hover:border-[#DC2626] transition-colors cursor-pointer"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center text-white shadow-lg shadow-red-950/40 shrink-0">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight text-[#F8FAFC] flex items-center gap-1.5 leading-tight">
                  {t.brandName}
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></span>
                </h1>
                <p className="text-[11px] text-[#94A3B8] font-medium hidden sm:block leading-none mt-0.5">
                  {t.brandSubtitle}
                </p>
              </div>
            </div>

            {/* Smart Contrast Service Tabs in Center Navbar */}
            <div className="hidden xl:flex items-center p-1 bg-[#0F172A]/80 border border-[#334155] rounded-xl">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => onSelectTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer relative ${
                      isActive
                        ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border border-[#DC2626]/40 shadow-sm'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <div className="relative">
                      <span className={isActive ? 'text-[#DC2626]' : 'text-[#94A3B8]'}>
                        {tab.icon}
                      </span>
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
                      )}
                    </div>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Tools: Support, Currency, Language, My Bookings */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Support Button */}
              {onOpenSupport && (
                <button
                  type="button"
                  onClick={onOpenSupport}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F172A] border border-[#334155] text-xs font-semibold text-[#F8FAFC] hover:border-[#DC2626] transition-colors cursor-pointer"
                  title="الدعم والخط الساخن"
                >
                  <Headphones className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>{language === 'ar' ? 'الدعم 24/7' : 'Support 24/7'}</span>
                </button>
              )}

              {/* Currency selector */}
              <select
                value={currentCurrency.code}
                onChange={(e) => {
                  const curr = CURRENCIES.find((c) => c.code === e.target.value) || CURRENCIES[0];
                  onSelectCurrency(curr);
                }}
                className="bg-[#0F172A] border border-[#334155] rounded-xl px-2.5 py-1.5 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#DC2626] cursor-pointer"
                aria-label="Select currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={onToggleLanguage}
                aria-label="Toggle language"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F172A] border border-[#334155] text-xs font-semibold text-[#F8FAFC] hover:border-[#DC2626] transition-all duration-200 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>{language === 'ar' ? 'English' : 'العربية'}</span>
              </button>

              {/* My Bookings Button */}
              <button
                type="button"
                onClick={onOpenMyBookings}
                className="relative px-3 py-1.5 rounded-xl bg-[#0F172A] border border-[#334155] text-xs font-bold text-[#F8FAFC] hover:border-[#DC2626] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-[#DC2626]" />
                <span className="hidden sm:inline">{t.myBookings}</span>
                {bookingsCount > 0 && (
                  <span className="min-w-4 h-4 px-1 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center">
                    {bookingsCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
