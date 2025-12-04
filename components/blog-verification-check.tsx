"use client";

import { useState, useEffect } from "react";
import { MedicalDisclaimerModal } from "@/components/medical-disclaimer-modal";

export function BlogVerificationCheck() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const confirmed = sessionStorage.getItem("medical_professional_confirmed");
    if (confirmed !== "true") {
      setShowDisclaimer(true);
    }
  }, []);

  const handleConfirm = () => {
    setShowDisclaimer(false);
  };

  return (
    <MedicalDisclaimerModal 
      isOpen={showDisclaimer} 
      onConfirm={handleConfirm} 
    />
  );
}
