interface ConfirmAcceptOfferModalProps {
  isOpen: boolean;
  onNo: () => void;
  onYes: () => void | Promise<void>;
}

export default function ConfirmAcceptOfferModal({
  isOpen,
  onNo,
  onYes,
}: ConfirmAcceptOfferModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Are you ready to accept this offer?
        </h2>

        <p className="text-sm text-gray-500 mb-8">
          Ensure you have read the terms and condition before accepting this
          offer
        </p>

        <div className="flex gap-3">
          <button
            onClick={onNo}
            className="flex-1 py-3.5 rounded-xl font-semibold border border-red-700 text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
          >
            No
          </button>

          <button
            onClick={onYes}
            className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}