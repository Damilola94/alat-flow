import { IoClose } from "react-icons/io5";
import invoiceImg from "../../../assets/modal/invoice.png";

interface Invoice {
  invoiceNumber: string;
  paybackAmount: string;
  dueDate: string;
  status: string;
  invoiceDate: string;
  invoiceAmount: string;
  advanceOffered: string;
  fees: string;
  latenessFee: string;
}

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice | null;
}

export default function InvoiceDetailsModal({
  isOpen,
  onClose,
  invoice,
}: InvoiceDetailsModalProps) {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 p-4">
      <div className="w-full max-w-115 bg-white overflow-y-auto shadow-xl rounded-3xl">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Invoice Details</h2>

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
              <p className="text-red-200 text-xs mb-1">
                Invoice: {invoice.invoiceNumber}
              </p>

              <p className="text-red-200 text-xs mb-2">Payback</p>

              <p className="text-white text-2xl font-bold mb-3">
                ₦{invoice.paybackAmount}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-red-200 text-xs">
                  Due: {invoice.dueDate}
                </span>

                <span className="bg-red-900/60 text-red-100 text-xs px-2 py-0.5 rounded-full">
                  {invoice.status}
                </span>
              </div>
            </div>

            <img src={invoiceImg} alt="Invoice" className="shrink-0" />
          </div>

          <p className="text-sm font-semibold text-gray-700 mb-4">
            More Information
          </p>

          <div className="space-y-3">
            {[
              { label: "Invoice Date:", value: invoice.invoiceDate },
              {
                label: "Invoice Amount:",
                value: `₦${invoice.invoiceAmount}`,
              },
              { label: "Advance Offered:", value: invoice.advanceOffered },
              { label: "Fees:", value: invoice.fees },
              { label: "Lateness Fee:", value: invoice.latenessFee },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2 border-b border-dashed border-gray-100"
              >
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-medium text-gray-800">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-5 text-sm text-red-700 font-medium hover:underline">
            Terms & Conditions
          </button>
        </div>
      </div>
    </div>
  );
}