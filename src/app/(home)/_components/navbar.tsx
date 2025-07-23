"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { UserDropdown } from "./user-dropdown";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/course" },
  { name: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[background-filter]:bg-background/60">
      <div className="container mx-auto flex min-h-16 items-center px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image
            src="/logo.png"
            alt="Logo"
            className="size-9"
            width={32}
            height={32}
          />

          <span className="font-bold">AjLMS.</span>
        </Link>

        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                name={session.user.name || ""}
                email={session.user.email}
                image={session.user.image || " "}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>

                <Link href="/login" className={buttonVariants()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
