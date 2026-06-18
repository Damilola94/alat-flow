import { FiClock } from "react-icons/fi";

interface UnderReviewModalProps {
  isOpen: boolean;
  onDone: () => void;
}

export default function UnderReviewModal({
  isOpen,
  onDone,
}: UnderReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-5">
          <FiClock size={28} className="text-orange-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Under review
        </h2>

        <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
          Your funding request will be approved as soon as the information you
          provided has been verified.
        </p>

        <button
          onClick={onDone}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}