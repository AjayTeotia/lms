"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, LoaderIcon, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [emailPending, startEmailTransition] = useTransition();

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Signed in successfully with Github!, redirecting..."
            );
          },
          onError: (error) => {
            toast.error(
              `Failed to sign in with Github: ${error.error.message}`
            );
          },
        },
      });
    });
  }

  function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification email sent! Please check your inbox.");
            router.push(`/verify-request?email=${email}`);
          },
          onError: (error) => {
            toast.error(
              `Failed to send verification email: ${error.error.message}`
            );
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>
          Login with your Github or Email address
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Button
          className="w-full"
          variant="outline"
          onClick={signInWithGithub}
          disabled={githubPending}
        >
          {githubPending ? (
            <>
              <LoaderIcon className="size-4 animate-spin" />
              <span>Signing in with Github...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Sign with Github
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative bg-card px-2 z-10 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <Button
            onClick={signInWithEmail}
            disabled={emailPending}
            className="w-full"
          >
            {emailPending ? (
              <>
                <LoaderIcon className="size-4 animate-spin" />
                <span>Sending verification email...</span>
              </>
            ) : (
              <>
                <SendIcon className="size-4" />
                Continue with Email
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
