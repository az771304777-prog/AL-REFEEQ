import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search, Plus, Check, X, Building2 } from 'lucide-react';
import { Language } from '../types';

interface SearchableCityInputProps {
  label: string;
  value: string;
  onChange: (city: string) => void;
  language: Language;
  suggestions: string[];
  placeholder?: string;
}

export const SearchableCityInput: React.FC<SearchableCityInputProps> = ({
  label,
  value,
  onChange,
  language,
  suggestions,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        if (inputValue.trim() && inputValue.trim() !== value) {
          onChange(inputValue.trim());
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [inputValue, value, onChange]);

  const handleSelect = (cityName: string) => {
    onChange(cityName);
    setInputValue(cityName);
    setIsOpen(false);
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(inputValue.toLowerCase().trim())
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div 
        className="bg-[#0F172A] border border-[#334155] focus-within:border-[#DC2626] rounded-xl p-2.5 sm:p-3 transition-colors cursor-text"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center justify-between mb-1">
          <label className="block text-[11px] text-[#94A3B8] font-medium leading-none">
            {label}
          </label>
          <span className="text-[10px] text-emerald-400 font-normal">
            {language === 'ar' ? 'كتابة يدوية مفتوحة' : 'Open manual entry'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#DC2626] shrink-0" />
          <input
            type="text"
            value={inputValue}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSelect(inputValue.trim());
              } else if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            placeholder={placeholder || (language === 'ar' ? 'اكتب أي وجهة، مدينة، أو فندق...' : 'Type any destination or hotel...')}
            className="w-full bg-transparent text-[#F8FAFC] font-bold text-xs sm:text-sm focus:outline-none placeholder:text-[#94A3B8]/60"
          />
          {inputValue && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setInputValue('');
                onChange('');
              }}
              className="p-1 text-[#94A3B8] hover:text-white rounded"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 right-0 z-50 bg-[#1E293B] border border-[#334155] rounded-xl shadow-2xl overflow-hidden card-soft-glow max-h-64 flex flex-col">
          
          {/* Custom Typed Entry Option */}
          {inputValue.trim().length > 0 && !suggestions.includes(inputValue.trim()) && (
            <div className="p-2 border-b border-[#334155] bg-[#0F172A]/80">
              <button
                type="button"
                onClick={() => handleSelect(inputValue.trim())}
                className="w-full text-start p-2 rounded-lg bg-[rgba(220,38,38,0.15)] border border-[#DC2626]/40 hover:bg-[#DC2626] text-[#F8FAFC] text-xs font-bold transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#DC2626] group-hover:text-white" />
                  <span>
                    {language === 'ar' ? 'استخدام الوجهة المكتوبة:' : 'Use custom input:'}{' '}
                    <span className="text-white font-extrabold underline">"{inputValue.trim()}"</span>
                  </span>
                </div>
                <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded text-white font-normal">
                  {language === 'ar' ? 'تأكيد' : 'Confirm'}
                </span>
              </button>
            </div>
          )}

          <div className="px-3 py-1.5 bg-[#0F172A]/40 border-b border-[#334155]/60 text-[10px] text-[#94A3B8] font-semibold flex items-center justify-between">
            <span>{language === 'ar' ? 'الوجهات المقترحة (أو اكتب أي مدينة بحرية)' : 'Suggested Destinations'}</span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-[#334155]/40">
            {filteredSuggestions.map((item) => {
              const isSelected = value.toLowerCase() === item.toLowerCase();
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`w-full text-start p-3 hover:bg-[#0F172A] transition-colors flex items-center justify-between text-xs cursor-pointer ${
                    isSelected ? 'bg-[rgba(220,38,38,0.1)] text-white font-bold' : 'text-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#DC2626]" />
                    <span>{item}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#DC2626]" />}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};
