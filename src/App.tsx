import React, { useState, useEffect } from 'react';
import { 
  Language, 
  Currency, 
  ServiceTab, 
  FlightItem, 
  HotelItem, 
  ChaletItem, 
  PackageItem, 
  CarItem, 
  BookingRecord, 
  FlightSearchQuery, 
  HotelSearchQuery 
} from './types';
import { 
  CURRENCIES, 
  AIRPORTS, 
  INITIAL_FLIGHTS, 
  INITIAL_HOTELS, 
  INITIAL_CHALETS, 
  INITIAL_PACKAGES, 
  INITIAL_CARS, 
  PROMO_COUPONS, 
  STORE_CONTACT 
} from './data/travelData';
import { travelTranslations } from './utils/travelTranslations';
import { TravelHeader } from './components/TravelHeader';
import { TravelSidebar } from './components/TravelSidebar';
import { TravelHeroSearch } from './components/TravelHeroSearch';
import { TravelResults } from './components/TravelResults';
import { TravelBookingModal } from './components/TravelBookingModal';
import { TravelGalleryModal } from './components/TravelGalleryModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { PromotionsSection } from './components/PromotionsSection';
import { TrendingDestinations } from './components/TrendingDestinations';
import { TravelDirectoriesSection } from './components/TravelDirectoriesSection';
import { WhyAlRafeeq } from './components/WhyAlRafeeq';
import { PartnersAndSecurity } from './components/PartnersAndSecurity';
import { AppDownloadBanner } from './components/AppDownloadBanner';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { TravelFooter } from './components/TravelFooter';
import { MessageCircle, Phone, Headphones, ArrowUp } from 'lucide-react';

