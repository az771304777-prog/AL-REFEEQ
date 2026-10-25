export type CurrencyCode = 'SAR' | 'AED' | 'USD' | 'KWD' | 'EUR';

export type Language = 'ar' | 'en';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstSAR: number;
}

export type ServiceTab = 'flights' | 'hotels' | 'chalets' | 'packages' | 'cars';

export type TripType = 'round' | 'oneway';

export type TravelClass = 'economy' | 'premium' | 'business' | 'first';

export interface Airport {
  code: string;
  cityAr: string;
  cityEn: string;
  airportNameAr: string;
  countryAr: string;
  isPopular?: boolean;
}

export interface FlightSearchQuery {
  origin: Airport;
  destination: Airport;
  tripType: TripType;
  departDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  travelClass: TravelClass;
}

export interface FlightItem {
  id: string;
  airline: string;
  airlineLogoText: string;
  airlineColor: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number; // 0 for direct, 1 for transit
  transitCity?: string;
  priceSAR: number;
  baggage: string;
  cabinBaggage?: string;
  refundable: boolean;
  mealIncluded?: boolean;
  seatsLeft: number;
  travelClass: TravelClass;
  aircraft: string;
  terminalOrigin?: string;
  terminalDestination?: string;
  airlineLogoUrl?: string;
}

export interface HotelSearchQuery {
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  travelingForWork?: boolean;
}

export interface HotelItem {
  id: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  starRating: number;
  guestRating: number;
  reviewCount: number;
  pricePerNightSAR: number;
  originalPriceSAR: number;
  distanceInfo: string;
  address: string;
  amenities: string[];
  roomType: string;
  roomSize?: string;
  checkInTime?: string;
  checkOutTime?: string;
  freeCancellation: boolean;
  breakfastIncluded: boolean;
  bgGradient: string;
  accentColor: string;
  imageUrl?: string;
  galleryImages?: string[];
}

export interface ChaletItem {
  id: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  districtAr: string;
  pricePerNightSAR: number;
  rating: number;
  reviewsCount: number;
  poolType: string;
  capacity: string;
  bedrooms: number;
  amenities: string[];
  bgGradient: string;
  imageUrl?: string;
}

export interface PackageItem {
  id: string;
  titleAr: string;
  titleEn: string;
  destinationAr: string;
  destinationEn: string;
  durationDays: number;
  durationNights: number;
  priceSAR: number;
  originalPriceSAR: number;
  rating: number;
  reviewsCount: number;
  included: string[];
  highlights: string[];
  imageUrl: string;
  tagAr: string;
  tagEn: string;
  hotelCategory: string;
  flightsIncluded: boolean;
}

export interface CarItem {
  id: string;
  modelAr: string;
  modelEn: string;
  categoryAr: string;
  categoryEn: string;
  pricePerDaySAR: number;
  transmission: 'automatic' | 'manual';
  passengers: number;
  luggage: number;
  withChauffeur: boolean;
  freeDelivery: boolean;
  unlimitedMileage: boolean;
  imageUrl: string;
  tagAr: string;
  tagEn: string;
}

export interface PromoCoupon {
  code: string;
  discountPercentage?: number;
  fixedDiscountSAR?: number;
  title: string;
  description: string;
  expiryDate: string;
  category: 'all' | 'flights' | 'hotels' | 'chalets' | 'packages' | 'cars';
  minSpendSAR: number;
}

export interface BookingRecord {
  id: string;
  pnr: string;
  type: 'flight' | 'hotel' | 'chalet' | 'package' | 'car';
  itemTitle: string;
  itemSubtitle: string;
  passengerName: string;
  nationalIdOrPassport: string;
  email: string;
  phone: string;
  dates: string;
  totalPriceSAR: number;
  discountAmountSAR: number;
  paymentMethod: string;
  status: 'مؤكد' | 'قيد المعالجة';
  createdAt: string;
  seatNumber?: string;
  extras?: string[];
}

export interface FilterOptions {
  maxPrice: number;
  directOnly: boolean;
  selectedAirline: string;
  minStarRating: number;
  freeCancellationOnly: boolean;
  breakfastOnly: boolean;
  heatedPoolOnly: boolean;
  withChauffeurOnly: boolean;
  sortBy: 'cheapest' | 'fastest' | 'rating' | 'popular';
}
