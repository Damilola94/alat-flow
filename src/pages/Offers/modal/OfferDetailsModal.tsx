import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import offerImg from "../../../assets/modal/invoice.png";

interface Offer {
  invoiceNumber: string;
  offerAmount: string;
  advanceOffered: string;
  fees: string;
  dueDate: string;
  invoiceAmount: string;
  latenessFee: string;
}

interface OfferDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  offer: Offer | null;
}

export default function OfferDetailsModal({
  isOpen,
  onClose,
  offer,
  onAccept,
}: OfferDetailsModalProps) {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAgreed(false);
    }
  }, [isOpen]);

  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-full max-w-115 bg-white h-full overflow-y-auto shadow-xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Offer Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <IoClose size={22} />
          </button>
        </div>

        <div className="p-6">
          <div
            className="w-full rounded-2xl p-5 mb-6 flex items-start justify-between"
            style={{
              background:
                "linear-gradient(135deg, #6B1533 0%, #9B1C3A 100%)",
            }}
          >
            <div>
              <p className="text-red-200 text-xs mb-2">
                Invoice: {offer.invoiceNumber}
              </p>

              <p className="text-red-200 text-xs mb-1">Offer</p>

              <p className="text-white text-3xl font-bold mb-4">
                ₦{offer.offerAmount}
              </p>

              <div className="flex items-center gap-2">
                <span className="bg-red-800/70 text-red-100 text-xs px-3 py-1 rounded-full font-medium">
                  {offer.advanceOffered} Advance
                </span>

                <span className="bg-red-800/70 text-red-100 text-xs px-3 py-1 rounded-full font-medium">
                  Fee {offer.fees}
                </span>
              </div>
            </div>

            <img src={offerImg} alt="Offer" className="shrink-0" />
          </div>

          <p className="text-sm font-semibold text-gray-700 mb-4">
            More Information
          </p>

          <div className="bg-red-50/40 rounded-xl overflow-hidden mb-6">
            {[
              { label: "Due Date:", value: offer.dueDate },
              { label: "Invoice Amount:", value: `₦${offer.invoiceAmount}` },
              { label: "Advance Offered:", value: offer.advanceOffered },
              { label: "Fees:", value: offer.fees },
              { label: "Lateness Fee:", value: offer.latenessFee },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 border-b border-dashed border-gray-200 last:border-0"
              >
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 accent-red-700"
            />

            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-red-700 font-medium cursor-pointer hover:underline">
                Terms & Conditions
              </span>{" "}
              of this offer
            </span>
          </label>

          <button
            disabled={!agreed}
            onClick={onAccept}
            className="w-full py-3.5 rounded-xl font-semibold text-white transition-colors"
            style={{
              backgroundColor: agreed ? "#9B1C3A" : "#F0AABB",
              cursor: agreed ? "pointer" : "not-allowed",
            }}
          >
            Accept Offer
          </button>
        </div>
      </div>
    </div>
  );
}