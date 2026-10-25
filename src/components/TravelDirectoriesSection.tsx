import React, { useState } from 'react';
import { 
  Building2, 
  Plane, 
  Palmtree, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { Language, ServiceTab } from '../types';

interface TravelDirectoriesSectionProps {
  language: Language;
  onSelectRoute: (originCode: string, destCode: string, originName: string, destName: string) => void;
  onSelectHotelCity: (city: string) => void;
  onSelectChaletDistrict: (district: string) => void;
  onSelectAirline: (airlineName: string) => void;
}

export const TravelDirectoriesSection: React.FC<TravelDirectoriesSectionProps> = ({
  language,
  onSelectRoute,
  onSelectHotelCity,
  onSelectChaletDistrict,
  onSelectAirline,
}) => {
  // Tabs for Hotels section
  const [hotelTab, setHotelTab] = useState<'destinations' | 'hotels' | 'chalets'>('destinations');

  // Tabs for Flights section
  const [flightTab, setFlightTab] = useState<'routes' | 'departures' | 'destinations' | 'airlines'>('routes');

  // Data matching the user's screenshot exactly!
  const hotelDestinationsColumns = [
    // Column 1 (Right in Arabic RTL)
    [
      { label: 'فنادق في دبي', city: 'دبي' },
      { label: 'فنادق في القاهرة', city: 'القاهرة' },
      { label: 'فنادق في الخبر', city: 'الخبر' },
      { label: 'فنادق في بانكوك', city: 'بانكوك' },
      { label: 'فنادق في عمان', city: 'عمان' },
      { label: 'فنادق في ابها', city: 'أبها' },
      { label: 'فنادق في العلا', city: 'العلا' },
      { label: 'فنادق في ينبع', city: 'ينبع' },
      { label: 'فنادق في بريدة', city: 'بريدة' },
      { label: 'فنادق في الدار البيضاء', city: 'الدار البيضاء' },
    ],
    // Column 2
    [
      { label: 'فنادق في مكة', city: 'مكة المكرمة' },
      { label: 'فنادق في جدة', city: 'جدة' },
      { label: 'فنادق في المنورة', city: 'المدينة المنورة' },
      { label: 'فنادق في شرم الشيخ', city: 'شرم الشيخ' },
      { label: 'فنادق في موسكو', city: 'موسكو' },
      { label: 'فنادق في نيويورك', city: 'نيويورك' },
      { label: 'فنادق في تبوك', city: 'تبوك' },
      { label: 'فنادق في تبليسي', city: 'تبليسي' },
      { label: 'فنادق في سنغافورة', city: 'سنغافورة' },
      { label: 'فنادق في مكة المكرمة', city: 'مكة المكرمة' },
    ],
    // Column 3
    [
      { label: 'فنادق في الرياض', city: 'الرياض' },
      { label: 'فنادق في اسطنبول', city: 'إسطنبول' },
      { label: 'فنادق في باريس', city: 'باريس' },
      { label: 'فنادق في ابوظبي', city: 'أبوظبي' },
      { label: 'فنادق في الدمام', city: 'الدمام' },
      { label: 'فنادق في باكو', city: 'باكو' },
      { label: 'فنادق في حائل', city: 'حائل' },
      { label: 'فنادق في الكويت', city: 'الكويت' },
      { label: 'فنادق في مدريد', city: 'مدريد' },
      { label: 'فنادق في المدينة', city: 'المدينة المنورة' },
    ],
    // Column 4
    [
      { label: 'فنادق في لندن', city: 'لندن' },
      { label: 'فنادق في الدوحة', city: 'الدوحة' },
      { label: 'فنادق في بوكيت', city: 'بوكيت' },
      { label: 'فنادق في ميلانو', city: 'ميلانو' },
      { label: 'فنادق في طرابزون', city: 'طرابزون' },
      { label: 'فنادق في الطائف', city: 'الطائف' },
      { label: 'فنادق في جازان', city: 'جازان' },
      { label: 'فنادق في إنترلاكن', city: 'إنترلاكن' },
      { label: 'فنادق في طوكيو', city: 'طوكيو' },
      { label: 'فنادق في جنيف', city: 'جنيف' },
    ],
  ];

  const popularHotelsColumns = [
    [
      { label: 'فندق الريتز كارلتون الرياض', city: 'الرياض' },
      { label: 'فندق ساعة مكة فيرمونت المطل على الكعبة', city: 'مكة المكرمة' },
      { label: 'فندق دار التقوى المدينة المنورة', city: 'المدينة المنورة' },
      { label: 'فندق أصيلة لاكشري كولكشن جدة', city: 'جدة' },
      { label: 'فندق الفورسيزونز برج المملكة', city: 'الرياض' },
      { label: 'منتجع هابيتاس العلا الفاخر', city: 'العلا' },
      { label: 'فندق رافلز قصر مكة', city: 'مكة المكرمة' },
      { label: 'فندق هيلتون المؤتمرات مكة', city: 'مكة المكرمة' },
    ],
    [
      { label: 'فندق شادن العلا الصحراوي', city: 'العلا' },
      { label: 'فندق ماريوت الحي الدبلوماسي', city: 'الرياض' },
      { label: 'فندق شيراتون الدمام والخبر', city: 'الدمام' },
      { label: 'فندق بارك حياة جدة مارينا', city: 'جدة' },
      { label: 'فندق أوبروي المدينة المنورة', city: 'المدينة المنورة' },
      { label: 'فندق هيلتون جدة الكورنيش', city: 'جدة' },
      { label: 'فندق كمبينسكي العثمان الخبر', city: 'الدمام' },
      { label: 'فندق موفنبيك أنوار المدينة', city: 'المدينة المنورة' },
    ],
    [
      { label: 'فندق أتلانتس النخلة دبي', city: 'دبي' },
      { label: 'فندق برج العرب جميرا', city: 'دبي' },
      { label: 'فندق تشيغان بالاس كمبينسكي إسطنبول', city: 'إسطنبول' },
      { label: 'فندق فورسيزونز نايل بلازا القاهرة', city: 'القاهرة' },
      { label: 'فندق ماريوت مينا هاوس الأهرامات', city: 'القاهرة' },
      { label: 'فندق الريتز لندن بيكاديللي', city: 'لندن' },
      { label: 'فندق دبليو دبي شاطئ النخلة', city: 'دبي' },
      { label: 'فندق ذا تشيدي مسقط', city: 'عمان' },
    ],
    [
      { label: 'فندق سوفيتل الجزيرة القاهرة', city: 'القاهرة' },
      { label: 'فندق والدورف أستوريا دبي', city: 'دبي' },
      { label: 'فندق قصر السراب أبوظبي', city: 'أبوظبي' },
      { label: 'فندق فورسيزونز إسطنبول البوسفور', city: 'إسطنبول' },
      { label: 'فندق ماندارين أورينتال لندن', city: 'لندن' },
      { label: 'فندق جورج الخامس باريس', city: 'باريس' },
      { label: 'فندق حياة ريجنسي مكة جبل عمر', city: 'مكة المكرمة' },
      { label: 'فندق سويسوتيل المقام مكة', city: 'مكة المكرمة' },
    ],
  ];

  const popularChaletsColumns = [
    [
      { label: 'شاليهات شمال الرياض الرمال', district: 'شمال الرياض - حي الرمال' },
      { label: 'شاليهات الدرعية التراثية VIP', district: 'الدرعية التراثية' },
      { label: 'شاليهات نمار والرياض لاند', district: 'جنوب غرب الرياض' },
      { label: 'شاليهات حي القيروان والملقا', district: 'شمال الرياض' },
      { label: 'شاليهات الثمامة بمسابح خاصة', district: 'شمال شرق الرياض' },
    ],
    [
      { label: 'شاليهات أبحر الشمالية جدة', district: 'أبحر الشمالية' },
      { label: 'فلل درة العروس المطلة على البحر', district: 'درة العروس' },
      { label: 'شاليهات كورنيش جدة الجنوبي', district: 'جنوب جدة' },
      { label: 'شاليهات شاطئ السيف بجدة', district: 'أبحر الجنوبية' },
      { label: 'شاليهات خليج سلمان جدة', district: 'شمال جدة' },
    ],
    [
      { label: 'شاليهات شاطئ نصف القمر الخبر', district: 'الخبر - هاف مون' },
      { label: 'شاليهات شاطئ العزيزية الخبر', district: 'العزيزية' },
      { label: 'منتجعات النخيل بالدمام', district: 'الدمام' },
      { label: 'شاليهات وشاطئ الغروب الخبر', district: 'الخبر' },
      { label: 'شاليهات شاطئ الدانة بالشرقية', district: 'الهاف مون' },
    ],
    [
      { label: 'شاليهات الهدا والضباب بالطائف', district: 'الهدا' },
      { label: 'منتجعات الشفا الجبلية الباردة', district: 'الشفا' },
      { label: 'فلل وشاليهات السودة بأبها', district: 'أبها - السودة' },
      { label: 'شاليهات مزارع النخيل بالقصيم', district: 'عنيزة وبريدة' },
      { label: 'شاليهات جازان البحرية والمطلة', district: 'جازان الكورنيش' },
    ],
  ];

  // Flights directory data matching the screenshot!
  const popularFlightRoutes = [
    // Column 1
    [
      { label: 'الرياض إلى جدة', from: 'RUH', to: 'JED', fromName: 'الرياض', toName: 'جدة' },
      { label: 'الرياض إلى القاهرة', from: 'RUH', to: 'CAI', fromName: 'الرياض', toName: 'القاهرة' },
      { label: 'جدة إلى القاهرة', from: 'JED', to: 'CAI', fromName: 'جدة', toName: 'القاهرة' },
      { label: 'جدة إلى الرياض', from: 'JED', to: 'RUH', fromName: 'جدة', toName: 'الرياض' },
      { label: 'الرياض إلى دبي', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'دبي' },
      { label: 'جدة إلى دبي', from: 'JED', to: 'DXB', fromName: 'جدة', toName: 'دبي' },
    ],
    // Column 2
    [
      { label: 'الرياض إلى اسطنبول', from: 'RUH', to: 'IST', fromName: 'الرياض', toName: 'إسطنبول' },
      { label: 'الدمام إلى الرياض', from: 'DMM', to: 'RUH', fromName: 'الدمام', toName: 'الرياض' },
      { label: 'الرياض إلى لندن', from: 'RUH', to: 'LHR', fromName: 'الرياض', toName: 'لندن' },
      { label: 'جدة إلى المدينة المنورة', from: 'JED', to: 'MED', fromName: 'جدة', toName: 'المدينة المنورة' },
      { label: 'الرياض إلى أبها', from: 'RUH', to: 'MED', fromName: 'الرياض', toName: 'أبها' },
      { label: 'الدمام إلى جدة', from: 'DMM', to: 'JED', fromName: 'الدمام', toName: 'جدة' },
    ],
    // Column 3
    [
      { label: 'الرياض إلى الدوحة', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'الدوحة' },
      { label: 'جدة إلى اسطنبول', from: 'JED', to: 'IST', fromName: 'جدة', toName: 'إسطنبول' },
      { label: 'الرياض إلى باريس', from: 'RUH', to: 'LHR', fromName: 'الرياض', toName: 'باريس' },
      { label: 'الدمام إلى القاهرة', from: 'DMM', to: 'CAI', fromName: 'الدمام', toName: 'القاهرة' },
      { label: 'جدة إلى طرابزون', from: 'JED', to: 'IST', fromName: 'جدة', toName: 'طرابزون' },
      { label: 'الرياض إلى باكو', from: 'RUH', to: 'IST', fromName: 'الرياض', toName: 'باكو' },
    ],
    // Column 4
    [
      { label: 'الرياض إلى بانكوك', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'بانكوك' },
      { label: 'جدة إلى الدوحة', from: 'JED', to: 'DXB', fromName: 'جدة', toName: 'الدوحة' },
      { label: 'المدينة المنورة إلى القاهرة', from: 'MED', to: 'CAI', fromName: 'المدينة المنورة', toName: 'القاهرة' },
      { label: 'الرياض إلى تبليسي', from: 'RUH', to: 'IST', fromName: 'الرياض', toName: 'تبليسي' },
      { label: 'الرياض إلى كوالالمبور', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'كوالالمبور' },
      { label: 'جدة إلى لندن', from: 'JED', to: 'LHR', fromName: 'جدة', toName: 'لندن' },
    ],
  ];

  const popularDepartures = [
    [
      { label: 'رحلات طيران من الرياض (RUH)', from: 'RUH', to: 'JED', fromName: 'الرياض', toName: 'جدة' },
      { label: 'رحلات طيران من جدة (JED)', from: 'JED', to: 'RUH', fromName: 'جدة', toName: 'الرياض' },
      { label: 'رحلات طيران من الدمام (DMM)', from: 'DMM', to: 'RUH', fromName: 'الدمام', toName: 'الرياض' },
      { label: 'رحلات طيران من المدينة المنورة (MED)', from: 'MED', to: 'RUH', fromName: 'المدينة المنورة', toName: 'الرياض' },
    ],
    [
      { label: 'رحلات طيران من أبها', from: 'RUH', to: 'JED', fromName: 'أبها', toName: 'جدة' },
      { label: 'رحلات طيران من تبوك', from: 'RUH', to: 'JED', fromName: 'تبوك', toName: 'جدة' },
      { label: 'رحلات طيران من القصيم', from: 'RUH', to: 'JED', fromName: 'القصيم', toName: 'جدة' },
      { label: 'رحلات طيران من الطائف', from: 'JED', to: 'RUH', fromName: 'الطائف', toName: 'الرياض' },
    ],
    [
      { label: 'رحلات طيران من جازان', from: 'RUH', to: 'JED', fromName: 'جازان', toName: 'جدة' },
      { label: 'رحلات طيران من حائل', from: 'RUH', to: 'JED', fromName: 'حائل', toName: 'الرياض' },
      { label: 'رحلات طيران من ينبع', from: 'JED', to: 'RUH', fromName: 'ينبع', toName: 'الرياض' },
      { label: 'رحلات طيران من نجران', from: 'RUH', to: 'JED', fromName: 'نجران', toName: 'الرياض' },
    ],
    [
      { label: 'رحلات طيران من دبي (DXB)', from: 'DXB', to: 'RUH', fromName: 'دبي', toName: 'الرياض' },
      { label: 'رحلات طيران من القاهرة (CAI)', from: 'CAI', to: 'RUH', fromName: 'القاهرة', toName: 'الرياض' },
      { label: 'رحلات طيران من إسطنبول (IST)', from: 'IST', to: 'RUH', fromName: 'إسطنبول', toName: 'الرياض' },
      { label: 'رحلات طيران من لندن (LHR)', from: 'LHR', to: 'RUH', fromName: 'لندن', toName: 'الرياض' },
    ],
  ];

  const popularDestinations = [
    [
      { label: 'رحلات إلى دبي', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'دبي' },
      { label: 'رحلات إلى القاهرة', from: 'RUH', to: 'CAI', fromName: 'الرياض', toName: 'القاهرة' },
      { label: 'رحلات إلى إسطنبول', from: 'RUH', to: 'IST', fromName: 'الرياض', toName: 'إسطنبول' },
      { label: 'رحلات إلى لندن', from: 'RUH', to: 'LHR', fromName: 'الرياض', toName: 'لندن' },
    ],
    [
      { label: 'رحلات إلى الدوحة', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'الدوحة' },
      { label: 'رحلات إلى باريس', from: 'RUH', to: 'LHR', fromName: 'الرياض', toName: 'باريس' },
      { label: 'رحلات إلى بانكوك', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'بانكوك' },
      { label: 'رحلات إلى باكو', from: 'RUH', to: 'IST', fromName: 'الرياض', toName: 'باكو' },
    ],
    [
      { label: 'رحلات إلى تبليسي', from: 'RUH', to: 'IST', fromName: 'الرياض', toName: 'تبليسي' },
      { label: 'رحلات إلى كوالالمبور', from: 'RUH', to: 'DXB', fromName: 'الرياض', toName: 'كوالالمبور' },
      { label: 'رحلات إلى ميلانو', from: 'RUH', to: 'LHR', fromName: 'الرياض', toName: 'ميلانو' },
      { label: 'رحلات إلى سراييفو', from: 'RUH', to: 'IST', fromName: 'الرياض', toName: 'سراييفو' },
    ],
    [
      { label: 'رحلات إلى طرابزون', from: 'JED', to: 'IST', fromName: 'جدة', toName: 'طرابزون' },
      { label: 'رحلات إلى شرم الشيخ', from: 'RUH', to: 'CAI', fromName: 'الرياض', toName: 'شرم الشيخ' },
      { label: 'رحلات إلى مدريد', from: 'RUH', to: 'LHR', fromName: 'الرياض', toName: 'مدريد' },
      { label: 'رحلات إلى فيينا', from: 'RUH', to: 'LHR', fromName: 'الرياض', toName: 'فيينا' },
    ],
  ];

  const popularAirlines = [
    [
      { label: 'تذاكر الخطوط الجوية السعودية (Saudia)', airline: 'الخطوط السعودية' },
      { label: 'تذاكر طيران ناس (Flynas)', airline: 'طيران ناس' },
      { label: 'تذاكر طيران أديل (Flyadeal)', airline: 'طيران أديل' },
      { label: 'تذاكر طيران الإمارات (Emirates)', airline: 'طيران الإمارات' },
    ],
    [
      { label: 'تذاكر الخطوط الجوية القطرية (Qatar Airways)', airline: 'الخطوط القطرية' },
      { label: 'تذاكر الخطوط التركية (Turkish Airlines)', airline: 'الخطوط التركية' },
      { label: 'تذاكر الاتحاد للطيران (Etihad Airways)', airline: 'الاتحاد للطيران' },
      { label: 'تذاكر مصر للطيران (EgyptAir)', airline: 'مصر للطيران' },
    ],
    [
      { label: 'تذاكر طيران الجزيرة (Jazeera Airways)', airline: 'طيران الجزيرة' },
      { label: 'تذاكر الخطوط الجوية الكويتية (Kuwait Airways)', airline: 'الخطوط الكويتية' },
      { label: 'تذاكر فلاي دبي (Flydubai)', airline: 'فلاي دبي' },
      { label: 'تذاكر الطيران العماني (Oman Air)', airline: 'الطيران العماني' },
    ],
    [
      { label: 'تذاكر ويز إير (Wizz Air Abu Dhabi)', airline: 'ويز إير' },
      { label: 'تذاكر طيران الخليج (Gulf Air)', airline: 'طيران الخليج' },
      { label: 'تذاكر الخطوط البريطانية (British Airways)', airline: 'الخطوط البريطانية' },
      { label: 'تذاكر لوفتهانزا (Lufthansa)', airline: 'لوفتهانزا' },
    ],
  ];

  return (
    <section className="space-y-12 mb-16 pt-6 border-t border-[#334155]">
      
      {/* ======================================================== */}
      {/* 1. الفنادق الأكثر رواجاً (Most Popular Hotels) */}
      {/* ======================================================== */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 sm:p-8 card-soft-glow space-y-6">
        
        {/* Section Header with Tabs Matching the Screenshot Exactly */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(220,38,38,0.15)] border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight">
                {language === 'ar' ? 'الفنادق الأكثر رواجاً' : 'Most Popular Hotels'}
              </h2>
              <p className="text-xs text-[#94A3B8]">
                {language === 'ar' ? 'اختر وجهتك أو فندقك المفضل لاستعراض التوافر والأسعار فورياً' : 'Select your destination or favorite hotel for instant live rates'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 self-start md:self-auto border-b border-[#334155] md:border-b-0 pb-1 md:pb-0 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setHotelTab('destinations')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer relative ${
                hotelTab === 'destinations'
                  ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-4 border-[#DC2626]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
              }`}
            >
              <span>{language === 'ar' ? 'أشهر الوجهات' : 'Top Destinations'}</span>
              {hotelTab === 'destinations' && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#DC2626] mr-2 rtl:ml-2 animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setHotelTab('hotels')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer relative ${
                hotelTab === 'hotels'
                  ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-4 border-[#DC2626]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
              }`}
            >
              <span>{language === 'ar' ? 'أشهر الفنادق' : 'Top Hotels'}</span>
              {hotelTab === 'hotels' && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#DC2626] mr-2 rtl:ml-2 animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setHotelTab('chalets')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer relative ${
                hotelTab === 'chalets'
                  ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-4 border-[#DC2626]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
              }`}
            >
              <span>{language === 'ar' ? 'أشهر الشاليهات والفلل' : 'Top Chalets'}</span>
              {hotelTab === 'chalets' && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#DC2626] mr-2 rtl:ml-2 animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* 4 Responsive Columns of Links (Exactly like User Screenshot) */}
        {hotelTab === 'destinations' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 pt-2">
            {hotelDestinationsColumns.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2.5">
                {col.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    type="button"
                    onClick={() => onSelectHotelCity(item.city)}
                    className="w-full text-start flex items-center justify-between text-xs sm:text-sm text-[#94A3B8] hover:text-[#DC2626] hover:translate-x-1 rtl:hover:-translate-x-1 transition-all py-1 cursor-pointer group"
                  >
                    <span className="font-medium group-hover:font-bold">{item.label}</span>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#DC2626] transition-opacity rtl:rotate-0 rotate-180" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {hotelTab === 'hotels' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 pt-2">
            {popularHotelsColumns.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2.5">
                {col.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    type="button"
                    onClick={() => onSelectHotelCity(item.city)}
                    className="w-full text-start flex items-center justify-between text-xs sm:text-sm text-[#94A3B8] hover:text-[#DC2626] hover:translate-x-1 rtl:hover:-translate-x-1 transition-all py-1 cursor-pointer group"
                  >
                    <span className="font-medium group-hover:font-bold line-clamp-1">{item.label}</span>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#DC2626] transition-opacity rtl:rotate-0 rotate-180 shrink-0" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {hotelTab === 'chalets' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 pt-2">
            {popularChaletsColumns.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2.5">
                {col.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    type="button"
                    onClick={() => onSelectChaletDistrict(item.district)}
                    className="w-full text-start flex items-center justify-between text-xs sm:text-sm text-[#94A3B8] hover:text-[#DC2626] hover:translate-x-1 rtl:hover:-translate-x-1 transition-all py-1 cursor-pointer group"
                  >
                    <span className="font-medium group-hover:font-bold line-clamp-1">{item.label}</span>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#DC2626] transition-opacity rtl:rotate-0 rotate-180 shrink-0" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* Intermediate Callout: "احجز أفضل رحلات الطيران والفنادق" */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-[rgba(220,38,38,0.12)] via-[#1E293B] to-[#0F172A] border border-[#DC2626]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-950/40">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#F8FAFC]">
              {language === 'ar' ? 'احجز أفضل رحلات الطيران والفنادق' : 'Book The Best Flights & Hotels'}
            </h3>
            <p className="text-xs text-[#94A3B8]">
              {language === 'ar'
                ? 'استمتع بأسعار حصرية مباشرة، تأكيد فوري، وضمان أرخص سعر مع كود RED26'
                : 'Enjoy direct inventory fares, instant GDS booking, and best rate guarantee with RED26'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-[#0F172A] border border-[#334155] text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>تأكيد فوري عبر واتساب</span>
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. الرحلات الجوية الرائجة (Trending Flight Routes & Sectors) */}
      {/* ======================================================== */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 sm:p-8 card-soft-glow space-y-6">
        
        {/* Section Header with Tabs Matching the Screenshot Exactly */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(220,38,38,0.15)] border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#F8FAFC] tracking-tight">
                {language === 'ar' ? 'الرحلات الجوية الرائجة' : 'Trending Flight Routes'}
              </h2>
              <p className="text-xs text-[#94A3B8]">
                {language === 'ar' ? 'أشهر المسارات الداخلية والدولية الأكثر حجزاً مع شركات الطيران المعتمدة' : 'Most booked domestic and international routes with certified carriers'}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 self-start md:self-auto border-b border-[#334155] md:border-b-0 pb-1 md:pb-0 overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setFlightTab('routes')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer relative shrink-0 ${
                flightTab === 'routes'
                  ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-4 border-[#DC2626]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
              }`}
            >
              <span>{language === 'ar' ? 'أشهر مسارات رحلات الطيران' : 'Top Flight Routes'}</span>
              {flightTab === 'routes' && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#DC2626] mr-2 rtl:ml-2 animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFlightTab('departures')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer relative shrink-0 ${
                flightTab === 'departures'
                  ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-4 border-[#DC2626]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
              }`}
            >
              <span>{language === 'ar' ? 'أشهر رحلات الطيران المغادرة' : 'Top Departures'}</span>
              {flightTab === 'departures' && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#DC2626] mr-2 rtl:ml-2 animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFlightTab('destinations')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer relative shrink-0 ${
                flightTab === 'destinations'
                  ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-4 border-[#DC2626]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
              }`}
            >
              <span>{language === 'ar' ? 'أشهر وجهات رحلات الطيران' : 'Top Destinations'}</span>
              {flightTab === 'destinations' && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#DC2626] mr-2 rtl:ml-2 animate-pulse"></span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFlightTab('airlines')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer relative shrink-0 ${
                flightTab === 'airlines'
                  ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-b-2 md:border-b-0 md:border-r-4 border-[#DC2626]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#0F172A]'
              }`}
            >
              <span>{language === 'ar' ? 'شركات الطيران' : 'Airlines'}</span>
              {flightTab === 'airlines' && (
                <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#DC2626] mr-2 rtl:ml-2 animate-pulse"></span>
              )}
            </button>
          </div>
        </div>

        {/* 4 Responsive Columns of Flight Links */}
        {flightTab === 'routes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 pt-2">
            {popularFlightRoutes.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2.5">
                {col.map((route, routeIdx) => (
                  <button
                    key={routeIdx}
                    type="button"
                    onClick={() => onSelectRoute(route.from, route.to, route.fromName, route.toName)}
                    className="w-full text-start flex items-center justify-between text-xs sm:text-sm text-[#94A3B8] hover:text-[#DC2626] hover:translate-x-1 rtl:hover:-translate-x-1 transition-all py-1 cursor-pointer group"
                  >
                    <span className="font-medium group-hover:font-bold">{route.label}</span>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#DC2626] transition-opacity rtl:rotate-0 rotate-180" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {flightTab === 'departures' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 pt-2">
            {popularDepartures.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2.5">
                {col.map((route, routeIdx) => (
                  <button
                    key={routeIdx}
                    type="button"
                    onClick={() => onSelectRoute(route.from, route.to, route.fromName, route.toName)}
                    className="w-full text-start flex items-center justify-between text-xs sm:text-sm text-[#94A3B8] hover:text-[#DC2626] hover:translate-x-1 rtl:hover:-translate-x-1 transition-all py-1 cursor-pointer group"
                  >
                    <span className="font-medium group-hover:font-bold line-clamp-1">{route.label}</span>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#DC2626] transition-opacity rtl:rotate-0 rotate-180 shrink-0" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {flightTab === 'destinations' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 pt-2">
            {popularDestinations.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2.5">
                {col.map((route, routeIdx) => (
                  <button
                    key={routeIdx}
                    type="button"
                    onClick={() => onSelectRoute(route.from, route.to, route.fromName, route.toName)}
                    className="w-full text-start flex items-center justify-between text-xs sm:text-sm text-[#94A3B8] hover:text-[#DC2626] hover:translate-x-1 rtl:hover:-translate-x-1 transition-all py-1 cursor-pointer group"
                  >
                    <span className="font-medium group-hover:font-bold line-clamp-1">{route.label}</span>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#DC2626] transition-opacity rtl:rotate-0 rotate-180 shrink-0" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

        {flightTab === 'airlines' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 gap-x-6 pt-2">
            {popularAirlines.map((col, colIdx) => (
              <div key={colIdx} className="space-y-2.5">
                {col.map((airlineItem, airlineIdx) => (
                  <button
                    key={airlineIdx}
                    type="button"
                    onClick={() => onSelectAirline(airlineItem.airline)}
                    className="w-full text-start flex items-center justify-between text-xs sm:text-sm text-[#94A3B8] hover:text-[#DC2626] hover:translate-x-1 rtl:hover:-translate-x-1 transition-all py-1 cursor-pointer group"
                  >
                    <span className="font-medium group-hover:font-bold line-clamp-1">{airlineItem.label}</span>
                    <ArrowLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#DC2626] transition-opacity rtl:rotate-0 rotate-180 shrink-0" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}

      </div>

    </section>
  );
};
