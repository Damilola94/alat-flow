interface CancelProgressModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function CancelProgressModal({
  isOpen,
  onCancel,
  onConfirm,
}: CancelProgressModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Your progress will be lost
        </h2>

        <p className="text-sm text-gray-500 mb-8">
          Are you sure you want to cancel? You can start again anytime.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-xl font-semibold border border-red-700 text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}