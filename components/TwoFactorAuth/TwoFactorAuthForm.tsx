"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { activate2fa, disable2fa, get2faSecret } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

function TwoFactorAuthForm({
  twoFactorActivated,
}: {
  twoFactorActivated: boolean;
}) {
  const [isActivated, setIsActivated] = useState(twoFactorActivated);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [otp, setOtp] = useState("");

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

  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await activate2fa(otp);

    if (response?.error) {
      toast({
        variant: "destructive",
        title: response.message,
      });
      return;
    }

    toast({
      className: "bg-green-500 text-white",
      title: "Two-Factor Authentication has been enabled",
    });

    setIsActivated(true);
  };

  const handleDisable2faClick = async () => {
    await disable2fa();
    toast({
      className: "bg-green-500 text-white",
      title: "Two-Factor Authentication has been disabled",
    });
  };

  return (
    <div>
      {!!isActivated && (
        <Button variant="destructive" onClick={handleDisable2faClick}>
          Disable Two-Factor Authentication
        </Button>
      )}
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
          {step === 3 && (
            <form className="flex flex-col gap-2" onSubmit={handleOTPSubmit}>
              <p className="text-xs text-muted-foreground">
                Please enter the one-time passcode from the Google Authenticator
                app.
              </p>
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <Button
                type="submit"
                className="w-full my-2"
                disabled={otp.length !== 6}
              >
                Submit and activate
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-full my-2"
              >
                Cancel
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
export default TwoFactorAuthForm;
