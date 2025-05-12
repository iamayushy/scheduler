import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
      />
      {/* Modal container */}
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md transform transition-all">
          <div className="flex justify-between items-center py-2 px-4 border-b">
            {title && (
              <h2 className="text-lg font-semibold text-primary">{title}</h2>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X />
            </button>
          </div>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
