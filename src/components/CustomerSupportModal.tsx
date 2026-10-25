import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  MessageCircle, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Sparkles,
  Ticket
} from 'lucide-react';
import { Language } from '../types';
import { STORE_CONTACT } from '../data/travelData';

interface CustomerSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const faqs = [
    {
      qAr: 'كيف يتم إصدار تذكرة الطيران أو قسيمة الفندق بعد إتمام الحجز؟',
      qEn: 'How are flight tickets and hotel vouchers issued after booking?',
      aAr: 'يتم إصدار التذكرة الإلكترونية فورياً عبر نظام التوزيع المعتمد (GDS) مع رقم مرجعي (PNR)، ويتم إرسال نسخة رسمية PDF عبر الواتساب والبريد الإلكتروني المدخل مباشرة.',
      aEn: 'E-tickets are issued immediately via certified GDS systems with an official PNR code and dispatched via WhatsApp and email instantly.',
    },
    {
      qAr: 'كيف أستخدم كود الخصم RED26 أو ALRAFEEQ20 للحصول على خصم 20%؟',
      qEn: 'How do I use promo code RED26 or ALRAFEEQ20 for 20% off?',
      aAr: 'يمكنك إدخال الكود في الشريط العلوي والضغط على "تطبيق"، أو اختيار العرض مباشرة من قسم قسائم التوفير، أو كتابته داخل نافذة تأكيد الحجز قبل إتمام الدفع.',
      aEn: 'Enter the promo code in the top announcement bar or booking modal and click Apply to see instant discount calculation.',
    },
    {
      qAr: 'ما هي سياسة الإلغاء وتعديل مواعيد الرحلات؟',
      qEn: 'What is the flight modification and cancellation policy?',
      aAr: 'تخضع الرحلات لشروط الناقل الجوي المحددة على كل تذكرة (قابلة للاسترجاع أو غير قابلة). يوفر لك فريق خدمة العملاء على الرقم الموحد الدعم في تنفيذ طلبات التعديل والإلغاء وفق الأنظمة.',
      aEn: 'Cancellations follow airline fare rules clearly indicated on each ticket card. Our 24/7 hotline team assists with all refund and rescheduling requests.',
    },
    {
      qAr: 'هل يمكنني تقسيط قيمة الحجز عبر تمارا أو تابي بدون فوائد؟',
      qEn: 'Can I split my booking cost with Tamara or Tabby interest-free?',
      aAr: 'نعم، المنصة تدعم خيار التقسيط على 4 دفعات بدون أي فوائد إضافية، بالإضافة إلى الدفع الفوري عبر مدى وApple Pay والبطاقات الائتمانية.',
      aEn: 'Yes, split your total booking into 4 interest-free installments with Tamara and Tabby, or pay instantly via Mada & Apple Pay.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-[#1E293B] border border-[#334155] rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden card-soft-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#334155] flex items-center justify-between bg-[#0F172A]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#DC2626]/20 border border-[#DC2626]/40 flex items-center justify-center text-[#DC2626]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-[#F8FAFC]">
                {language === 'ar' ? 'مركز خدمة العملاء والاستفسارات' : 'Customer Support & Help Center'}
              </h3>
              <p className="text-xs text-[#94A3B8]">
                {STORE_CONTACT.supportHoursAr}
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

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          
          {/* Quick Action Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${STORE_CONTACT.phone}`}
              className="bg-[#0F172A] border border-[#334155] hover:border-[#DC2626] rounded-xl p-4 flex items-center gap-3 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[rgba(220,38,38,0.15)] flex items-center justify-center text-[#DC2626] group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-[#94A3B8]">
                  {language === 'ar' ? 'الاتصال الهاتفي المباشر' : 'Direct Phone Call'}
                </span>
                <span className="font-mono font-bold text-sm text-[#F8FAFC] dir-ltr block">
                  {STORE_CONTACT.phoneFormatted}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {language === 'ar' ? 'متاح 24/7' : 'Available 24/7'}
                </span>
              </div>
            </a>

            <a
              href={`${STORE_CONTACT.whatsappUrl}${encodeURIComponent(
                language === 'ar'
                  ? 'مرحباً، أود المساعدة بخصوص حجز أو استفسار في الرفيق للسياحة'
                  : 'Hello, I need help with an Al-Rafeeq booking inquiry.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0F172A] border border-[#334155] hover:border-emerald-500/50 rounded-xl p-4 flex items-center gap-3 transition-all duration-300 group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-[#94A3B8]">
                  {language === 'ar' ? 'خدمة الواتساب الفورية' : 'Instant WhatsApp'}
                </span>
                <span className="font-bold text-sm text-[#F8FAFC] block">
                  {language === 'ar' ? 'دردشة مع مستشار سفر' : 'Chat with Travel Advisor'}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {language === 'ar' ? 'رد سريع في دقائق' : 'Replies in minutes'}
                </span>
              </div>
            </a>
          </div>

          {/* FAQs Accordion */}
          <div>
            <h4 className="font-bold text-sm text-[#F8FAFC] mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DC2626]" />
              <span>{language === 'ar' ? 'الأسئلة الشائعة والأكثر تكراراً' : 'Frequently Asked Questions'}</span>
            </h4>

            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-[#0F172A] border border-[#334155] rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-3.5 text-start flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#F8FAFC] hover:text-[#DC2626] transition-colors cursor-pointer"
                    >
                      <span>{language === 'ar' ? faq.qAr : faq.qEn}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#DC2626] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#94A3B8] leading-relaxed border-t border-[#334155]/60 bg-[#1E293B]/40">
                        {language === 'ar' ? faq.aAr : faq.aEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#334155] bg-[#0F172A]/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#94A3B8]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{STORE_CONTACT.addressAr}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#334155] text-white font-semibold hover:bg-[#475569] transition-colors cursor-pointer"
          >
            {language === 'ar' ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
