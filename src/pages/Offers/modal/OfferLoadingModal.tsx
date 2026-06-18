type OfferLoadingModalProps = {
  isOpen: boolean;
};

export default function OfferLoadingModal({
  isOpen,
}: OfferLoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-10 flex items-center justify-center min-h-[200px]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
          <div className="absolute inset-0 rounded-full border-4 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <span className="text-red-700 font-bold text-xs">ALAT</span>
          </div>
        </div>
      </div>
    </div>
  );
}