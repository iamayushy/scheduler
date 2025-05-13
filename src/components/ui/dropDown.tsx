import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

interface DropDownProps {
  options: Array<{ label: string; value: string }>;
  selected: string;
  onChange: (selected: string) => void;
  name?: string;
  label?: string;
  placeholder?: string; // Add placeholder prop
  required?: boolean;
}

export default function DropDown({
  options,
  selected,
  onChange,
  name,
  label,
  placeholder = "Select an option", // Default placeholder text
  required,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectedOption = selected 
    ? options.find((option) => option.value === selected) 
    : undefined;

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }

    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);
  const combineClasses = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {label && (
        <label
          className={combineClasses("text-sm font-medium text-foreground")}
        >
          {label}
        </label>
      )}
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-black rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!selectedOption ? "text-gray-400" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-3 py-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-400"
                placeholder="Search options..."
                value={searchTerm}
                name={name}
                required={required}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <ul className="py-1 overflow-auto max-h-60">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    option.value === selected
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
