interface OfferCongratulationsModalProps {
  isOpen: boolean;
  onOkay: () => void;
}

export default function OfferCongratulationsModal({
  isOpen,
  onOkay,
}: OfferCongratulationsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Congratulations!
        </h2>

        <p className="text-sm text-gray-500 mb-8">
          Your funds will be disbursed to your account shortly.
        </p>

        <button
          onClick={onOkay}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
        >
          Okay
        </button>
      </div>
    </div>
  );
}