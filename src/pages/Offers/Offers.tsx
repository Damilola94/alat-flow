import { useState } from "react";
import Table from "../../components/common/Table/Table";

import OfferDetailsModal from "./modal/OfferDetailsModal";
import ConfirmAcceptOfferModal from "./modal/ConfirmAcceptOfferModal";
import OfferLoadingModal from "./modal/OfferLoadingModal";
import OfferCongratulationsModal from "./modal/OfferCongratulationsModal";

/* ---------------- TYPES ---------------- */

type Step = "idle" | "details" | "confirm" | "loading" | "success";

interface Offer {
  invoiceNumber: string;
  offerAmount: string;
  advanceOffered: string;
  fees: string;
  dueDate: string;
  invoiceAmount: string;
  latenessFee: string;
}

const MOCK_OFFER: Offer = {
  invoiceNumber: "#00234",
  offerAmount: "2,900,000.00",
  advanceOffered: "90%",
  fees: "2%",
  dueDate: "Feb 15, 2025",
  invoiceAmount: "3,000,000",
  latenessFee: "1%",
};

export default function Offers() {
  const [step, setStep] = useState<Step>("idle");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleViewOffer = () => {
    setSelectedOffer(MOCK_OFFER);
    setStep("details");
  };

  const handleAccept = () => {
    setStep("confirm");
  };

  const handleConfirmYes = async () => {
    setStep("loading");
    await new Promise((r) => setTimeout(r, 2000));
    setStep("success");
  };

  const handleDone = () => {
    setStep("idle");
    setSelectedOffer(null);
  };

  return (
    <div className="page">
      <Table offers onViewInvoice={handleViewOffer} />

      <OfferDetailsModal
        isOpen={step === "details"}
        onClose={() => setStep("idle")}
        offer={selectedOffer}
        onAccept={handleAccept}
      />

      <ConfirmAcceptOfferModal
        isOpen={step === "confirm"}
        onNo={() => setStep("details")}
        onYes={handleConfirmYes}
      />

      <OfferLoadingModal isOpen={step === "loading"} />

      <OfferCongratulationsModal
        isOpen={step === "success"}
        onOkay={handleDone}
      />
    </div>
  );
}