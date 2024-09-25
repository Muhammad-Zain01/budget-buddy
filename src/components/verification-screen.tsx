import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw, ShieldCheck } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { user as apiUser } from "@/lib/services/user";
import useCurrentUser from "@/hooks/api/useCurrentUser";

const VerificationPage = () => {
  const { refetch } = useCurrentUser();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<{
    verification: boolean;
    resend: boolean;
  }>({
    verification: false,
    resend: false,
  });
  const { toast } = useToast();
  const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>([
    useRef<HTMLInputElement>(null), // Create 6 refs
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]);

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
    try {
      toast({
        title: "Resending Code",
        description: "Please wait while we resend the verification code...",
      });

      setLoading((prev) => ({ ...prev, resend: true }));
      await apiUser.resendEmail();

      setCode(["", "", "", "", "", ""]);
      // @ts-ignore
      inputRefs.current[0].current.focus();

      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Resend Failed",
        description:
          // @ts-ignore
          error.message ||
          "An error occurred while resending the verification code.",
        variant: "destructive",
      });
    } finally {
      setLoading({ resend: false, verification: false });
    }
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
      setLoading((prev) => ({ ...prev, verification: true }));
      await apiUser.verifyUser({ code: verificationCode });
      toast({
        title: "Verification Successful",
        description: "Your account has been verified.",
        variant: "default",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Verification Failed",
        // @ts-ignore
        description: error?.message || "An error occurred during verification.",
        variant: "destructive",
      });
    } finally {
      setLoading({ resend: false, verification: false });
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
          disabled={loading.resend}
          className="text-sm flex gap-2 w-1/2 items-center "
        >
          {loading.resend ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw size={16} />
          )}
          Resend Code
        </Button>
        <Button
          onClick={handleVerify}
          disabled={loading.verification}
          className="text-sm flex gap-2 w-1/2 items-center"
        >
          {loading.verification ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ShieldCheck size={16} />
          )}
          Verify
        </Button>
      </div>
    </div>
  );
};

export default VerificationPage;
