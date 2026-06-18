import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";

interface Account {
  id: string;
  name: string;
}

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (account: Account) => void;
  accounts: Account[];
}

export default function ConfirmSubmitModal({
  isOpen,
  onClose,
  onConfirm,
  accounts,
}: ConfirmSubmitModalProps) {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(
    accounts[0] || null
  );
  const [showAccountPicker, setShowAccountPicker] = useState<boolean>(false);
  const [accountSearch, setAccountSearch] = useState<string>("");

  if (!isOpen) return null;

  const filteredAccounts = accounts.filter((a) =>
    a.name.toLowerCase().includes(accountSearch.toLowerCase())
  );

  if (showAccountPicker) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-center text-lg font-bold text-gray-900 mb-4">
            Select Account
          </h2>

          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 mb-4">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder="Search business name"
              value={accountSearch}
              onChange={(e) => setAccountSearch(e.target.value)}
              className="flex-1 text-sm focus:outline-none"
            />
          </div>

          <div className="divide-y divide-dashed divide-gray-200">
            {filteredAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => {
                  setSelectedAccount(acc);
                  setShowAccountPicker(false);
                }}
                className="w-full text-left px-2 py-3.5 cursor-pointer text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {acc.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-105 bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Are you ready to submit?
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Make sure the information is accurate and that you're uploading it to
          the correct business account.
        </p>

        {selectedAccount && (
          <button
            onClick={() => setShowAccountPicker(true)}
            className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-xl mb-6 hover:bg-gray-50 cursor-pointer"
          >
            <span className="text-sm font-medium text-gray-700">
              {selectedAccount.name}
            </span>

            <span className="flex items-center gap-1 text-sm text-red-700 font-medium">
              Change <IoChevronForward size={14} />
            </span>
          </button>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl font-semibold border border-red-700 text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
          >
            No
          </button>

          <button
            onClick={() =>
              selectedAccount && onConfirm(selectedAccount)
            }
            className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}