"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { get2faSecret } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";

function TwoFactorAuthForm({
  twoFactorActivated,
}: {
  twoFactorActivated: boolean;
}) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleEnableClick = async () => {
    const response = await get2faSecret();

    if (response?.error) {
      toast({
        variant: "destructive",
        title: response.message,
      });

      return;
    }

    setStep(2);
    setCode(response.twoFactorSecret ?? "");
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
          {step === 2 && (
            <div>
              <p className="text-xs text-muted-foreground py-2">
                Scan the QR code below in the Google Authenticator app to
                activate Two-Factor Authentication.
              </p>
              <QRCodeSVG value={code} />
              <Button onClick={() => setStep(3)} className="w-full my-2">
                I have scanned the QR code
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full my-2"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default TwoFactorAuthForm;
