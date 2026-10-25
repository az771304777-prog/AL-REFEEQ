import React from 'react';
import { X, Ticket, Plane, Building2, Palmtree, Phone, MessageCircle, CheckCircle2, Clock } from 'lucide-react';
import { BookingRecord, Language, Currency } from '../types';
import { STORE_CONTACT } from '../data/travelData';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  bookings: BookingRecord[];
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  bookings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-[#0F172A]/85 backdrop-blur-md"></div>

      <div className="relative bg-[#1E293B] border border-[#334155] rounded-xl max-w-2xl w-full p-6 shadow-2xl z-10 space-y-5 max-h-[90vh] overflow-y-auto card-soft-glow">
        <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-[#DC2626]" />
            <h3 className="text-base font-bold text-[#F8FAFC]">
              {language === 'ar' ? 'سجل حجوزاتي المؤكدة' : 'My Confirmed Bookings'} ({bookings.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#334155] flex items-center justify-center mx-auto text-[#94A3B8]">
              <Ticket className="w-6 h-6" />
            </div>
            <p className="text-xs text-[#94A3B8]">
              {language === 'ar' ? 'لا توجد حجوزات مسجلة حتى الآن.' : 'No active bookings found.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-[#0F172A] border border-[#334155] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {b.type === 'flight' ? (
                      <Plane className="w-4 h-4 text-[#DC2626]" />
                    ) : b.type === 'hotel' ? (
                      <Building2 className="w-4 h-4 text-[#DC2626]" />
                    ) : (
                      <Palmtree className="w-4 h-4 text-[#DC2626]" />
                    )}
                    <span className="font-bold text-xs text-[#F8FAFC]">{b.itemTitle}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{b.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-[#94A3B8] pt-1">
                  <div>
                    <span className="text-[10px] block text-[#94A3B8]">رقم الحجز (PNR)</span>
                    <span className="font-mono font-bold text-[#F8FAFC]">{b.pnr}</span>
                  </div>
                  <div>
                    <span className="text-[10px] block text-[#94A3B8]">المسافر</span>
                    <span className="font-semibold text-[#F8FAFC]">{b.passengerName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] block text-[#94A3B8]">التاريخ</span>
                    <span className="font-mono text-[#F8FAFC]">{b.dates}</span>
                  </div>
                  <div>
                    <span className="text-[10px] block text-[#94A3B8]">الإجمالي</span>
                    <span className="font-bold text-[#DC2626]">{b.totalPriceSAR.toLocaleString()} ر.س</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#334155] flex items-center justify-between">
                  <span className="text-[11px] text-[#94A3B8]">طريقة الدفع: {b.paymentMethod.toUpperCase()}</span>
                  <a
                    href={`${STORE_CONTACT.whatsappUrl}${encodeURIComponent(
                      `مرحباً، أستفسر عن تذكرتي رقم ${b.pnr} باسم ${b.passengerName}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>متابعة التذكرة عبر الواتساب</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
