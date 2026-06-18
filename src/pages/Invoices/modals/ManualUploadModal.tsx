import { useState, useRef } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { RiEditLine } from "react-icons/ri";

interface InvoiceForm {
  invoiceNumber: string;
  invoiceAmount: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  file: File | null;
}

interface ManualUploadModalProps {
  isOpen: boolean;
  onBack: () => void;
  onClose?: () => void;
  onNext: (invoices: InvoiceForm[]) => void;
}

const emptyForm = (): InvoiceForm => ({
  invoiceNumber: "",
  invoiceAmount: "",
  dueDate: "",
  customerName: "",
  customerEmail: "",
  file: null,
});

export default function ManualUploadModal({
  isOpen,
  onBack,
  onClose,
  onNext,
}: ManualUploadModalProps) {
  const [invoices, setInvoices] = useState<InvoiceForm[]>([
    emptyForm(),
  ]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isOpen) return null;

  const current = invoices[activeIndex];

  const updateField = (
    field: keyof InvoiceForm,
    value: string | File | null
  ) => {
    setInvoices((prev) =>
      prev.map((inv, i) =>
        i === activeIndex ? { ...inv, [field]: value } : inv
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateField("file", file);
  };

  const addInvoice = () => {
    setInvoices((prev) => [...prev, emptyForm()]);
    setActiveIndex(invoices.length);
  };

  const canSubmit = invoices.every(
    (inv) =>
      inv.invoiceNumber &&
      inv.invoiceAmount &&
      inv.dueDate &&
      inv.customerName
  );

  if (previewFile) {
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
        <div className="w-full max-w-[560px] bg-white h-full overflow-y-auto shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setPreviewFile(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <HiArrowLeft size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-900">Preview</h2>
          </div>

          <div className="w-full rounded-2xl overflow-hidden border border-gray-200">
            {previewFile && (
              <iframe
                src={URL.createObjectURL(previewFile)}
                className="w-full h-[700px]"
                title="Invoice Preview"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 p-4">
      <div className="w-full max-w-115 bg-white overflow-y-auto shadow-xl rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <HiArrowLeft size={20} />
          </button>

          <h2 className="text-xl font-bold text-gray-900">
            Invoice Upload
          </h2>
        </div>

        <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg mb-5">
          Make sure the customer name matches your bank statement.
        </p>

        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {invoices.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border"
              style={
                activeIndex === i
                  ? {
                      backgroundColor: "#9B1C3A",
                      color: "#fff",
                      borderColor: "#9B1C3A",
                    }
                  : {
                      backgroundColor: "#fff",
                      color: "#374151",
                      borderColor: "#D1D5DB",
                    }
              }
            >
              Invoice {i + 1}
              {activeIndex === i && <RiEditLine size={13} />}
            </button>
          ))}

          <button
            onClick={addInvoice}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Add Invoice <span className="text-lg leading-none">+</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1.5">
              Upload Invoice Document
            </label>

            <label className="w-full border-2 border-dashed border-gray-200 rounded-xl py-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-400">
                Click to upload PDF
              </span>

              <input
                ref={(el) => {
                  fileRefs.current[activeIndex] = el;
                }}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <button
          onClick={() => onNext(invoices)}
          disabled={!canSubmit}
          className="w-full mt-6 py-3.5 rounded-xl font-semibold text-white"
          style={{
            backgroundColor: canSubmit ? "#9B1C3A" : "#F0AABB",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}