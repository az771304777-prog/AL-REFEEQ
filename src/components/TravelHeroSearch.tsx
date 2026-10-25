import React from 'react';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  Luggage, 
  Car, 
  Search, 
  Calendar, 
  Users, 
  ArrowLeftRight, 
  Sparkles, 
  CreditCard,
  CheckCircle2,
  MapPin,
  Clock,
  ShieldCheck,
  Star
} from 'lucide-react';
import { 
  ServiceTab, 
  Language, 
  Airport, 
  TripType, 
  TravelClass, 
  FlightSearchQuery, 
  HotelSearchQuery 
} from '../types';
import { AIRPORTS } from '../data/travelData';
import { travelTranslations } from '../utils/travelTranslations';
import { SearchableAirportInput } from './SearchableAirportInput';
import { SearchableCityInput } from './SearchableCityInput';

interface TravelHeroSearchProps {
  language: Language;
  activeTab: ServiceTab;
  onSelectTab: (tab: ServiceTab) => void;
  flightQuery: FlightSearchQuery;
  onUpdateFlightQuery: (q: Partial<FlightSearchQuery>) => void;
  hotelQuery: HotelSearchQuery;
  onUpdateHotelQuery: (q: Partial<HotelSearchQuery>) => void;
  chaletCity: string;
  onChangeChaletCity: (city: string) => void;
  packageDestination: string;
  onChangePackageDestination: (dest: string) => void;
  carCity: string;
  onChangeCarCity: (city: string) => void;
  onExecuteSearch: () => void;
}

