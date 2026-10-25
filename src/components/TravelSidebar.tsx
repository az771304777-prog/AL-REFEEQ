import React from 'react';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  Luggage, 
  Car, 
  Ticket, 
  Tag, 
  Compass, 
  ShieldCheck, 
  Headphones, 
  X, 
  Phone, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  CreditCard,
  Globe
} from 'lucide-react';
import { ServiceTab, Language, Currency } from '../types';
import { STORE_CONTACT, CURRENCIES } from '../data/travelData';
import { travelTranslations } from '../utils/travelTranslations';

interface TravelSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ServiceTab;
  onSelectTab: (tab: ServiceTab) => void;
  language: Language;
  onToggleLanguage: () => void;
  currency: Currency;
  onSelectCurrency: (c: Currency) => void;
  onOpenMyBookings: () => void;
  bookingsCount: number;
  onOpenSupport: () => void;
  appliedCoupon: string | null;
}

export const TravelSidebar: React.FC<TravelSidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  language,
  onToggleLanguage,
  currency,
  onSelectCurrency,
  onOpenMyBookings,
  bookingsCount,
  onOpenSupport,
  appliedCoupon,
}) => {
  const t = travelTranslations[language];

  const mainServices = [
    {
      id: 'flights' as ServiceTab,
      label: t.flightsTab,
      icon: <Plane className="w-4 h-4" />,
      badge: language === 'ar' ? 'مباشر وتأكيد فوري' : 'Instant E-Tickets',
    },
    {
      id: 'hotels' as ServiceTab,
      label: t.hotelsTab,
      icon: <Building2 className="w-4 h-4" />,
      badge: language === 'ar' ? 'فنادق 5 نجوم والحرم' : '5-Star & Kaaba View',
    },
    {
      id: 'chalets' as ServiceTab,
      label: t.chaletsTab,
      icon: <Palmtree className="w-4 h-4" />,
      badge: language === 'ar' ? 'مسابح خاصة دافئة' : 'Private Heated Pools',
    },
    {
      id: 'packages' as ServiceTab,
      label: t.packagesTab,
      icon: <Luggage className="w-4 h-4" />,
      badge: language === 'ar' ? 'عطلات شاملة VIP' : 'All-Inclusive Tours',
    },
    {
      id: 'cars' as ServiceTab,
      label: t.carsTab,
      icon: <Car className="w-4 h-4" />,
      badge: language === 'ar' ? 'مع سائق أو بدون' : 'Chauffeur / Luxury',
    },
  ];

  return (
    <>
      {/* Dark overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Floating Glassmorphic Sidebar (#1E293B with backdrop-blur-md) */}
      <aside
        className={`fixed top-0 bottom-0 ${
          language === 'ar' ? 'right-0' : 'left-0'
        } w-80 max-w-[85vw] bg-[#1E293B]/95 backdrop-blur-md border-${
          language === 'ar' ? 'l' : 'r'
        } border-[#334155] z-50 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen
            ? 'translate-x-0'
            : language === 'ar'
            ? 'translate-x-full'
            : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 sm:p-5 border-b border-[#334155] flex items-center justify-between bg-[#0F172A]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center text-white shadow-md shadow-red-950/50">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-black text-sm text-[#F8FAFC] leading-none">
                {t.brandName}
              </h2>
              <span className="text-[10px] text-[#94A3B8] font-medium block mt-1">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1">
          
          {/* Active Promo Highlight */}
          <div className="p-3 rounded-xl bg-[#0F172A] border border-[#DC2626]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-[rgba(220,38,38,0.15)] text-[#DC2626]">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <div>
                <span className="block text-[11px] font-bold text-[#F8FAFC]">
                  {appliedCoupon ? `كود الخصم المفعّل: ${appliedCoupon}` : 'كود الخصم الحصري'}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">خصم 20% فوري مفعل</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#DC2626] text-white font-mono text-[10px] font-bold">
              RED26
            </span>
          </div>

          {/* Section: Core Travel Services with Smart Contrast */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] px-2 mb-2">
              {language === 'ar' ? 'خدمات السفر والحجز' : 'Travel Services'}
            </span>
            <div className="space-y-1.5">
              {mainServices.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectTab(item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[rgba(220,38,38,0.1)] text-[#F8FAFC] border-r-4 sm:border-r-4 border-[#DC2626] shadow-sm'
                        : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className={isActive ? 'text-[#DC2626]' : 'text-[#94A3B8]'}>
                          {item.icon}
                        </span>
                        {isActive && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#DC2626] animate-pulse"></span>
                        )}
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>

                    <span className="text-[10px] text-[#94A3B8] bg-[#0F172A] px-2 py-0.5 rounded-md border border-[#334155]/60">
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Shortcuts & User Tools */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] px-2 mb-2">
              {language === 'ar' ? 'إدارة الحجوزات والدعم' : 'Management & Support'}
            </span>
            <div className="space-y-1">
              
              {/* My Bookings */}
              <button
                type="button"
                onClick={() => {
                  onOpenMyBookings();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Ticket className="w-4 h-4 text-[#DC2626]" />
                  <span>{t.myBookings}</span>
                </div>
                {bookingsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] font-bold">
                    {bookingsCount} {language === 'ar' ? 'حجز' : 'trips'}
                  </span>
                )}
              </button>

              {/* 24/7 Support */}
              <button
                type="button"
                onClick={() => {
                  onOpenSupport();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Headphones className="w-4 h-4 text-[#DC2626]" />
                  <span>{language === 'ar' ? 'مركز المساعدة والأسئلة الشائعة' : 'Support & Help Center'}</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold">24/7</span>
              </button>
            </div>
          </div>

          {/* Preferences: Currency & Language */}
          <div className="p-3 rounded-xl bg-[#0F172A] border border-[#334155] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>اللغة / Language</span>
              </span>
              <button
                type="button"
                onClick={onToggleLanguage}
                className="px-2.5 py-1 rounded-lg bg-[#1E293B] border border-[#334155] text-xs font-bold text-[#F8FAFC] hover:border-[#DC2626] cursor-pointer"
              >
                {language === 'ar' ? 'English' : 'العربية'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#94A3B8] font-medium flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>العملة / Currency</span>
              </span>
              <select
                value={currency.code}
                onChange={(e) => {
                  const curr = CURRENCIES.find((c) => c.code === e.target.value) || CURRENCIES[0];
                  onSelectCurrency(curr);
                }}
                className="bg-[#1E293B] border border-[#334155] rounded-lg px-2 py-1 text-xs text-[#F8FAFC] focus:outline-none focus:border-[#DC2626] cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Sidebar Footer: Unified Hotline */}
        <div className="p-4 border-t border-[#334155] bg-[#0F172A]/90 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#94A3B8]">{STORE_CONTACT.supportHoursAr}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={`tel:${STORE_CONTACT.phone}`}
              className="px-2.5 py-2 rounded-xl bg-[#1E293B] hover:bg-[#DC2626] text-[#F8FAFC] border border-[#334155] hover:border-[#DC2626] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#DC2626] hover:text-white" />
              <span>{t.callNow}</span>
            </a>

            <a
              href={`${STORE_CONTACT.whatsappUrl}${encodeURIComponent(
                language === 'ar'
                  ? 'مرحباً، أود المساعدة بخصوص حجز أو استفسار في الرفيق للسياحة'
                  : 'Hello, inquiring about Al-Rafeeq travel.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/40"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </a>
          </div>
        </div>

      </aside>
    </>
  );
};
