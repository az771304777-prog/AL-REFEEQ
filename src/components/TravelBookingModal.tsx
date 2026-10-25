import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Plane, 
  Building2, 
  Palmtree, 
  Luggage, 
  Car, 
  ShieldCheck, 
  Tag, 
  Phone, 
  MessageCircle, 
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { 
  Language, 
  Currency, 
  FlightItem, 
  HotelItem, 
  ChaletItem, 
  PackageItem, 
  CarItem, 
  BookingRecord 
} from '../types';
import { travelTranslations } from '../utils/travelTranslations';
import { STORE_CONTACT } from '../data/travelData';

interface TravelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  flight: FlightItem | null;
  hotel: HotelItem | null;
  chalet: ChaletItem | null;
  packageItem?: PackageItem | null;
  car?: CarItem | null;
  appliedCoupon: string | null;
  couponDiscountPercent: number;
  onApplyCoupon: (code: string) => boolean;
  onConfirmBooking: (record: BookingRecord) => void;
}

export const TravelBookingModal: React.FC<TravelBookingModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  flight,
  hotel,
  chalet,
  packageItem,
  car,
  appliedCoupon,
  couponDiscountPercent,
  onApplyCoupon,
  onConfirmBooking,
}) => {
  const t = travelTranslations[language];

  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+966552097512');
  const [paymentMethod, setPaymentMethod] = useState<'applepay' | 'mada' | 'tamara' | 'tabby' | 'card'>('applepay');
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [generatedPnr, setGeneratedPnr] = useState('');

  if (!isOpen) return null;

  // Calculate base price
  let basePriceSAR = 0;
  let title = '';
  let subtitle = '';
  let type: 'flight' | 'hotel' | 'chalet' | 'package' | 'car' = 'flight';

  if (flight) {
    basePriceSAR = flight.priceSAR;
    title = `${flight.airline} (${flight.flightNumber})`;
    subtitle = `${flight.origin.cityAr} (${flight.origin.code}) ➔ ${flight.destination.cityAr} (${flight.destination.code})`;
    type = 'flight';
  } else if (hotel) {
    basePriceSAR = hotel.pricePerNightSAR * 3; // 3 nights default
    title = language === 'ar' ? hotel.nameAr : hotel.nameEn;
    subtitle = `${hotel.cityAr} • ${hotel.roomType} (3 ليالٍ)`;
    type = 'hotel';
  } else if (chalet) {
    basePriceSAR = chalet.pricePerNightSAR * 2; // 2 nights default
    title = language === 'ar' ? chalet.nameAr : chalet.nameEn;
    subtitle = `${chalet.cityAr} - ${chalet.districtAr} (حجز ليلتين مع مسبح خاص)`;
    type = 'chalet';
  } else if (packageItem) {
    basePriceSAR = packageItem.priceSAR;
    title = language === 'ar' ? packageItem.titleAr : packageItem.titleEn;
    subtitle = `${packageItem.destinationAr} • ${packageItem.durationDays} أيام / ${packageItem.durationNights} ليالٍ شاملة`;
    type = 'package';
  } else if (car) {
    basePriceSAR = car.pricePerDaySAR * 3; // 3 days default
    title = language === 'ar' ? car.modelAr : car.modelEn;
    subtitle = `${car.categoryAr} • استئجار 3 أيام مع توصيل مجاني`;
    type = 'car';
  }

  const discountAmountSAR = appliedCoupon
    ? Math.round(basePriceSAR * (couponDiscountPercent / 100))
    : 0;
  const subtotalAfterDiscountSAR = Math.max(0, basePriceSAR - discountAmountSAR);
  const vatSAR = Math.round(subtotalAfterDiscountSAR * 0.15);
  const finalTotalSAR = subtotalAfterDiscountSAR + vatSAR;

  const formatPrice = (sar: number) => {
    const converted = Math.round(sar * currency.rateAgainstSAR);
    return `${converted.toLocaleString()} ${currency.symbol}`;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const ok = onApplyCoupon(couponCodeInput.trim());
    if (ok) {
      setCouponMsg(t.couponSuccess);
    } else {
      setCouponMsg(t.couponInvalid);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const pnrCode = `RQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedPnr(pnrCode);

    const newRecord: BookingRecord = {
      id: `BK-${Date.now()}`,
      pnr: pnrCode,
      type,
      itemTitle: title,
      itemSubtitle: subtitle,
      passengerName: name,
      nationalIdOrPassport: nationalId || '1098765432',
      email: email || 'traveler@alrafeeq.com',
      phone: phone,
      dates: new Date().toISOString().split('T')[0],
      totalPriceSAR: finalTotalSAR,
      discountAmountSAR,
      paymentMethod,
      status: 'مؤكد',
      createdAt: new Date().toLocaleString(),
    };

    onConfirmBooking(newRecord);
    setIsConfirmed(true);

    // Auto open WhatsApp with the reservation details after confirmation
    const waText = encodeURIComponent(
      `مرحباً الرفيق للسياحة، أود تأكيد حجزي:\n\nرقم الحجز: ${pnrCode}\nالخدمة: ${title}\nالتفاصيل: ${subtitle}\nاسم المسافر: ${name}\nالمبلغ الإجمالي: ${finalTotalSAR} ر.س\nكود الخصم: ${appliedCoupon || 'لا يوجد'}\nطريقة الدفع: ${paymentMethod}`
    );
    setTimeout(() => {
      window.open(`${STORE_CONTACT.whatsappUrl}${waText}`, '_blank');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="bg-[#1E293B] border border-[#334155] rounded-xl w-full max-w-2xl my-8 shadow-2xl overflow-hidden card-soft-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#334155] flex items-center justify-between bg-[#0F172A]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DC2626]/20 border border-[#DC2626]/40 flex items-center justify-center text-[#DC2626]">
              {type === 'flight' && <Plane className="w-5 h-5" />}
              {type === 'hotel' && <Building2 className="w-5 h-5" />}
              {type === 'chalet' && <Palmtree className="w-5 h-5" />}
              {type === 'package' && <Luggage className="w-5 h-5" />}
              {type === 'car' && <Car className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-[#F8FAFC]">
                {t.instantBookingConfirm}
              </h3>
              <p className="text-xs text-[#94A3B8]">
                {language === 'ar' ? 'تأكيد فوري ودفع آمن مشفر' : 'Instant confirmation & 256-bit SSL'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isConfirmed ? (
          <form onSubmit={handleSubmitBooking} className="p-5 sm:p-6 space-y-6">
            
            {/* Item Card Overview */}
            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#334155]">
              <span className="text-[11px] font-bold text-[#DC2626] uppercase block mb-1">
                {language === 'ar' ? 'ملخص الحجز المحدد' : 'Booking Selection'}
              </span>
              <h4 className="font-black text-sm sm:text-base text-[#F8FAFC]">{title}</h4>
              <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>
            </div>

            {/* Passenger / Customer Details */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-[#F8FAFC] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                <span>{t.passengerDetails}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#94A3B8] mb-1">{t.fullName} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'ar' ? 'مثال: محمد عبدالله المطيري' : 'e.g. Mohammed Al-Mutairi'}
                    className="w-full bg-[#0F172A] border border-[#334155] focus:border-[#DC2626] rounded-xl px-3.5 py-2.5 text-xs text-[#F8FAFC] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#94A3B8] mb-1">{t.phone} (واتساب) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0F172A] border border-[#334155] focus:border-[#DC2626] rounded-xl px-3.5 py-2.5 text-xs text-[#F8FAFC] font-mono focus:outline-none dir-ltr text-start"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#94A3B8] mb-1">{t.idNumber}</label>
                  <input
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    placeholder="10XXXXXXXX"
                    className="w-full bg-[#0F172A] border border-[#334155] focus:border-[#DC2626] rounded-xl px-3.5 py-2.5 text-xs text-[#F8FAFC] font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[#94A3B8] mb-1">{t.email}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#0F172A] border border-[#334155] focus:border-[#DC2626] rounded-xl px-3.5 py-2.5 text-xs text-[#F8FAFC] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Promo Coupon Form */}
            <div className="p-3.5 rounded-xl bg-[#0F172A] border border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#DC2626]" />
                <div>
                  <span className="block text-xs font-bold text-[#F8FAFC]">
                    {appliedCoupon ? `الكود المطبّق: ${appliedCoupon} (-${couponDiscountPercent}%)` : 'هل لديك كود خصم إضافي؟'}
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">كود RED26 مفعل تلقائياً لخصم 20%</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  placeholder="RED26"
                  className="bg-[#1E293B] border border-[#334155] focus:border-[#DC2626] rounded-xl px-3 py-1.5 text-xs text-[#F8FAFC] font-mono uppercase focus:outline-none w-28 text-center"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3.5 py-1.5 rounded-xl bg-[#DC2626] hover:bg-[#EF4444] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  {t.applyCoupon}
                </button>
              </div>
            </div>

            {couponMsg && (
              <p className="text-xs text-center text-emerald-400 font-semibold">{couponMsg}</p>
            )}

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#F8FAFC]">{t.paymentMethod}</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'applepay', label: 'Apple Pay' },
                  { id: 'mada', label: 'مدى Mada' },
                  { id: 'tamara', label: 'تمارا (4 دفعات)' },
                  { id: 'tabby', label: 'تابي (4 دفعات)' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === pm.id
                        ? 'bg-[rgba(220,38,38,0.15)] text-[#F8FAFC] border-[#DC2626]'
                        : 'bg-[#0F172A] text-[#94A3B8] border-[#334155] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#334155] space-y-2 text-xs">
              <div className="flex justify-between text-[#94A3B8]">
                <span>{t.subtotal}</span>
                <span className="font-mono">{formatPrice(basePriceSAR)}</span>
              </div>
              {discountAmountSAR > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>{t.discount} ({couponDiscountPercent}%)</span>
                  <span className="font-mono">- {formatPrice(discountAmountSAR)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#94A3B8]">
                <span>{t.vat}</span>
                <span className="font-mono">{formatPrice(vatSAR)}</span>
              </div>
              <div className="pt-2 border-t border-[#334155] flex justify-between items-baseline text-sm font-black text-[#F8FAFC]">
                <span>{t.totalAmount}</span>
                <span className="text-xl font-mono text-[#F8FAFC]">{formatPrice(finalTotalSAR)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-[#334155] text-white text-xs font-semibold hover:bg-[#475569] transition-colors cursor-pointer"
              >
                {t.close}
              </button>
              <button
                type="submit"
                className="btn-accent-red px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-red-950/50"
              >
                <Check className="w-4 h-4" />
                <span>{t.confirmBooking}</span>
              </button>
            </div>

          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                {language === 'ar' ? 'تم الحجز بنجاح ومصادقة التذكرة' : 'Booking Successfully Confirmed'}
              </span>
              <h3 className="text-2xl font-black text-[#F8FAFC]">
                {language === 'ar' ? 'شكراً لاختيارك الرفيق للسياحة والسفر' : 'Thank you for choosing Al-Rafeeq Travel'}
              </h3>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                {language === 'ar'
                  ? 'تم إصدار رقم الحجز المرجعي (PNR) وتم توجيه التذكرة الرسمية وتفاصيل السفر عبر الواتساب والبريد.'
                  : 'Your PNR booking reference has been generated and dispatched to your WhatsApp.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#334155] max-w-sm mx-auto text-center space-y-1">
              <span className="text-[11px] text-[#94A3B8]">{language === 'ar' ? 'الرقم المرجعي الرسمي (PNR):' : 'Official PNR Reference:'}</span>
              <span className="block font-mono text-2xl font-extrabold text-[#DC2626] tracking-wider">
                {generatedPnr}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <a
                href={`${STORE_CONTACT.whatsappUrl}${encodeURIComponent(
                  `مرحباً الرفيق، أود الاستفسار عن حجزي رقم ${generatedPnr}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === 'ar' ? 'فتح المحادثة عبر الواتساب' : 'Open WhatsApp Details'}</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#334155] text-white text-xs font-semibold hover:bg-[#475569] transition-colors cursor-pointer"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
