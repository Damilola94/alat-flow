import { useState } from "react";
import "./Invoices.css";

import Table from "../../components/common/Table/Table";

import InvoiceUploadModal from "./modals/InvoiceUploadModal";
import ManualUploadModal from "./modals/ManualUploadModal";
import ConfirmSubmitModal from "./modals/ConfirmSubmitModal";
import CancelProgressModal from "./modals/CancelProgressModal";
import InvoiceLoadingModal from "./modals/InvoiceLoadingModal";
import UnderReviewModal from "./modals/UnderReviewModal";
import InvoiceDetailsModal from "./modals/InvoiceDetailsModal";
import InvoiceRejectedModal from "./modals/InvoiceRejectedModal";
import InvoiceFilterModal from "./modals/InvoiceFilterModal";


interface Account {
  id: string;
  name: string;
}

interface InvoiceRow {
  sn: string;
  id: string;
  amount: string;
  date: string;
  status: "Active" | "Closed";
}

type Step =
  | "idle"
  | "upload"
  | "manual"
  | "confirm"
  | "loading"
  | "underReview"
  | "cancelConfirm";

type InvoiceStatus = "Active" | "Closed" | null;

interface Filter {
  status: InvoiceStatus;
}

interface ManualInvoice {
  invoiceNumber: string;
  invoiceAmount: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  file: File | null;
}


const MOCK_ACCOUNTS: Account[] = [
  { id: "1", name: "Progress Seafood Nig. LTD" },
  { id: "2", name: "CMG Studio. LTD" },
  { id: "3", name: "Debby Aladi. LTD" },
];

const MOCK_INVOICES: InvoiceRow[] = Array.from({ length: 8 }, (_, i) => ({
  sn: String(i + 1).padStart(2, "0"),
  id: "#00234",
  amount: "₦3,000,000",
  date: "02 Apr, 2025",
  status: i < 2 ? "Active" : "Closed",
}));


export default function Invoices() {
  const [subTab, setSubTab] =
    useState<"Pending" | "Funded" | "Rejected">("Pending");

  const [search, setSearch] = useState<string>("");
  const [step, setStep] = useState<Step>("idle");

  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>({ status: null });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [manualInvoices, setManualInvoices] = useState<ManualInvoice[]>([]);

  const [detailOpen, setDetailOpen] = useState(false);
  const [rejectedOpen, setRejectedOpen] = useState(false);


  const handleUploadNext = (files: File[]) => {
    setUploadedFiles(files);
    setStep("confirm");
  };

  const handleManualNext = (invoices: ManualInvoice[]) => {
    setManualInvoices(invoices);
    setStep("confirm");
  };

  const handleConfirm = async () => {
    setStep("loading");
    await new Promise((r) => setTimeout(r, 2000));
    setStep("underReview");
  };

  const handleDone = () => {
    setStep("idle");
    setUploadedFiles([]);
    setManualInvoices([]);
  };

  const handleCloseAttempt = () => {
    if (step === "upload" || step === "manual") {
      setStep("cancelConfirm");
    } else {
      setStep("idle");
    }
  };

  const handleCancelConfirmed = () => {
    setStep("idle");
    setUploadedFiles([]);
    setManualInvoices([]);
  };

  const handleViewInvoice = () => {
    if (subTab === "Rejected") {
      setRejectedOpen(true);
    } else {
      setDetailOpen(true);
    }
  };


  return (
    <div className="invoices-page">
      <div className="inv-toolbar">
        <div className="inv-toolbar__left">
          <button
            className="inv-filter-btn"
            onClick={() => setFilterOpen(true)}
          >
            Filter
          </button>

          <div className="inv-search">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button className="inv-upload-btn" onClick={() => setStep("upload")}>
          Upload Invoice
        </button>
      </div>

      <div className="inv-sub-tabs">
        {(["Pending", "Funded", "Rejected"] as const).map((t) => (
          <button
            key={t}
            className={`inv-sub-tab ${subTab === t ? "active" : ""}`}
            onClick={() => setSubTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <Table
        data={MOCK_INVOICES}
        offers={false}
        onViewInvoice={handleViewInvoice}
      />

      {/* MODALS */}
      <InvoiceUploadModal
        isOpen={step === "upload"}
        onClose={handleCloseAttempt}
        onNext={handleUploadNext}
        onManualUpload={() => setStep("manual")}
      />

      <ManualUploadModal
        isOpen={step === "manual"}
        onBack={() => setStep("upload")}
        onClose={handleCloseAttempt}
        onNext={handleManualNext}
      />

      <ConfirmSubmitModal
        isOpen={step === "confirm"}
        onClose={handleCloseAttempt}
        onConfirm={handleConfirm}
        accounts={MOCK_ACCOUNTS}
      />

      <InvoiceLoadingModal isOpen={step === "loading"} />

      <UnderReviewModal isOpen={step === "underReview"} onDone={handleDone} />

      <CancelProgressModal
        isOpen={step === "cancelConfirm"}
        onCancel={() =>
          setStep(uploadedFiles.length > 0 ? "upload" : "manual")
        }
        onConfirm={handleCancelConfirmed}
      />

      <InvoiceDetailsModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        invoice={{
          invoiceNumber: "#00234",
          paybackAmount: "3,458,000.00",
          dueDate: "May 24, 2025",
          status: "Ongoing",
          invoiceDate: "Feb 15, 2025",
          invoiceAmount: "3,000,000",
          advanceOffered: "90%",
          fees: "2%",
          latenessFee: "1%",
        }}
      />

      <InvoiceRejectedModal
        isOpen={rejectedOpen}
        onClose={() => setRejectedOpen(false)}
      />

      <InvoiceFilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filter={filter}
        onApply={(f: Filter) => {
          setFilter(f);
          setFilterOpen(false);
        }}
      />
    </div>
  );
}