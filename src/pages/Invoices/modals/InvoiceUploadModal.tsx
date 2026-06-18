import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { LuCamera } from "react-icons/lu";

interface InvoiceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (files: File[]) => void;
  onManualUpload: () => void;
}

export default function InvoiceUploadModal({
  isOpen,
  onClose,
  onNext,
  onManualUpload,
}: InvoiceUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const canProceed = files.length > 0 && confirmed;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 p-4">
      <div className="w-full max-w-115 bg-white overflow-y-auto shadow-xl rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Invoice Upload</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <IoClose size={22} />
          </button>
        </div>

        {files.length > 0 && (
          <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg mb-4">
            Make sure the customer name matches your bank statement.
          </p>
        )}

        <fieldset className="border border-gray-200 rounded-xl mb-4">
          <legend className="ml-3 px-1 text-xs text-gray-400">
            Upload Invoice Document
          </legend>

          <label
            className="flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-gray-50 transition-colors rounded-xl"
            onClick={() => inputRef.current?.click()}
          >
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center mb-3">
              <LuCamera size={20} className="text-gray-400" />
            </div>

            <p className="font-semibold text-gray-700">Choose a File</p>
            <p className="text-sm text-gray-400">
              PDF or CSV (bulk uploads)
            </p>

            <input
              ref={inputRef}
              type="file"
              multiple
              accept=".pdf,.csv"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </fieldset>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {files.map((f) => (
              <span
                key={f.name}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-green-500 text-green-600 rounded-full text-sm font-medium"
              >
                {f.name}

                <button
                  onClick={() => removeFile(f.name)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <IoClose size={14} />
                </button>
              </span>
            ))}
          </div>
        )}

        {files.length > 0 && (
          <label className="flex items-center gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-4 h-4 accent-red-600"
            />

            <span className="text-sm text-gray-600">
              Check here to confirm the company is a Wema Bank customer
            </span>
          </label>
        )}

        <button
          disabled={!canProceed}
          onClick={() => onNext(files)}
          className="w-full py-3.5 rounded-xl font-semibold text-white mb-6 transition-colors cursor-pointer"
          style={{
            backgroundColor: canProceed ? "#9B1C3A" : "#F0AABB",
          }}
        >
          Next
        </button>

        {files.length === 0 && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 border-t border-dashed border-gray-300" />
              <span className="text-xs text-gray-400 whitespace-nowrap">
                Or Upload Invoice Manually
              </span>
              <div className="flex-1 border-t border-dashed border-gray-300" />
            </div>

            <button
              onClick={onManualUpload}
              className="w-full py-3.5 rounded-xl font-semibold border border-red-700 text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
            >
              Manual Upload
            </button>
          </>
        )}
      </div>
    </div>
  );
}