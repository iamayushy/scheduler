import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface DropDownProps {
  options: Array<{ label: string; value: string }>;
  selected: string;
  onChange: (selected: string) => void;
}

export default function DropDown({
  options,
  selected,
  onChange,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === selected) || options[0];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-52">
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1 overflow-auto max-h-60">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  option.value === selected ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
