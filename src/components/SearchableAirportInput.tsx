import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Plus, Check, X, Plane } from 'lucide-react';
import { Airport, Language } from '../types';
import { AIRPORTS } from '../data/travelData';

interface SearchableAirportInputProps {
  label: string;
  value: Airport;
  onChange: (airport: Airport) => void;
  language: Language;
  placeholder?: string;
}

export const SearchableAirportInput: React.FC<SearchableAirportInputProps> = ({
  label,
  value,
  onChange,
  language,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync internal search input with incoming value when not open
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm(`${value.cityAr} (${value.code})`);
    }
  }, [value, isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // If user typed something custom and blurred without picking, commit the custom text
        if (searchTerm.trim() && !searchTerm.includes(value.code)) {
          commitCustomCity(searchTerm.trim());
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchTerm, value]);

  const commitCustomCity = (rawText: string) => {
    const cleanText = rawText.trim();
    if (!cleanText) return;

    // Check if it matches an existing airport
    const found = AIRPORTS.find(
      (a) =>
        a.cityAr.toLowerCase().includes(cleanText.toLowerCase()) ||
        a.cityEn.toLowerCase().includes(cleanText.toLowerCase()) ||
        a.code.toLowerCase() === cleanText.toLowerCase()
    );

    if (found) {
      onChange(found);
      setSearchTerm(`${found.cityAr} (${found.code})`);
    } else {
      // Create manual custom airport
      const codeGenerated = cleanText.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'CTY';
      const customAirport: Airport = {
        code: codeGenerated,
        cityAr: cleanText,
        cityEn: cleanText,
        airportNameAr: `مطار ${cleanText}`,
        countryAr: 'إضافة يدوية',
        isPopular: false,
      };
      onChange(customAirport);
      setSearchTerm(`${cleanText} (${codeGenerated})`);
    }
    setIsOpen(false);
  };

  // Filtered matching airports
  const filtered = AIRPORTS.filter((a) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return a.isPopular;
    return (
      a.cityAr.toLowerCase().includes(term) ||
      a.cityEn.toLowerCase().includes(term) ||
      a.code.toLowerCase().includes(term) ||
      a.airportNameAr.toLowerCase().includes(term) ||
      a.countryAr.toLowerCase().includes(term)
    );
  });

  const isExactMatch = AIRPORTS.some(
    (a) => a.cityAr.toLowerCase() === searchTerm.toLowerCase().trim() ||
           a.code.toLowerCase() === searchTerm.toLowerCase().trim()
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div 
        className="bg-[#0F172A] border border-[#334155] focus-within:border-[#DC2626] rounded-xl p-2.5 sm:p-3 transition-colors cursor-text"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <label className="block text-[11px] text-[#94A3B8] font-medium leading-none">
            {label}
          </label>
          <span className="text-[10px] text-[#DC2626] font-mono font-bold bg-[#1E293B] px-1.5 py-0.5 rounded border border-[#334155]">
            {value.code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#DC2626] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onFocus={() => {
              setIsOpen(true);
              setSearchTerm('');
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                commitCustomCity(searchTerm);
              } else if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            placeholder={placeholder || (language === 'ar' ? 'اكتب اسم المدينة، المطار، أو الكود...' : 'Type city, airport or code...')}
            className="w-full bg-transparent text-[#F8FAFC] font-bold text-xs sm:text-sm focus:outline-none placeholder:text-[#94A3B8]/60"
          />
          {isOpen && searchTerm && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSearchTerm('');
              }}
              className="p-1 text-[#94A3B8] hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Autocomplete & Manual Entry Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-[#1E293B] border border-[#334155] rounded-xl shadow-2xl overflow-hidden card-soft-glow max-h-72 flex flex-col">
          
          {/* Custom Typed Entry Option if user typed arbitrary text */}
          {searchTerm.trim().length > 0 && !isExactMatch && (
            <div className="p-2 border-b border-[#334155] bg-[#0F172A]/80">
              <button
                type="button"
                onClick={() => commitCustomCity(searchTerm)}
                className="w-full text-start p-2 rounded-lg bg-[rgba(220,38,38,0.15)] border border-[#DC2626]/40 hover:bg-[#DC2626] text-[#F8FAFC] text-xs font-bold transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#DC2626] group-hover:text-white" />
                  <span>
                    {language === 'ar' ? 'إضافة يدوية:' : 'Custom entry:'}{' '}
                    <span className="text-white font-extrabold underline">"{searchTerm.trim()}"</span>
                  </span>
                </div>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-white font-normal">
                  {language === 'ar' ? 'اضغط للتأكيد' : 'Click to use'}
                </span>
              </button>
            </div>
          )}

          {/* Quick Header */}
          <div className="px-3 py-1.5 bg-[#0F172A]/40 border-b border-[#334155]/60 flex items-center justify-between text-[10px] text-[#94A3B8] font-semibold">
            <span>
              {searchTerm.trim()
                ? `${language === 'ar' ? 'النتائج المطابقة' : 'Matching Cities'} (${filtered.length})`
                : `${language === 'ar' ? 'أشهر المدن والمطارات (أو اكتب أي مدينة يدوياً)' : 'Popular Cities & Airports'}`}
            </span>
            <span className="text-emerald-400 font-normal">
              {language === 'ar' ? 'يدعم الكتابة اليدوية لأي مدينة' : 'Supports any custom city'}
            </span>
          </div>

          {/* List of items */}
          <div className="overflow-y-auto flex-1 divide-y divide-[#334155]/40">
            {filtered.length > 0 ? (
              filtered.map((airport) => {
                const isSelected = value.code === airport.code;
                return (
                  <button
                    key={airport.code}
                    type="button"
                    onClick={() => {
                      onChange(airport);
                      setSearchTerm(`${airport.cityAr} (${airport.code})`);
                      setIsOpen(false);
                    }}
                    className={`w-full text-start p-3 hover:bg-[#0F172A] transition-colors flex items-center justify-between text-xs cursor-pointer ${
                      isSelected ? 'bg-[rgba(220,38,38,0.1)] text-white' : 'text-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#DC2626] font-mono font-bold text-xs shrink-0">
                        {airport.code}
                      </div>
                      <div>
                        <span className="font-bold block text-sm">
                          {language === 'ar' ? airport.cityAr : airport.cityEn}
                        </span>
                        <span className="text-[11px] text-[#94A3B8] block">
                          {airport.airportNameAr} • {airport.countryAr}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#DC2626] shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center space-y-2">
                <p className="text-xs text-[#94A3B8]">
                  {language === 'ar'
                    ? `لم يتم العثور على مطار مسبق باسم "${searchTerm}"`
                    : `No pre-listed airport matching "${searchTerm}"`}
                </p>
                <button
                  type="button"
                  onClick={() => commitCustomCity(searchTerm)}
                  className="px-4 py-2 rounded-xl bg-[#DC2626] text-white font-bold text-xs hover:bg-[#EF4444] transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>استخدام "{searchTerm.trim()}" كمدينة يدوية</span>
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
