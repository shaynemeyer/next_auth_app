"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function TwoFactorAuthForm({
  twoFactorActivated,
}: {
  twoFactorActivated: boolean;
}) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);

  const handleEnableClick = () => {
    setStep(2);
  };
  return (
    <div>
      {!isActivated && (
        <div>
          {step === 1 && (
            <Button onClick={handleEnableClick}>
              Enable Two-Factor Authentication
            </Button>
          )}
          {step === 2 && <div>display qr code</div>}
        </div>
      )}
    </div>
  );
}
export default TwoFactorAuthForm;
