import React, { useState } from 'react';
import { X, Star, MapPin, Check, Phone, MessageCircle } from 'lucide-react';
import { HotelItem, Language, Currency } from '../types';
import { STORE_CONTACT } from '../data/travelData';

interface TravelGalleryModalProps {
  hotel: HotelItem | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  onBookHotel: (h: HotelItem) => void;
}

export const TravelGalleryModal: React.FC<TravelGalleryModalProps> = ({
  hotel,
  isOpen,
  onClose,
  language,
  currency,
  onBookHotel,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!isOpen || !hotel) return null;

  const images = hotel.galleryImages && hotel.galleryImages.length > 0
    ? hotel.galleryImages
    : [hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'];

  const convertedPrice = Math.round(hotel.pricePerNightSAR * currency.rateAgainstSAR);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-md"></div>

      <div className="relative bg-[#1E293B] border border-[#334155] rounded-xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto card-soft-glow">
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 rounded-xl bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#DC2626]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{hotel.starRating} نجوم • {hotel.guestRating} ممتاز ({hotel.reviewCount} تقييم)</span>
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC]">
                {language === 'ar' ? hotel.nameAr : hotel.nameEn}
              </h3>
              <p className="text-xs text-[#94A3B8] flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>{hotel.address}</span>
              </p>
            </div>

            <div className="text-start sm:text-end">
              <span className="text-2xl font-extrabold text-[#F8FAFC]">
                {convertedPrice.toLocaleString()} {currency.symbol}
              </span>
              <span className="text-xs text-[#94A3B8] block">لكل ليلة شاملة الضرائب</span>
            </div>
          </div>

          {/* Main Photo Showcase */}
          <div className="aspect-[16/9] bg-[#0F172A] rounded-xl overflow-hidden border border-[#334155]">
            <img
              src={images[selectedIdx]}
              alt={hotel.nameAr}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedIdx(i)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    selectedIdx === i ? 'border-[#DC2626]' : 'border-[#334155] opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Amenities & Room Details */}
          <div className="p-4 rounded-xl bg-[#0F172A] border border-[#334155] space-y-3 text-xs">
            <h4 className="font-bold text-[#F8FAFC]">المرافق والخدمات المشمولة في الحجز</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[#94A3B8]">
              {hotel.amenities.map((am, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <a
              href={`${STORE_CONTACT.whatsappUrl}${encodeURIComponent(
                `مرحباً منصة الرفيق، أود الاستفسار عن تفاصيل الحجز لفندق ${hotel.nameAr}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#334155]/40 border border-[#334155] text-xs font-bold text-emerald-400 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>استفسار فوري عبر الواتساب</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookHotel(hotel);
              }}
              className="w-full sm:w-auto btn-accent-red px-8 py-2.5 text-xs font-bold cursor-pointer"
            >
              متابعة الحجز الفوري الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
