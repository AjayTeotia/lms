"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/");
        },
      },
    });
  }

  return (
    <div className="">
      <h1 className="text-3xl">Home Page</h1>

      <ThemeToggle />

      {session ? (
        <div>
          <p>
            {`You are signed in as ${session.user.email || session.user.name}`}
          </p>

          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <Button>Sign in</Button>
      )}
    </div>
  );
}