export default function App() {
  // Language & Direction
  const [language, setLanguage] = useState<Language>('ar');

  // Currency
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]); // SAR

  // Active Service Tab ('flights' | 'hotels' | 'chalets' | 'packages' | 'cars')
  const [activeTab, setActiveTab] = useState<ServiceTab>('flights');

  // Sidebar Open/Close State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Applied Coupon (Defaulted with official RED26 coupon code for 20% discount)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('RED26');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(20);

  // Search queries
  const [flightQuery, setFlightQuery] = useState<FlightSearchQuery>({
    origin: AIRPORTS[0], // RUH
    destination: AIRPORTS[1], // JED
    tripType: 'round',
    departDate: '2026-10-28',
    returnDate: '2026-11-02',
    adults: 1,
    children: 0,
    infants: 0,
    travelClass: 'economy',
  });

  const [hotelQuery, setHotelQuery] = useState<HotelSearchQuery>({
    city: 'الرياض',
    checkIn: '2026-10-28',
    checkOut: '2026-10-31',
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const [chaletCity, setChaletCity] = useState<string>('الرياض');
  const [packageDestination, setPackageDestination] = useState<string>('all');
  const [carCity, setCarCity] = useState<string>('الرياض');

  // Data lists
  const [flights, setFlights] = useState<FlightItem[]>(INITIAL_FLIGHTS);
  const [hotels, setHotels] = useState<HotelItem[]>(INITIAL_HOTELS);
  const [chalets, setChalets] = useState<ChaletItem[]>(INITIAL_CHALETS);
  const [packages, setPackages] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [cars, setCars] = useState<CarItem[]>(INITIAL_CARS);

  // Modals & Selected Items
  const [selectedFlight, setSelectedFlight] = useState<FlightItem | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<HotelItem | null>(null);
  const [selectedChalet, setSelectedChalet] = useState<ChaletItem | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Gallery Preview
  const [galleryHotel, setGalleryHotel] = useState<HotelItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // My Bookings
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Customer Support Modal
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [bookings, setBookings] = useState<BookingRecord[]>(() => {
    try {
      const saved = localStorage.getItem('alrafeeq_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'BK-SAMPLE-01',
        pnr: 'RQ-749210',
        type: 'flight',
        itemTitle: 'الخطوط السعودية (SV 1024)',
        itemSubtitle: 'الرياض (RUH) ➔ جدة (JED)',
        passengerName: 'عبدالرحمن المطيري',
        nationalIdOrPassport: '1098765432',
        email: 'abdulrahman@example.com',
        phone: '+966552097512',
        dates: '2026-10-28',
        totalPriceSAR: 385,
        discountAmountSAR: 77,
        paymentMethod: 'applepay',
        status: 'مؤكد',
        createdAt: '2026-10-25 09:30',
        seatNumber: '12B',
      }
    ];
  });

  // Sync HTML dir & lang on language change
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleApplyCoupon = (code: string): boolean => {
    const found = PROMO_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (found) {
      setAppliedCoupon(found.code);
      setCouponDiscountPercent(found.discountPercentage || 20);
      return true;
    }
    return false;
  };

  const handleSelectFlight = (flight: FlightItem) => {
    setSelectedFlight(flight);
    setSelectedHotel(null);
    setSelectedChalet(null);
    setSelectedPackage(null);
    setSelectedCar(null);
    setIsBookingModalOpen(true);
  };

  const handleSelectHotel = (hotel: HotelItem) => {
    setSelectedHotel(hotel);
    setSelectedFlight(null);
    setSelectedChalet(null);
    setSelectedPackage(null);
    setSelectedCar(null);
    setIsBookingModalOpen(true);
  };

  const handleSelectChalet = (chalet: ChaletItem) => {
    setSelectedChalet(chalet);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedPackage(null);
    setSelectedCar(null);
    setIsBookingModalOpen(true);
  };

  const handleSelectPackage = (pkg: PackageItem) => {
    setSelectedPackage(pkg);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedChalet(null);
    setSelectedCar(null);
    setIsBookingModalOpen(true);
  };

  const handleSelectCar = (car: CarItem) => {
    setSelectedCar(car);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedChalet(null);
    setSelectedPackage(null);
    setIsBookingModalOpen(true);
  };

  const handleOpenHotelGallery = (hotel: HotelItem) => {
    setGalleryHotel(hotel);
    setIsGalleryOpen(true);
  };

  const handleConfirmBooking = (record: BookingRecord) => {
    setBookings((prev) => {
      const updated = [record, ...prev];
      try {
        localStorage.setItem('alrafeeq_bookings', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleSelectDestination = (cityAr: string, cityEn: string, airportCode: string, mode: ServiceTab) => {
    setActiveTab(mode);
    if (mode === 'flights') {
      const targetAirport = AIRPORTS.find((a) => a.code === airportCode) || AIRPORTS[1];
      setFlightQuery((prev) => ({
        ...prev,
        destination: targetAirport,
      }));
    } else {
      setHotelQuery((prev) => ({
        ...prev,
        city: cityAr,
      }));
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Directory Selection Handlers
  const handleSelectDirectoryRoute = (originCode: string, destCode: string, fromName: string, toName: string) => {
    setActiveTab('flights');
    const orig = AIRPORTS.find((a) => a.code === originCode) || {
      code: originCode,
      cityAr: fromName,
      cityEn: fromName,
      airportNameAr: `مطار ${fromName}`,
      countryAr: 'المملكة العربية السعودية',
    };
    const dest = AIRPORTS.find((a) => a.code === destCode) || {
      code: destCode,
      cityAr: toName,
      cityEn: toName,
      airportNameAr: `مطار ${toName}`,
      countryAr: 'الوجهة',
    };
    setFlightQuery((prev) => ({
      ...prev,
      origin: orig,
      destination: dest,
    }));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSelectDirectoryHotel = (cityName: string) => {
    setActiveTab('hotels');
    setHotelQuery((prev) => ({
      ...prev,
      city: cityName,
    }));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSelectDirectoryChalet = (district: string) => {
    setActiveTab('chalets');
    setChaletCity(district);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSelectDirectoryAirline = (airlineName: string) => {
    setActiveTab('flights');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#DC2626] selection:text-[#F8FAFC]">
      
      {/* 1. Header with Top Announcement Bar & Glassmorphic Navbar */}
      <TravelHeader
        language={language}
        onToggleLanguage={handleToggleLanguage}
        currentCurrency={currency}
        onSelectCurrency={setCurrency}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={bookings.length}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onOpenSupport={() => setIsSupportOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(true)}
      />

      {/* 2. Glassmorphic Luxury Sidebar */}
      <TravelSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        currency={currency}
        onSelectCurrency={setCurrency}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        bookingsCount={bookings.length}
        onOpenSupport={() => setIsSupportOpen(true)}
        appliedCoupon={appliedCoupon}
      />

      {/* 3. Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-12">
        
        {/* Interactive Search Panel for 5 Services */}
        <TravelHeroSearch
          language={language}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          flightQuery={flightQuery}
          onUpdateFlightQuery={(q) => setFlightQuery((prev) => ({ ...prev, ...q }))}
          hotelQuery={hotelQuery}
          onUpdateHotelQuery={(q) => setHotelQuery((prev) => ({ ...prev, ...q }))}
          chaletCity={chaletCity}
          onChangeChaletCity={setChaletCity}
          packageDestination={packageDestination}
          onChangePackageDestination={setPackageDestination}
          carCity={carCity}
          onChangeCarCity={setCarCity}
          onExecuteSearch={() => {}}
        />

        {/* Results List: Flights, Hotels, Chalets, Packages, Cars */}
        <TravelResults
          language={language}
          activeTab={activeTab}
          currency={currency}
          flights={flights}
          hotels={hotels}
          chalets={chalets}
          packages={packages}
          cars={cars}
          onSelectFlight={handleSelectFlight}
          onSelectHotel={handleSelectHotel}
          onSelectChalet={handleSelectChalet}
          onSelectPackage={handleSelectPackage}
          onSelectCar={handleSelectCar}
          onOpenHotelGallery={handleOpenHotelGallery}
        />

        {/* Promotions & Coupons Section (RED26, ALRAFEEQ20, HOTEL100) */}
        <PromotionsSection
          language={language}
          currency={currency}
          appliedCoupon={appliedCoupon}
          onApplyCoupon={handleApplyCoupon}
        />

        {/* Trending Destinations in Saudi Arabia & Top International Hubs */}
        <TrendingDestinations
          language={language}
          currency={currency}
          onSelectDestination={handleSelectDestination}
        />

        {/* The Exact "الفنادق الأكثر رواجاً" and "الرحلات الجوية الرائجة" Matrix from User's Screenshot */}
        <TravelDirectoriesSection
          language={language}
          onSelectRoute={handleSelectDirectoryRoute}
          onSelectHotelCity={handleSelectDirectoryHotel}
          onSelectChaletDistrict={handleSelectDirectoryChalet}
          onSelectAirline={handleSelectDirectoryAirline}
        />

        {/* Why Al-Rafeeq Trust & Value Pillars (GACA, Best Price, Tabby/Tamara, 24/7 Support) */}
        <WhyAlRafeeq language={language} />

        {/* Partners & Bank-Grade Security Certifications */}
        <PartnersAndSecurity language={language} />

        {/* VIP Mobile App Download Banner */}
        <AppDownloadBanner language={language} />

      </main>

      {/* 4. Booking Confirmation Modal (Flights, Hotels, Chalets, Packages, Cars) */}
      <TravelBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        language={language}
        currency={currency}
        flight={selectedFlight}
        hotel={selectedHotel}
        chalet={selectedChalet}
        packageItem={selectedPackage}
        car={selectedCar}
        appliedCoupon={appliedCoupon}
        couponDiscountPercent={couponDiscountPercent}
        onApplyCoupon={handleApplyCoupon}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* 5. Hotel Photography Gallery Modal */}
      <TravelGalleryModal
        hotel={galleryHotel}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        language={language}
        currency={currency}
        onBookHotel={handleSelectHotel}
      />

      {/* 6. My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        language={language}
        currency={currency}
        bookings={bookings}
      />

      {/* 7. Customer Support & Hotline Modal */}
      <CustomerSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        language={language}
      />

      {/* 8. Floating Quick Support & Scroll to Top Buttons */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-11 h-11 rounded-full bg-[#1E293B] border border-[#334155] text-[#F8FAFC] flex items-center justify-center hover:bg-[#334155] hover:scale-105 transition-all shadow-xl cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 text-[#DC2626]" />
          </button>
        )}

        {/* Floating WhatsApp / Support Trigger */}
        <button
          type="button"
          onClick={() => setIsSupportOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#DC2626] text-white font-bold text-xs shadow-2xl shadow-red-950/70 hover:bg-[#EF4444] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-red-500/40"
        >
          <Headphones className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">
            {language === 'ar' ? 'مساعد الحجز 24/7' : '24/7 Travel Advisor'}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      </aside>

      {/* 9. Footer with Licensing, Certifications, and Unified Hotline */}
      <TravelFooter language={language} />

    </div>
  );
}
