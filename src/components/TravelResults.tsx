import React, { useState } from 'react';
import { 
  Plane, 
  Building2, 
  Palmtree, 
  Luggage, 
  Car, 
  Clock, 
  Check, 
  Star, 
  MapPin, 
  Eye, 
  Users, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  SlidersHorizontal,
  Fuel,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { 
  ServiceTab, 
  Language, 
  Currency, 
  FlightItem, 
  HotelItem, 
  ChaletItem, 
  PackageItem, 
  CarItem 
} from '../types';
import { travelTranslations } from '../utils/travelTranslations';

interface TravelResultsProps {
  language: Language;
  activeTab: ServiceTab;
  currency: Currency;
  flights: FlightItem[];
  hotels: HotelItem[];
  chalets: ChaletItem[];
  packages: PackageItem[];
  cars: CarItem[];
  onSelectFlight: (flight: FlightItem) => void;
  onSelectHotel: (hotel: HotelItem) => void;
  onSelectChalet: (chalet: ChaletItem) => void;
  onSelectPackage: (pkg: PackageItem) => void;
  onSelectCar: (car: CarItem) => void;
  onOpenHotelGallery: (hotel: HotelItem) => void;
}

export const TravelResults: React.FC<TravelResultsProps> = ({
  language,
  activeTab,
  currency,
  flights,
  hotels,
  chalets,
  packages,
  cars,
  onSelectFlight,
  onSelectHotel,
  onSelectChalet,
  onSelectPackage,
  onSelectCar,
  onOpenHotelGallery,
}) => {
  const t = travelTranslations[language];

  // Filters state
  const [directOnly, setDirectOnly] = useState(false);
  const [withChauffeurOnly, setWithChauffeurOnly] = useState(false);
  const [fiveStarOnly, setFiveStarOnly] = useState(false);

  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currency.rateAgainstSAR);
    return `${converted.toLocaleString()} ${currency.symbol}`;
  };

  const filteredFlights = directOnly ? flights.filter((f) => f.stops === 0) : flights;
  const filteredHotels = fiveStarOnly ? hotels.filter((h) => h.starRating === 5) : hotels;
  const filteredCars = withChauffeurOnly ? cars.filter((c) => c.withChauffeur) : cars;

  return (
    <div className="space-y-6">
      
      {/* 1. Filter & Summary Bar */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#DC2626]" />
          <span className="font-bold text-[#F8FAFC]">
            {activeTab === 'flights' && `${language === 'ar' ? 'نتائج رحلات الطيران المتاحة' : 'Available Flight Results'} (${filteredFlights.length})`}
            {activeTab === 'hotels' && `${language === 'ar' ? 'فنادق ومنتجعات النخبة' : 'Luxury Hotels & Resorts'} (${filteredHotels.length})`}
            {activeTab === 'chalets' && `${language === 'ar' ? 'شاليهات وفلل بمسابح خاصة' : 'Private Pool Chalets'} (${chalets.length})`}
            {activeTab === 'packages' && `${language === 'ar' ? 'باقات العطلات السياحية الشاملة' : 'Holiday Packages VIP'} (${packages.length})`}
            {activeTab === 'cars' && `${language === 'ar' ? 'سيارات فاخرة وتنقلات VIP' : 'Luxury Cars & Chauffeurs'} (${filteredCars.length})`}
          </span>
        </div>

        {/* Quick Filter Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {activeTab === 'flights' && (
            <button
              type="button"
              onClick={() => setDirectOnly(!directOnly)}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                directOnly
                  ? 'bg-[#DC2626] text-white border-[#DC2626]'
                  : 'bg-[#0F172A] text-[#94A3B8] border-[#334155] hover:text-[#F8FAFC]'
              }`}
            >
              {language === 'ar' ? 'رحلات مباشرة فقط' : 'Direct Flights Only'}
            </button>
          )}

          {activeTab === 'hotels' && (
            <button
              type="button"
              onClick={() => setFiveStarOnly(!fiveStarOnly)}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                fiveStarOnly
                  ? 'bg-[#DC2626] text-white border-[#DC2626]'
                  : 'bg-[#0F172A] text-[#94A3B8] border-[#334155] hover:text-[#F8FAFC]'
              }`}
            >
              {language === 'ar' ? 'فنادق 5 نجوم فقط' : '5-Star Only'}
            </button>
          )}

          {activeTab === 'cars' && (
            <button
              type="button"
              onClick={() => setWithChauffeurOnly(!withChauffeurOnly)}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                withChauffeurOnly
                  ? 'bg-[#DC2626] text-white border-[#DC2626]'
                  : 'bg-[#0F172A] text-[#94A3B8] border-[#334155] hover:text-[#F8FAFC]'
              }`}
            >
              {language === 'ar' ? 'مع سائق خاص VIP' : 'Chauffeur Included'}
            </button>
          )}
        </div>
      </div>

      {/* 2. FLIGHTS RESULTS */}
      {activeTab === 'flights' && (
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="bg-[#1E293B] border border-[#334155] rounded-xl p-4 sm:p-6 card-soft-glow flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-[#DC2626]/50"
            >
              {/* Airline & Flight Number */}
              <div className="flex items-center gap-4 w-full lg:w-1/4">
                <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                  {flight.airlineLogoUrl ? (
                    <img src={flight.airlineLogoUrl} alt={flight.airline} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="font-bold text-xs text-[#DC2626] font-mono">{flight.airlineLogoText}</span>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#F8FAFC]">{flight.airline}</h4>
                  <span className="text-xs font-mono text-[#94A3B8]">{flight.flightNumber} • {flight.aircraft}</span>
                  {flight.terminalOrigin && (
                    <span className="text-[10px] text-[#DC2626] block font-medium mt-0.5">{flight.terminalOrigin}</span>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-between flex-1 w-full max-w-md gap-3">
                <div className="text-center">
                  <span className="text-lg sm:text-xl font-mono font-bold text-[#F8FAFC] block">{flight.departureTime}</span>
                  <span className="text-xs font-semibold text-[#94A3B8]">{flight.origin.code}</span>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[11px] text-[#94A3B8] font-medium flex items-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-[#DC2626]" />
                    <span>{flight.duration}</span>
                  </span>
                  <div className="w-full flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#DC2626]"></div>
                    <div className="flex-1 h-0.5 bg-[#334155] relative"></div>
                    <Plane className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                    <div className="flex-1 h-0.5 bg-[#334155] relative"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold mt-1">
                    {flight.stops === 0 ? (language === 'ar' ? 'رحلة مباشرة' : 'Direct') : `${flight.stops} ترانزيت`}
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-lg sm:text-xl font-mono font-bold text-[#F8FAFC] block">{flight.arrivalTime}</span>
                  <span className="text-xs font-semibold text-[#94A3B8]">{flight.destination.code}</span>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#334155]">
                <div className="text-start lg:text-end">
                  <span className="text-[11px] text-[#94A3B8] block">{language === 'ar' ? 'السعر الإجمالي للشخص' : 'Total Price / Person'}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-mono font-black text-[#F8FAFC]">
                      {formatPrice(flight.priceSAR)}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium block">
                    {language === 'ar' ? 'شامل الضريبة وإصدار التذكرة' : 'Tax & Booking Included'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectFlight(flight)}
                  className="btn-accent-red px-5 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-red-950/40"
                >
                  <span>{t.bookNow}</span>
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. HOTELS RESULTS */}
      {activeTab === 'hotels' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden card-soft-glow flex flex-col justify-between transition-all duration-300 hover:border-[#DC2626]/50"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <img src={hotel.imageUrl} alt={hotel.nameAr} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent"></div>

                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold flex items-center gap-1 border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{hotel.guestRating} / 10</span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenHotelGallery(hotel)}
                  className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-3 py-1 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>{t.gallery}</span>
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {[...Array(hotel.starRating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-[11px] text-[#94A3B8] font-medium mr-1.5 rtl:ml-1.5">
                      ({hotel.reviewCount} {language === 'ar' ? 'تقييم نزيل' : 'reviews'})
                    </span>
                  </div>

                  <h4 className="font-black text-base text-[#F8FAFC] leading-snug mb-1">
                    {language === 'ar' ? hotel.nameAr : hotel.nameEn}
                  </h4>
                  <p className="text-xs text-[#94A3B8] flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                    <span>{hotel.distanceInfo}</span>
                  </p>
                  <span className="text-xs text-emerald-400 font-semibold block bg-[#0F172A] p-2 rounded-lg border border-[#334155]/60">
                    {hotel.roomType}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#334155] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] block">{t.perNight}</span>
                    <span className="text-xl font-mono font-black text-[#F8FAFC]">
                      {formatPrice(hotel.pricePerNightSAR)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectHotel(hotel)}
                    className="btn-accent-red px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-950/40"
                  >
                    <span>{t.bookNow}</span>
                    {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. CHALETS RESULTS */}
      {activeTab === 'chalets' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chalets.map((chalet) => (
            <div
              key={chalet.id}
              className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden card-soft-glow flex flex-col justify-between transition-all duration-300 hover:border-[#DC2626]/50"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img src={chalet.imageUrl} alt={chalet.nameAr} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent"></div>

                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[11px] font-bold shadow-md">
                  {chalet.poolType}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-xs text-white">{chalet.rating}</span>
                    <span className="text-[10px] text-[#94A3B8]">({chalet.reviewsCount} تقييم)</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#F8FAFC] leading-snug mb-1">
                    {language === 'ar' ? chalet.nameAr : chalet.nameEn}
                  </h4>
                  <p className="text-xs text-[#94A3B8] flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>{chalet.cityAr} - {chalet.districtAr}</span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <span className="bg-[#0F172A] px-2 py-1 rounded-md border border-[#334155] font-medium">
                      {chalet.capacity}
                    </span>
                    <span className="bg-[#0F172A] px-2 py-1 rounded-md border border-[#334155] font-medium">
                      {chalet.bedrooms} غرف نوم
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#334155] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] block">{t.perNight}</span>
                    <span className="text-xl font-mono font-black text-[#F8FAFC]">
                      {formatPrice(chalet.pricePerNightSAR)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectChalet(chalet)}
                    className="btn-accent-red px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.bookNow}</span>
                    {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. PACKAGES RESULTS */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden card-soft-glow flex flex-col justify-between transition-all duration-300 hover:border-[#DC2626]/50"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img src={pkg.imageUrl} alt={pkg.titleAr} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent"></div>

                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1 rounded-lg bg-[#DC2626] text-white text-xs font-bold shadow-md">
                  {pkg.tagAr}
                </div>

                <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                  {pkg.durationDays} أيام / {pkg.durationNights} ليالٍ
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#DC2626] font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{pkg.destinationAr}</span>
                    </span>
                    <span className="text-xs font-mono text-[#94A3B8]">
                      ⭐ {pkg.rating} ({pkg.reviewsCount} مسافر)
                    </span>
                  </div>

                  <h4 className="font-black text-base text-[#F8FAFC] leading-snug mb-2">
                    {language === 'ar' ? pkg.titleAr : pkg.titleEn}
                  </h4>

                  {/* Highlights */}
                  <div className="space-y-1 bg-[#0F172A] p-3 rounded-xl border border-[#334155]/60 mb-3 text-xs text-[#94A3B8]">
                    <span className="font-bold text-[#F8FAFC] block mb-1">يشمل في الباقة:</span>
                    {pkg.included.slice(0, 3).map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#334155] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] block">{t.perPackage}</span>
                    <span className="text-2xl font-mono font-black text-[#F8FAFC]">
                      {formatPrice(pkg.priceSAR)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg)}
                    className="btn-accent-red px-5 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-950/40"
                  >
                    <span>{t.bookNow}</span>
                    {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. CARS RESULTS */}
      {activeTab === 'cars' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden card-soft-glow flex flex-col justify-between transition-all duration-300 hover:border-[#DC2626]/50"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#0F172A]">
                <img src={car.imageUrl} alt={car.modelAr} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent"></div>

                <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-[10px] font-bold shadow-md">
                  {car.tagAr}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] text-[#94A3B8] font-medium block mb-1">
                    {car.categoryAr}
                  </span>
                  <h4 className="font-bold text-sm text-[#F8FAFC] leading-snug mb-2">
                    {language === 'ar' ? car.modelAr : car.modelEn}
                  </h4>

                  <div className="grid grid-cols-3 gap-1 bg-[#0F172A] p-2 rounded-lg border border-[#334155] text-[10px] text-center text-[#94A3B8]">
                    <div>
                      <span className="block font-bold text-[#F8FAFC]">{car.passengers} ركاب</span>
                      <span>سعة المقاعد</span>
                    </div>
                    <div>
                      <span className="block font-bold text-[#F8FAFC]">{car.luggage} حقائب</span>
                      <span>الأمتعة</span>
                    </div>
                    <div>
                      <span className="block font-bold text-emerald-400">مفتوح</span>
                      <span>كيلومترات</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#334155] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] block">{t.perDay}</span>
                    <span className="text-xl font-mono font-black text-[#F8FAFC]">
                      {formatPrice(car.pricePerDaySAR)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCar(car)}
                    className="btn-accent-red px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-red-950/40"
                  >
                    <span>{language === 'ar' ? 'حجز السيارة' : 'Rent Car'}</span>
                    {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
