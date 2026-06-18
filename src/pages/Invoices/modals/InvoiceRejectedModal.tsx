import { IoClose } from "react-icons/io5";

interface InvoiceRejectedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvoiceRejectedModal({
  isOpen,
  onClose,
}: InvoiceRejectedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mx-auto mb-5">
          <IoClose size={28} className="text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Invoice rejected
        </h2>

        <p className="text-sm text-gray-500 mb-2">
          We found discrepancies that prevent us from validating this invoice at this time.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Please review the details and re-upload with the correct information.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
        >
          Okay
        </button>
      </div>
    </div>
  );
}