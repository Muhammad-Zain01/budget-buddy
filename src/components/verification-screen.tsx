import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw, ShieldCheck } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { user as apiUser } from "@/lib/services/user";
import useCurrentUser from "@/hooks/api/useCurrentUser";

const VerificationPage = () => {
  const { refetch } = useCurrentUser();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array.from({ length: 6 }, () => null)
  );

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      // @ts-ignore
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // @ts-ignore
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleResend = async () => {
    toast({
      title: "Resending Code",
      description: "Please wait while we resend the verification code...",
    });

    const response = await apiUser.resendEmail();
    console.log(response);

    toast({
      title: "Code Resent",
      description: "A new verification code has been sent to your email.",
      variant: "default",
    });
    setCode(["", "", "", "", "", ""]);
    // @ts-ignore
    inputRefs.current[0].current.focus();
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");
    if (verificationCode.length != 6) {
      toast({
        title: "Incomplete Code",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Verifying",
        description: "Please wait while we verify your code...",
      });
      await apiUser.verifyUser({ code: verificationCode });
      toast({
        title: "Verification Successful",
        description: "Your account has been verified.",
        variant: "default",
      });
      refetch();
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification Failed",
        // @ts-ignore
        description: error?.message || "An error occurred during verification.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full h-screen justify-center flex-col flex max-w-md mx-auto md:px-0 px-2">
      <h1 className="font-bold text-2xl md:text-4xl text-center">
        {" "}
        Verification
      </h1>
      <h3 className="text-center mb-3 text-sm    text-gray-500">
        Please enter the verification code sent to your email
      </h3>

      <div className="flex justify-between mb-4 ">
        {code.map((digit, index) => (
          <Input
            key={index}
            type="text"
            maxLength={1}
            value={digit.toUpperCase()}
            onChange={(e) => handleChange(index, e.target.value.toUpperCase())}
            onKeyDown={(e) => handleKeyDown(index, e)}
            // @ts-ignore
            ref={inputRefs.current[index]}
            className="w-12 h-12 text-center text-lg uppercase"
          />
        ))}
      </div>

      <div className="flex gap-3 w-full justify-end ">
        <Button
          onClick={handleResend}
          variant="outline"
          className="text-sm flex gap-2 w-1/2 items-center "
        >
          <RefreshCcw size={16} /> Resend Code
        </Button>
        <Button
          onClick={handleVerify}
          className="text-sm flex gap-2 w-1/2 items-center   "
        >
          <ShieldCheck size={16} /> Verify
        </Button>
      </div>
    </div>
  );
};

export default VerificationPage;
