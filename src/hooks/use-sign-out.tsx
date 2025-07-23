"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
          router.push("/");
        },
        onError: (error) => {
          toast.error(`Failed to log out: ${error.error.message}`);
        },
      },
    });
  }

  return { handleLogout };
}