export const TravelHeroSearch: React.FC<TravelHeroSearchProps> = ({
  language,
  activeTab,
  onSelectTab,
  flightQuery,
  onUpdateFlightQuery,
  hotelQuery,
  onUpdateHotelQuery,
  chaletCity,
  onChangeChaletCity,
  packageDestination,
  onChangePackageDestination,
  carCity,
  onChangeCarCity,
  onExecuteSearch,
}) => {
  const t = travelTranslations[language];

  const handleSwapAirports = () => {
    onUpdateFlightQuery({
      origin: flightQuery.destination,
      destination: flightQuery.origin,
    });
  };

  const tabs = [
    { id: 'flights' as ServiceTab, label: t.flightsTab, icon: <Plane className="w-4 h-4" /> },
    { id: 'hotels' as ServiceTab, label: t.hotelsTab, icon: <Building2 className="w-4 h-4" /> },
    { id: 'chalets' as ServiceTab, label: t.chaletsTab, icon: <Palmtree className="w-4 h-4" /> },
    { id: 'packages' as ServiceTab, label: t.packagesTab, icon: <Luggage className="w-4 h-4" /> },
    { id: 'cars' as ServiceTab, label: t.carsTab, icon: <Car className="w-4 h-4" /> },
  ];

  return (
    <div className="relative mb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Search Container (#1E293B with rounded-xl and border #334155) */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 card-soft-glow relative z-10">
        
        {/* Service Tab Switchers with Smart Contrast */}
        <div className="flex items-center gap-2 border-b border-[#334155] pb-4 mb-6 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[rgba(220,38,38,0.12)] text-[#F8FAFC] border-b-2 sm:border-b-0 sm:border-r-4 border-[#DC2626] shadow-sm'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
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

        {/* 1. FLIGHTS SEARCH FORM */}
        {activeTab === 'flights' && (
          <div className="space-y-4">
            {/* Trip Type & Class row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center bg-[#0F172A] border border-[#334155] rounded-xl p-0.5">
                <button
                  type="button"
                  onClick={() => onUpdateFlightQuery({ tripType: 'round' })}
                  className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    flightQuery.tripType === 'round'
                      ? 'bg-[#1E293B] text-[#F8FAFC] border border-[#334155]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {t.roundTrip}
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateFlightQuery({ tripType: 'oneway' })}
                  className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    flightQuery.tripType === 'oneway'
                      ? 'bg-[#1E293B] text-[#F8FAFC] border border-[#334155]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {t.oneWay}
                </button>
              </div>

              {/* Class & Passenger Info */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-1.5">
                  <Users className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span className="text-[#94A3B8]">{t.passengers}:</span>
                  <select
                    value={flightQuery.adults}
                    onChange={(e) => onUpdateFlightQuery({ adults: Number(e.target.value) })}
                    className="bg-transparent text-[#F8FAFC] font-bold text-xs focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-[#1E293B]">
                        {num} {language === 'ar' ? 'مسافر' : 'passengers'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 bg-[#0F172A] border border-[#334155] rounded-xl px-3 py-1.5">
                  <select
                    value={flightQuery.travelClass}
                    onChange={(e) => onUpdateFlightQuery({ travelClass: e.target.value as TravelClass })}
                    className="bg-transparent text-[#F8FAFC] font-bold text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="economy" className="bg-[#1E293B]">{t.economy}</option>
                    <option value="premium" className="bg-[#1E293B]">{t.premiumEconomy}</option>
                    <option value="business" className="bg-[#1E293B]">{t.businessClass}</option>
                    <option value="first" className="bg-[#1E293B]">{t.firstClass}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inputs Grid with Full Searchable & Manual Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Origin with Manual Typing & Autocomplete */}
              <div className="md:col-span-3">
                <SearchableAirportInput
                  label={t.origin}
                  value={flightQuery.origin}
                  onChange={(airport) => onUpdateFlightQuery({ origin: airport })}
                  language={language}
                  placeholder={language === 'ar' ? 'مدينة أو كود المغادرة...' : 'Departure city or code...'}
                />
              </div>

              {/* Swap Button */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  className="p-3 rounded-xl bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:text-[#DC2626] hover:border-[#DC2626] transition-all cursor-pointer shadow-sm"
                  title="تبديل مدينتي الذهاب والعودة"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>
              </div>

              {/* Destination with Manual Typing & Autocomplete */}
              <div className="md:col-span-3">
                <SearchableAirportInput
                  label={t.destination}
                  value={flightQuery.destination}
                  onChange={(airport) => onUpdateFlightQuery({ destination: airport })}
                  language={language}
                  placeholder={language === 'ar' ? 'وجهة أو كود الوصول...' : 'Destination city or code...'}
                />
              </div>

              {/* Departure & Return Dates */}
              <div className="md:col-span-3 bg-[#0F172A] border border-[#334155] rounded-xl p-2.5 sm:p-3">
                <label className="block text-[11px] text-[#94A3B8] mb-1 font-medium leading-none">
                  {flightQuery.tripType === 'round' ? `${t.departureDate} - ${t.returnDate}` : t.departureDate}
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="date"
                    value={flightQuery.departDate}
                    onChange={(e) => onUpdateFlightQuery({ departDate: e.target.value })}
                    className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer"
                  />
                  {flightQuery.tripType === 'round' && (
                    <input
                      type="date"
                      value={flightQuery.returnDate || ''}
                      onChange={(e) => onUpdateFlightQuery({ returnDate: e.target.value })}
                      className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer"
                    />
                  )}
                </div>
              </div>

              {/* Search CTA */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={onExecuteSearch}
                  className="w-full btn-accent-red py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/50"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.searchFlights}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. HOTELS SEARCH FORM */}
        {activeTab === 'hotels' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Hotel City / Search with Manual Free Text Typing */}
              <div className="md:col-span-4">
                <SearchableCityInput
                  label={t.cityOrHotel}
                  value={hotelQuery.city}
                  onChange={(city) => onUpdateHotelQuery({ city })}
                  language={language}
                  suggestions={[
                    'الرياض', 'مكة المكرمة', 'المدينة المنورة', 'جدة', 'العلا', 'دبي', 
                    'القاهرة', 'إسطنبول', 'لندن', 'باريس', 'أبوظبي', 'الدوحة', 'الكويت', 
                    'طرابزون', 'بانكوك', 'بوكيت', 'شرم الشيخ', 'أبها', 'الطائف', 'الخبر', 'الدمام'
                  ]}
                  placeholder={language === 'ar' ? 'اكتب اسم أي مدينة، وجهة، أو فندق...' : 'Type any city, destination, or hotel...'}
                />
              </div>

              <div className="md:col-span-3 bg-[#0F172A] border border-[#334155] rounded-xl p-2.5 sm:p-3">
                <label className="block text-[11px] text-[#94A3B8] mb-1 font-medium leading-none">{t.checkIn}</label>
                <input
                  type="date"
                  value={hotelQuery.checkIn}
                  onChange={(e) => onUpdateHotelQuery({ checkIn: e.target.value })}
                  className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer mt-1"
                />
              </div>

              <div className="md:col-span-3 bg-[#0F172A] border border-[#334155] rounded-xl p-2.5 sm:p-3">
                <label className="block text-[11px] text-[#94A3B8] mb-1 font-medium leading-none">{t.checkOut}</label>
                <input
                  type="date"
                  value={hotelQuery.checkOut}
                  onChange={(e) => onUpdateHotelQuery({ checkOut: e.target.value })}
                  className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={onExecuteSearch}
                  className="w-full btn-accent-red py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/50"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.searchHotels}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. CHALETS SEARCH FORM */}
        {activeTab === 'chalets' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Chalet Location with Manual Free Text Typing */}
              <div className="md:col-span-5">
                <SearchableCityInput
                  label={t.cityOrChalet}
                  value={chaletCity}
                  onChange={(city) => onChangeChaletCity(city)}
                  language={language}
                  suggestions={[
                    'الرياض (شمال الرياض، الدرعية، الرمال)',
                    'جدة (أبحر الشمالية، درة العروس)',
                    'المنطقة الشرقية (الخبر، الدمام، هاف مون)',
                    'الطائف (الهدا، الشفا)',
                    'أبها (السودة، جبال عسير)',
                    'القصيم (عنيزة، بريدة)',
                    'جازان (الكورنيش والواجهة البحرية)'
                  ]}
                  placeholder={language === 'ar' ? 'اكتب المدينة أو الحي الترفيهي...' : 'Type city or district...'}
                />
              </div>

              <div className="md:col-span-4 bg-[#0F172A] border border-[#334155] rounded-xl p-2.5 sm:p-3">
                <label className="block text-[11px] text-[#94A3B8] mb-1 font-medium leading-none">نوع المسبح والمرافق</label>
                <select className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer mt-1">
                  <option value="all" className="bg-[#1E293B]">جميع الشاليهات والمسابح</option>
                  <option value="warm" className="bg-[#1E293B]">مسبح خاص دافئ ومغلق</option>
                  <option value="infinity" className="bg-[#1E293B]">إنفنتي بول مع جاكوزي خارجي</option>
                  <option value="waterpark" className="bg-[#1E293B]">ألعاب مائية للأطفال</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={onExecuteSearch}
                  className="w-full btn-accent-red py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/50"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.searchChalets}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. PACKAGES SEARCH FORM */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Package Destination with Manual Free Text Typing */}
              <div className="md:col-span-5">
                <SearchableCityInput
                  label="الوجهة أو نوع الباقة السياحية"
                  value={packageDestination === 'all' ? '' : packageDestination}
                  onChange={(dest) => onChangePackageDestination(dest || 'all')}
                  language={language}
                  suggestions={[
                    'العلا - شتاء طنطورة والمنتجعات',
                    'الرياض - بوليفارد سيتي والمواسم',
                    'مكة والمدينة - عمرة وزيارة VIP',
                    'دبي - عطلات التسوق والترفيه',
                    'إسطنبول وطرابزون - البوسفور والطبيعة'
                  ]}
                  placeholder={language === 'ar' ? 'اكتب أي وجهة أو اختر من القائمة...' : 'Type any destination...'}
                />
              </div>

              <div className="md:col-span-4 bg-[#0F172A] border border-[#334155] rounded-xl p-2.5 sm:p-3">
                <label className="block text-[11px] text-[#94A3B8] mb-1 font-medium leading-none">مدة الإقامة المطلوبة</label>
                <select className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer mt-1">
                  <option value="all" className="bg-[#1E293B]">أي مدة</option>
                  <option value="short" className="bg-[#1E293B]">عطلة نهاية أسبوع (2-3 ليالٍ)</option>
                  <option value="medium" className="bg-[#1E293B]">عطلة مميزة (4-5 ليالٍ)</option>
                  <option value="long" className="bg-[#1E293B]">جولة كاملة (أسبوع أو أكثر)</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={onExecuteSearch}
                  className="w-full btn-accent-red py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/50"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.searchPackages}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. CARS SEARCH FORM */}
        {activeTab === 'cars' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Car City with Manual Free Text Typing */}
              <div className="md:col-span-4">
                <SearchableCityInput
                  label="مدينة الاستلام والتسليم"
                  value={carCity}
                  onChange={(city) => onChangeCarCity(city)}
                  language={language}
                  suggestions={[
                    'الرياض (مطار الملك خالد الدولي / تسليم الفندق)',
                    'جدة (مطار الملك عبدالعزيز الدولي / الكورنيش)',
                    'الدمام والخبر (مطار الملك فهد الدولي)',
                    'المدينة المنورة (مطار الأمير محمد)',
                    'مكة المكرمة (أبراج البيت)',
                    'دبي (مطار دبي الدولي مبنى 1/3)'
                  ]}
                  placeholder={language === 'ar' ? 'اكتب مدينة أو موقع الاستلام...' : 'Type pickup city or airport...'}
                />
              </div>

              <div className="md:col-span-3 bg-[#0F172A] border border-[#334155] rounded-xl p-2.5 sm:p-3">
                <label className="block text-[11px] text-[#94A3B8] mb-1 font-medium leading-none">فئة السيارة المطلوبة</label>
                <select className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer mt-1">
                  <option value="all" className="bg-[#1E293B]">جميع الفئات المتاحة</option>
                  <option value="chauffeur" className="bg-[#1E293B]">مع سائق خاص VIP</option>
                  <option value="luxury_suv" className="bg-[#1E293B]">دفع رباعي فاره (رينج روفر / لكزس)</option>
                  <option value="family" className="bg-[#1E293B]">عائلي 7 مقاعد (لاندكروزر)</option>
                  <option value="economy" className="bg-[#1E293B]">اقتصادي (إلنترا)</option>
                </select>
              </div>

              <div className="md:col-span-2 bg-[#0F172A] border border-[#334155] rounded-xl p-2.5 sm:p-3">
                <label className="block text-[11px] text-[#94A3B8] mb-1 font-medium leading-none">مدة التأجير</label>
                <select className="w-full bg-transparent text-[#F8FAFC] font-semibold text-xs focus:outline-none cursor-pointer mt-1">
                  <option value="1" className="bg-[#1E293B]">يوم واحد</option>
                  <option value="3" className="bg-[#1E293B]">3 أيام</option>
                  <option value="7" className="bg-[#1E293B]">أسبوع كامل</option>
                  <option value="30" className="bg-[#1E293B]">شهر (خصم إضافي)</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={onExecuteSearch}
                  className="w-full btn-accent-red py-3.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/50"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.searchCars}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabby & Tamara Installment Strip */}
        <div className="mt-6 pt-4 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#DC2626]" />
            <span className="font-medium text-[#F8FAFC]">{t.tamaraTabbyBadge}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#334155] text-[10px] font-bold text-white">
              تابي Tabby (4 دفعات)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#334155] text-[10px] font-bold text-white">
              تمارا Tamara (4 دفعات)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#334155] text-[10px] font-bold text-emerald-400">
              مدى Mada
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#334155] text-[10px] font-bold text-white">
              Apple Pay
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
