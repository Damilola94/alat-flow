import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

type StatusFilter = "Active" | "Closed" | null;

interface Filter {
  status: StatusFilter;
}

interface InvoiceFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filter: Filter;
  onApply: (filter: Filter) => void;
}

export default function InvoiceFilterModal({
  isOpen,
  onClose,
  filter,
  onApply,
}: InvoiceFilterModalProps) {
  const [localStatus, setLocalStatus] = useState<StatusFilter>(
    filter.status
  );

  useEffect(() => {
    if (isOpen) {
      setLocalStatus(filter.status);
    }
  }, [isOpen, filter.status]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-85 bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-gray-900">Filter</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose size={18} />
          </button>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-3">Status</p>

        <div className="space-y-3 mb-6">
          {(["Active", "Closed"] as const).map((s) => (
            <label key={s} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                checked={localStatus === s}
                onChange={() => setLocalStatus(s)}
                className="w-4 h-4 accent-red-700"
              />
              <span className="text-sm text-gray-600">{s}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setLocalStatus(null);
              onApply({ status: null });
            }}
            className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            Clear
          </button>

          <button
            onClick={() => onApply({ status: localStatus })}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-700 hover:bg-red-800 cursor-pointer"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}