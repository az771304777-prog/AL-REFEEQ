import React from 'react';
import { MapPin, Plane, Building2, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { Language, Currency, ServiceTab } from '../types';

interface TrendingDestinationsProps {
  language: Language;
  currency: Currency;
  onSelectDestination: (cityAr: string, cityEn: string, airportCode: string, mode: ServiceTab) => void;
}

export const TrendingDestinations: React.FC<TrendingDestinationsProps> = ({
  language,
  currency,
  onSelectDestination,
}) => {
  const formatPrice = (priceSAR: number) => {
    const converted = Math.round(priceSAR * currency.rateAgainstSAR);
    return `${converted.toLocaleString()} ${currency.symbol}`;
  };

  const destinations = [
    {
      cityAr: 'العلا',
      cityEn: 'AlUla',
      airportCode: 'MED', // Nearby major or direct domestic
      countryAr: 'المملكة العربية السعودية',
      countryEn: 'Saudi Arabia',
      tagAr: 'تراث وسحر الطبيعة',
      tagEn: 'Heritage & Nature',
      startingPriceSAR: 480,
      imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'استكشف مسرح مرايا، البلدة القديمة، وتشكيلات صخرة الفيل الخلابة',
      descriptionEn: 'Discover Maraya, the Old Town, and iconic Elephant Rock',
    },
    {
      cityAr: 'الرياض',
      cityEn: 'Riyadh',
      airportCode: 'RUH',
      countryAr: 'المملكة العربية السعودية',
      countryEn: 'Saudi Arabia',
      tagAr: 'مواسم وفعاليات كبرى',
      tagEn: 'Mega Events & Culture',
      startingPriceSAR: 219,
      imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'بوليفارد سيتي، أبراج الأعمال، وأرقى المطاعم العالمية والمنتجعات',
      descriptionEn: 'Boulevard City, business skyline, top dining, and luxury resorts',
    },
    {
      cityAr: 'جدة',
      cityEn: 'Jeddah',
      airportCode: 'JED',
      countryAr: 'المملكة العربية السعودية',
      countryEn: 'Saudi Arabia',
      tagAr: 'عروس البحر الأحمر',
      tagEn: 'Red Sea Bride',
      startingPriceSAR: 265,
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'واجهة البحر، شاليهات أبحر المودرن، والبلد التاريخية التراثية',
      descriptionEn: 'Corniche, Obhur private chalets, and historic Al-Balad',
    },
    {
      cityAr: 'أبها',
      cityEn: 'Abha',
      airportCode: 'RUH',
      countryAr: 'المملكة العربية السعودية',
      countryEn: 'Saudi Arabia',
      tagAr: 'سيدة الضباب والأجواء الباردة',
      tagEn: 'Mist & Green Mountains',
      startingPriceSAR: 310,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'جبال عسير الخضراء، التلفريك المعلق، والقرى التراثية الأصيلة',
      descriptionEn: 'Asir mountain peaks, cable cars, and authentic heritage villages',
    },
    {
      cityAr: 'دبي',
      cityEn: 'Dubai',
      airportCode: 'DXB',
      countryAr: 'الإمارات العربية المتحدة',
      countryEn: 'United Arab Emirates',
      tagAr: 'عاصمة التسوق والفخامة',
      tagEn: 'Shopping & Luxury',
      startingPriceSAR: 540,
      imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'برج خليفة، نخلة جميرا، وأضخم المراكز الترفيهية والتسوق',
      descriptionEn: 'Burj Khalifa, Palm Jumeirah, and world-class retail experiences',
    },
    {
      cityAr: 'إسطنبول',
      cityEn: 'Istanbul',
      airportCode: 'IST',
      countryAr: 'تركيا',
      countryEn: 'Turkey',
      tagAr: 'ملتقى القارتين والبوسفور',
      tagEn: 'Bosphorus & History',
      startingPriceSAR: 890,
      imageUrl: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80',
      descriptionAr: 'رحلات البوسفور البحرية، الأسواق التاريخية، وتنوع الثقافات',
      descriptionEn: 'Bosphorus cruises, Grand Bazaar, and timeless architecture',
    },
  ];

  return (
    <section className="mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-3 border-b border-[#334155]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-[rgba(220,38,38,0.15)] text-[#DC2626]">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              {language === 'ar' ? 'اكتشف العالم مع الرفيق' : 'Explore The World with Al-Rafeeq'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight">
            {language === 'ar' ? 'الوجهات السياحية الأكثر طلباً' : 'Trending Travel Destinations'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-md">
          {language === 'ar'
            ? 'انقر على أي وجهة لضبط البحث فوراً واستعراض أفضل عروض الرحلات والفنادق'
            : 'Click on any destination to instantly configure flight and hotel search options'}
        </p>
      </div>

      {/* Grid of Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.cityEn}
            className="group relative bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden card-soft-glow flex flex-col justify-between transition-all duration-300 hover:border-[#DC2626]/50"
          >
            {/* Image Box */}
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={dest.imageUrl}
                alt={language === 'ar' ? dest.cityAr : dest.cityEn}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/40 to-transparent"></div>

              {/* Tag Pill */}
              <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold border border-white/10 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#DC2626]" />
                <span>{language === 'ar' ? dest.tagAr : dest.tagEn}</span>
              </div>

              {/* Starting Price Pill */}
              <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 px-2.5 py-1 rounded-lg bg-[#DC2626] text-white text-xs font-bold shadow-md shadow-red-950/40">
                <span className="text-[10px] font-normal opacity-90 block">
                  {language === 'ar' ? 'يبدأ من' : 'From'}
                </span>
                <span className="font-mono">{formatPrice(dest.startingPriceSAR)}</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-black text-lg text-[#F8FAFC]">
                    {language === 'ar' ? dest.cityAr : dest.cityEn}
                  </h3>
                  <span className="text-xs font-mono font-semibold text-[#94A3B8] px-2 py-0.5 rounded bg-[#0F172A] border border-[#334155]">
                    {dest.airportCode}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>{language === 'ar' ? dest.countryAr : dest.countryEn}</span>
                </div>
                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {language === 'ar' ? dest.descriptionAr : dest.descriptionEn}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#334155] grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectDestination(dest.cityAr, dest.cityEn, dest.airportCode, 'flights')}
                  className="px-2.5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#DC2626] text-[#F8FAFC] border border-[#334155] hover:border-[#DC2626] text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                >
                  <Plane className="w-3.5 h-3.5 text-[#DC2626] group-hover/btn:text-white transition-colors" />
                  <span>{language === 'ar' ? 'حجز طيران' : 'Flights'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectDestination(dest.cityAr, dest.cityEn, dest.airportCode, 'hotels')}
                  className="px-2.5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#DC2626] text-[#F8FAFC] border border-[#334155] hover:border-[#DC2626] text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer group/btn"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#DC2626] group-hover/btn:text-white transition-colors" />
                  <span>{language === 'ar' ? 'حجز فندق' : 'Hotels'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
