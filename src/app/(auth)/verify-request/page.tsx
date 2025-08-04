"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { BadgeCheckIcon, LoaderIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequestRoute() {
  return (
    <Suspense>
      <VerifyRequestPage />
    </Suspense>
  );
}

function VerifyRequestPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [emailPending, startEmailTransition] = useTransition();

  const email = params.get("email") as string;
  const isOtpCompleted = otp.length === 6;

  function handleVerifyEmail() {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified successfully! Redirecting...");
            router.push("/");
          },
          onError: (error) => {
            toast.error(`Failed to verify email: ${error.error.message}`);
          },
        },
      });
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email.</CardTitle>
        <CardDescription>
          We have sent you a verification email. Please check your inbox (or
          spam) and follow the instructions to verify your email address.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2"
          >
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

          <p className="text-sm text-muted-foreground">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        <Button
          className="w-full"
          onClick={handleVerifyEmail}
          disabled={emailPending || !isOtpCompleted}
        >
          {emailPending ? (
            <>
              <LoaderIcon className="size-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <BadgeCheckIcon className="size-4" />
              Verify Email
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
